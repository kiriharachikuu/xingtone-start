import { NextResponse } from "next/server";
import { ADMIN_PASSWORD, getAdminToken } from "@/lib/site-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "密码错误" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    // 设置 httpOnly 会话 Cookie，供保存接口做服务端鉴权
    res.cookies.set("admin_session", getAdminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 小时
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
