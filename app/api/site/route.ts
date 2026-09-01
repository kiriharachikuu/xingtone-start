import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/site-data";

// 每次请求都读取最新内容（EdgeOne Blob 强一致读取），后台保存后前端立即可见
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("读取站点数据失败:", error);
    return NextResponse.json(
      { success: false, error: "读取数据失败" },
      { status: 500 }
    );
  }
}
