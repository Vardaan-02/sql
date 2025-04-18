import type { Metadata } from "next"
import ReportsView from "@/components/reports/reports-view"

export const metadata: Metadata = {
  title: "Reports | Medical Inventory Management",
  description: "Reports and Analytics for Medical Inventory System",
}

export default function ReportsPage() {
  return <ReportsView />
}
