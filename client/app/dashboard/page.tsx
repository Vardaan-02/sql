import type { Metadata } from "next"
import DashboardView from "@/components/dashboard/dashboard-view"

export const metadata: Metadata = {
  title: "Dashboard | Medical Inventory Management",
  description: "Medical Center Inventory Management System Dashboard",
}

export default function DashboardPage() {
  return <DashboardView />
}
