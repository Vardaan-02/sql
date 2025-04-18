import type { Metadata } from "next"
import AuditLogsView from "@/components/audit-logs/audit-logs-view"

export const metadata: Metadata = {
  title: "Audit Logs | Medical Inventory Management",
  description: "System Audit Logs for Medical Inventory System",
}

export default function AuditLogsPage() {
  return <AuditLogsView />
}
