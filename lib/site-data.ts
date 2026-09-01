// 站点内容数据读取工具
//
// 存储策略：
// - 部署在 EdgeOne（Cloud Functions，Node.js 运行时）时，使用 EdgeOne Blob 持久化存储。
//   Blob 通过 @edgeone/pages-blob SDK 访问，getStore() 在 Functions 内自动鉴权、自动创建
//   命名空间，无需在控制台开通/绑定（区别于需要审批的 KV）。读取使用强一致模式，保证
//   后台保存后前端立刻能读到最新内容。
// - 本地开发（next dev / 测试）时，SDK 缺少 EdgeOne 运行时凭据会自动回退到本地 data/site.json，
//   方便离线开发。
// 也可用环境变量 STORAGE_DRIVER=blob|fs 强制指定。

import "server-only";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHmac, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { defaultSiteData } from "./default-data";
import type { SiteData } from "./types";

// 后台管理密码（生产环境务必通过环境变量 ADMIN_PASSWORD 修改）
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "xingtone-admin";

// Blob 命名空间与对象 Key（命名空间首次访问时由平台自动创建）
const BLOB_STORE_NAME = "xingtone-site";
const BLOB_KEY = "site-data.json";

/**
 * 后台会话令牌：由管理密码通过 HMAC 派生，写入 httpOnly Cookie。
 * 不暴露明文密码，且服务端可通过同算法重算来校验。
 */
export function getAdminToken(): string {
  return createHmac("sha256", ADMIN_PASSWORD).update("admin-session").digest("hex");
}

/** 校验请求携带的会话 Cookie 是否合法 */
export function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = getAdminToken();
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

const dataFilePath = path.join(process.cwd(), "data", "site.json");

// Blob Store 实例缓存
let blobStore: import("@edgeone/pages-blob").Store | null | undefined;

/**
 * 判断是否应该使用 Blob 存储。
 * - STORAGE_DRIVER=blob 强制使用；fs 强制使用本地文件。
 * - 未设置时：非 development 环境（即 EdgeOne 生产部署）默认尝试 Blob，
 *   本地开发默认用文件系统。
 */
function shouldTryBlob(): boolean {
  const driver = process.env.STORAGE_DRIVER?.toLowerCase();
  if (driver === "blob") return true;
  if (driver === "fs") return false;
  return process.env.NODE_ENV === "production";
}

/**
 * 获取 Blob Store 实例。仅在 EdgeOne 运行时有可用凭据，其余情况返回 null。
 * 结果会被缓存，避免每次请求都重复探测。
 */
async function getBlobStore(): Promise<import("@edgeone/pages-blob").Store | null> {
  if (!shouldTryBlob()) return null;
  if (blobStore !== undefined) return blobStore;

  try {
    const { getStore } = await import("@edgeone/pages-blob");
    // Functions 内使用字符串形式，运行时自动鉴权（无需 projectId/token）
    const store = getStore(BLOB_STORE_NAME);
    // getStore 本身不发起网络请求，用一次强一致读取探测凭据是否可用
    await store.get(BLOB_KEY, { type: "json", consistency: "strong" });
    blobStore = store;
  } catch (err) {
    console.warn("[site-data] Blob 存储不可用，回退到本地文件:", (err as Error)?.message);
    blobStore = null;
  }
  return blobStore;
}

export async function getSiteData(): Promise<SiteData> {
  const defaults = defaultSiteData;

  try {
    const store = await getBlobStore();
    if (store) {
      const blobData = await store.get(BLOB_KEY, { type: "json", consistency: "strong" });
      if (blobData && typeof blobData === "object") {
        return mergeWithDefaults(blobData as Partial<SiteData>, defaults);
      }
      return defaults;
    }
  } catch (err) {
    console.error("[site-data] 读取 Blob 失败，尝试本地文件:", err);
  }

  // 本地文件回退（本地开发使用）
  try {
    if (existsSync(dataFilePath)) {
      const raw = await readFile(dataFilePath, "utf-8");
      const fileData = JSON.parse(raw) as Partial<SiteData>;
      return mergeWithDefaults(fileData, defaults);
    }
  } catch (err) {
    console.error("[site-data] 读取本地数据文件失败:", err);
  }

  return defaults;
}

export async function saveSiteData(data: SiteData): Promise<void> {
  const store = await getBlobStore();

  if (store) {
    await store.setJSON(BLOB_KEY, data);
    return;
  }

  // 本地文件回退
  const dir = path.dirname(dataFilePath);
  await mkdir(dir, { recursive: true });
  await writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * 旧数据迁移：
 * 1. 清掉历史上以 base64 内联保存的大图（会让数据/页面异常臃肿），图片改为图床 URL；
 *    清空后前端回落到默认 mockup，用户可在后台重新填写图片链接。
 * 2. 旧版页脚存在 # 死链与底部重复法律链接，整体替换为默认页脚（链接指向 /legal/* 与 GitHub）。
 */
function migrate(data: Partial<SiteData>, defaults: SiteData): Partial<SiteData> {
  const next: Partial<SiteData> = { ...data };

  const strip = (v: unknown): string =>
    typeof v === "string" && v.startsWith("data:image") ? "" : (v as string);

  if (next.hero) {
    next.hero = { ...next.hero, heroImage: strip(next.hero.heroImage) };
  }
  if (next.screenshots?.tabImages) {
    const tabImages: Record<string, string> = {};
    for (const [k, v] of Object.entries(next.screenshots.tabImages)) {
      const sv = strip(v);
      if (sv) tabImages[k] = sv;
    }
    next.screenshots = { ...next.screenshots, tabImages };
  }

  // 旧页脚：存在重复法律链接或大量 # 死链时，直接采用默认页脚
  const f = next.footer as { legalLinks?: unknown; columns?: { links?: { href?: string }[] }[] } | undefined;
  const hasLegalRow = Array.isArray(f?.legalLinks) && (f!.legalLinks as unknown[]).length > 0;
  const deadLinks =
    f?.columns?.some((c) => c.links?.some((l) => l.href === "#")) ?? false;
  if (hasLegalRow || deadLinks) {
    next.footer = defaults.footer;
  }

  return next;
}

/**
 * 与默认数据合并：顶层对象字段浅合并、数组字段在缺失/为空时回退默认值，
 * 避免字段缺失导致前端渲染异常。
 */
function mergeWithDefaults(
  raw: Partial<SiteData>,
  defaults: SiteData,
): SiteData {
  const data = migrate(raw, defaults);
  return {
    nav: { ...defaults.nav, ...data.nav },
    hero: { ...defaults.hero, ...data.hero },
    stats: data.stats?.length ? data.stats : defaults.stats,
    features: data.features?.length ? data.features : defaults.features,
    screenshots: { ...defaults.screenshots, ...data.screenshots },
    download: {
      ...defaults.download,
      ...data.download,
      platforms: data.download?.platforms?.length
        ? data.download.platforms
        : defaults.download.platforms,
    },
    footer: { ...defaults.footer, ...data.footer },
  };
}
