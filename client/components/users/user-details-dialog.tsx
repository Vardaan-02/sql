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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Lock, ShieldAlert, UserCog } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserDetailsDialogProps {
  userId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample user details
const userDetails = {
  id: "USR-001",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@medcenter.com",
  phone: "(555) 123-4567",
  department: "Administration",
  position: "Medical Director",
  role: "administrator",
  status: "active",
  lastActive: "2023-10-15 14:30",
  createdAt: "2022-05-10",
  avatar: "/placeholder.svg?height=100&width=100",
  permissions: {
    inventory: ["view", "add", "edit", "delete"],
    orders: ["view", "create", "approve"],
    suppliers: ["view", "manage"],
    reports: ["view", "export"],
    users: ["view", "manage"],
  },
  recentActivity: [
    {
      action: "Updated inventory item MED-001",
      timestamp: "2023-10-15 14:30",
    },
    {
      action: "Approved order ORD-005",
      timestamp: "2023-10-15 11:45",
    },
    {
      action: "Added new supplier SUP-008",
      timestamp: "2023-10-14 16:20",
    },
    {
      action: "Generated monthly inventory report",
      timestamp: "2023-10-10 09:15",
    },
    {
      action: "Updated user permissions for USR-007",
      timestamp: "2023-10-08 13:40",
    },
  ],
}

export function UserDetailsDialog({ userId, open, onOpenChange }: UserDetailsDialogProps) {
  // In a real application, you would fetch the user details based on the userId

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "administrator":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500 flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            Administrator
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Staff
          </Badge>
        )
      case "viewer":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Viewer
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">User Details</DialogTitle>
          <DialogDescription>ID: {userDetails.id}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userDetails.avatar} alt={userDetails.name} />
                  <AvatarFallback className="text-2xl">
                    {userDetails.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-semibold">{userDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{userDetails.position}</p>
                  <div className="flex gap-2 mt-2">
                    {getRoleBadge(userDetails.role)}
                    {getStatusBadge(userDetails.status)}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Email</h4>
                      <p>{userDetails.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Phone</h4>
                      <p>{userDetails.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Department</h4>
                      <p>{userDetails.department}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Position</h4>
                      <p>{userDetails.position}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">User ID</h4>
                      <p>{userDetails.id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Role</h4>
                      <p className="capitalize">{userDetails.role}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Status</h4>
                      <p className="capitalize">{userDetails.status}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Created</h4>
                      <p>{userDetails.createdAt}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Last Active</h4>
                      <p>{userDetails.lastActive}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>Permissions assigned to this user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Inventory Management</h3>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.permissions.inventory.map((perm) => (
                      <Badge key={perm} variant="outline" className="capitalize">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">Orders Management</h3>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.permissions.orders.map((perm) => (
                      <Badge key={perm} variant="outline" className="capitalize">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">Suppliers Management</h3>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.permissions.suppliers.map((perm) => (
                      <Badge key={perm} variant="outline" className="capitalize">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">Reports & Analytics</h3>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.permissions.reports.map((perm) => (
                      <Badge key={perm} variant="outline" className="capitalize">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">User Management</h3>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.permissions.users.map((perm) => (
                      <Badge key={perm} variant="outline" className="capitalize">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>User's recent actions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDetails.recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between border-b pb-3 last:border-0">
                      <div>
                        <p>{activity.action}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <UserCog className="mr-2 h-4 w-4" />
              Manage Permissions
            </Button>
            <Button variant="outline" size="sm">
              <Lock className="mr-2 h-4 w-4" />
              Reset Password
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
