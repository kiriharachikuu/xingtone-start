/**
 * 官网公共版本数据获取（服务端组件用）
 *
 * 数据源：后端 GET /api/public/app-versions（无需登录，后端 60s 内存缓存）
 * - fetch 使用 next: { revalidate: 60 } 与后端缓存对齐
 * - 任何失败（非 200 / 超时 / 解析错误）返回 null，不阻塞页面渲染，
 *   调用方回退 site.json 静态数据
 */

/** 单平台最新版本摘要（与后端 PublicAppVersionSummary 字段一致，camelCase） */
export interface AppVersionSummary {
  version: string;
  versionCode: number;
  changelog: string[];
  downloadUrl: string;
  fileSize: number;
  publishedAt: string;
}

/** /api/public/app-versions 返回结构 */
export interface AppVersionsPayload {
  android: AppVersionSummary | null;
  pc: AppVersionSummary | null;
}

const API_BASE = process.env.XT_API_BASE || "https://xtmusicapi.chikuu.top/api";

/**
 * 获取两平台最新正式版；失败返回 null（回退静态数据）
 */
export async function fetchAppVersions(): Promise<AppVersionsPayload | null> {
  try {
    const res = await fetch(`${API_BASE}/public/app-versions`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as {
      code: number;
      data: AppVersionsPayload | null;
      message?: string;
    };
    return payload?.data ?? null;
  } catch {
    return null;
  }
}

/**
 * 格式化文件大小（字节 → 易读格式）；无效值返回空字符串
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
