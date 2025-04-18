"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"

interface LogDetailsDialogProps {
  logId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample log details
const logDetails = {
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
  sessionId: "SESSION-12345",
  requestId: "REQ-67890",
  additionalData: {
    previousValue: {
      stock: 150,
      updatedAt: "2023-10-10 09:15:22",
      updatedBy: "USR-002",
    },
    newValue: {
      stock: 200,
      updatedAt: "2023-10-15 14:30:45",
      updatedBy: "USR-001",
    },
  },
}

export function LogDetailsDialog({ logId, open, onOpenChange }: LogDetailsDialogProps) {
  // In a real application, you would fetch the log details based on the logId

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Log Details {getActionBadge(logDetails.action)} {getSeverityBadge(logDetails.severity)}
          </DialogTitle>
          <DialogDescription>
            ID: {logDetails.id} | {logDetails.timestamp}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">User:</p>
                <p>
                  {logDetails.user} ({logDetails.userId})
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Action:</p>
                <p>{logDetails.action}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resource:</p>
                <p>
                  {logDetails.resource} ({logDetails.resourceId})
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timestamp:</p>
                <p>{logDetails.timestamp}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <p>{logDetails.details}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">IP Address:</p>
                <p>{logDetails.ipAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Session ID:</p>
                <p>{logDetails.sessionId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Request ID:</p>
                <p>{logDetails.requestId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Severity:</p>
                <p>{logDetails.severity}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">User Agent:</p>
              <p className="text-sm break-all">{logDetails.userAgent}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2">Additional Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-2">Previous Value</h4>
                <div className="space-y-1">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <span>{logDetails.additionalData.previousValue.stock}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Updated At:</span>
                    <span>{logDetails.additionalData.previousValue.updatedAt}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Updated By:</span>
                    <span>{logDetails.additionalData.previousValue.updatedBy}</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-2">New Value</h4>
                <div className="space-y-1">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <span>{logDetails.additionalData.newValue.stock}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Updated At:</span>
                    <span>{logDetails.additionalData.newValue.updatedAt}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-sm text-muted-foreground">Updated By:</span>
                    <span>{logDetails.additionalData.newValue.updatedBy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Log
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
