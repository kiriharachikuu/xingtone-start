import { NextRequest, NextResponse } from "next/server";
import { saveSiteData, isValidAdminToken } from "@/lib/site-data";

export async function POST(request: NextRequest) {
  try {
    // 服务端鉴权：校验登录时下发的 httpOnly 会话 Cookie
    const token = request.cookies.get("admin_session")?.value;
    if (!isValidAdminToken(token)) {
      return NextResponse.json(
        { success: false, error: "未授权，请先登录后台" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { data } = body as { data: unknown };

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { success: false, error: "无效的数据格式" },
        { status: 400 }
      );
    }

    // 写入 EdgeOne Blob（生产）或本地文件（开发）。
    // 首页为动态渲染、实时强一致读取，保存后无需手动刷新缓存。
    await saveSiteData(data as Parameters<typeof saveSiteData>[0]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("保存站点数据失败:", error);
    return NextResponse.json(
      { success: false, error: "保存失败" },
      { status: 500 }
    );
  }
}
