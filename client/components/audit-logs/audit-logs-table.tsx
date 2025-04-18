"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { LogDetailsDialog } from "@/components/audit-logs/log-details-dialog"

// Sample audit logs data
const auditLogsData = [
  {
    id: "LOG-001",
    timestamp: "2023-10-15 14:30:45",
    user: "Dr. Sarah Johnson",
    userId: "USR-001",
    action: "UPDATE",
    resource: "Inventory Item",
    resourceId: "MED-001",
    details: "Updated stock level from 150 to 200",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "info",
  },
  {
    id: "LOG-002",
    timestamp: "2023-10-15 14:25:12",
    user: "Dr. Sarah Johnson",
    userId: "USR-001",
    action: "APPROVE",
    resource: "Purchase Order",
    resourceId: "ORD-005",
    details: "Approved purchase order for MedSupply Co.",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "info",
  },
  {
    id: "LOG-003",
    timestamp: "2023-10-15 13:45:30",
    user: "Dr. Michael Chen",
    userId: "USR-002",
    action: "CREATE",
    resource: "Supplier",
    resourceId: "SUP-008",
    details: "Added new supplier 'Medical Innovations'",
    ipAddress: "192.168.1.102",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    severity: "info",
  },
  {
    id: "LOG-004",
    timestamp: "2023-10-15 12:30:15",
    user: "Nurse Emily Davis",
    userId: "USR-003",
    action: "DELETE",
    resource: "Inventory Item",
    resourceId: "SUP-045",
    details: "Deleted expired item 'Surgical Gloves (S)'",
    ipAddress: "192.168.1.103",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "warning",
  },
  {
    id: "LOG-005",
    timestamp: "2023-10-15 11:15:22",
    user: "James Wilson",
    userId: "USR-004",
    action: "EXPORT",
    resource: "Report",
    resourceId: "REP-012",
    details: "Exported monthly inventory report",
    ipAddress: "192.168.1.104",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "info",
  },
  {
    id: "LOG-006",
    timestamp: "2023-10-15 10:45:18",
    user: "Dr. Lisa Rodriguez",
    userId: "USR-005",
    action: "UPDATE",
    resource: "User",
    resourceId: "USR-007",
    details: "Updated user permissions for Amanda Clark",
    ipAddress: "192.168.1.105",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    severity: "warning",
  },
  {
    id: "LOG-007",
    timestamp: "2023-10-15 10:30:05",
    user: "System",
    userId: "SYSTEM",
    action: "ALERT",
    resource: "Inventory",
    resourceId: "MED-023",
    details: "Low stock alert triggered for 'Amoxicillin 250mg'",
    ipAddress: "192.168.1.1",
    userAgent: "System Process",
    severity: "warning",
  },
  {
    id: "LOG-008",
    timestamp: "2023-10-15 09:45:30",
    user: "Dr. Sarah Johnson",
    userId: "USR-001",
    action: "LOGIN",
    resource: "System",
    resourceId: "N/A",
    details: "User logged in successfully",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "info",
  },
  {
    id: "LOG-009",
    timestamp: "2023-10-14 18:15:42",
    user: "Dr. Michael Chen",
    userId: "USR-002",
    action: "LOGOUT",
    resource: "System",
    resourceId: "N/A",
    details: "User logged out",
    ipAddress: "192.168.1.102",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    severity: "info",
  },
  {
    id: "LOG-010",
    timestamp: "2023-10-14 17:30:15",
    user: "Amanda Clark",
    userId: "USR-007",
    action: "FAILED_LOGIN",
    resource: "System",
    resourceId: "N/A",
    details: "Failed login attempt (incorrect password)",
    ipAddress: "192.168.1.107",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
    severity: "error",
  },
  {
    id: "LOG-011",
    timestamp: "2023-10-14 16:45:22",
    user: "System",
    userId: "SYSTEM",
    action: "BACKUP",
    resource: "Database",
    resourceId: "N/A",
    details: "Automated database backup completed successfully",
    ipAddress: "192.168.1.1",
    userAgent: "System Process",
    severity: "info",
  },
  {
    id: "LOG-012",
    timestamp: "2023-10-14 15:30:10",
    user: "Dr. Sarah Johnson",
    userId: "USR-001",
    action: "CREATE",
    resource: "Purchase Order",
    resourceId: "ORD-006",
    details: "Created new purchase order for PharmaTech Inc.",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    severity: "info",
  },
]

export function AuditLogsTable() {
  const [viewLogId, setViewLogId] = useState<string | null>(null)

  const getActionBadge = (action: string) => {
    switch (action) {
      case "CREATE":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Create
          </Badge>
        )
      case "UPDATE":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Update
          </Badge>
        )
      case "DELETE":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Delete
          </Badge>
        )
      case "LOGIN":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Login
          </Badge>
        )
      case "LOGOUT":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Logout
          </Badge>
        )
      case "FAILED_LOGIN":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Failed Login
          </Badge>
        )
      case "EXPORT":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Export
          </Badge>
        )
      case "APPROVE":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Approve
          </Badge>
        )
      case "ALERT":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Alert
          </Badge>
        )
      case "BACKUP":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Backup
          </Badge>
        )
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Info
          </Badge>
        )
      case "warning":
        return <Badge variant="warning">Warning</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "critical":
        return (
          <Badge variant="destructive" className="bg-red-700">
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{getActionBadge(log.action)}</TableCell>
                <TableCell>
                  {log.resource}
                  {log.resourceId !== "N/A" && (
                    <span className="text-xs text-muted-foreground ml-1">({log.resourceId})</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="truncate max-w-[250px]">{log.details}</span>
                    {log.details.length > 30 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Info className="h-3 w-3" />
                              <span className="sr-only">View full details</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{log.details}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => setViewLogId(log.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewLogId && (
        <LogDetailsDialog
          logId={viewLogId}
          open={!!viewLogId}
          onOpenChange={(open) => {
            if (!open) setViewLogId(null)
          }}
        />
      )}
    </>
  )
}
