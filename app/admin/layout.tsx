import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "后台管理 · XingTone Site",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}
