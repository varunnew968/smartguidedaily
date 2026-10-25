import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false, follow: false } };
export default function AdminPage(){return <div className="admin-wrap"><div className="container"><AdminDashboard/></div></div>}
