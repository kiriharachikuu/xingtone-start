"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // 登录成功，保存到 localStorage
        localStorage.setItem("admin-auth", "1");
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "登录失败");
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🔐 后台管理</h1>
        <p className="subtitle">XingTone 官网内容管理系统</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">管理员密码</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入管理员密码"
              autoFocus
            />
          </div>

          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? "登录中..." : "登 录"}
          </button>
        </form>

        <p
          style={{
            marginTop: 20,
            fontSize: 12,
            color: "var(--text-faint)",
            textAlign: "center",
          }}
        >
          默认密码：xingtone-admin
          <br />
          可通过环境变量 ADMIN_PASSWORD 修改
        </p>
      </div>
    </div>
  );
}
