"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Lock, MoreHorizontal, ShieldAlert, Trash2, UserCog } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserDetailsDialog } from "@/components/users/user-details-dialog"

// Sample users data
const usersData = [
  {
    id: "USR-001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medcenter.com",
    department: "Administration",
    role: "administrator",
    status: "active",
    lastActive: "2023-10-15 14:30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-002",
    name: "Dr. Michael Chen",
    email: "michael.chen@medcenter.com",
    department: "Pharmacy",
    role: "administrator",
    status: "active",
    lastActive: "2023-10-15 12:45",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-003",
    name: "Nurse Emily Davis",
    email: "emily.davis@medcenter.com",
    department: "Nursing",
    role: "staff",
    status: "active",
    lastActive: "2023-10-15 10:20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-004",
    name: "James Wilson",
    email: "james.wilson@medcenter.com",
    department: "Laboratory",
    role: "staff",
    status: "active",
    lastActive: "2023-10-14 16:15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-005",
    name: "Dr. Lisa Rodriguez",
    email: "lisa.rodriguez@medcenter.com",
    department: "Administration",
    role: "administrator",
    status: "active",
    lastActive: "2023-10-14 15:30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-006",
    name: "Robert Taylor",
    email: "robert.taylor@medcenter.com",
    department: "Pharmacy",
    role: "staff",
    status: "inactive",
    lastActive: "2023-10-10 09:45",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-007",
    name: "Amanda Clark",
    email: "amanda.clark@medcenter.com",
    department: "Nursing",
    role: "staff",
    status: "active",
    lastActive: "2023-10-15 08:30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-008",
    name: "Thomas Anderson",
    email: "thomas.anderson@medcenter.com",
    department: "Laboratory",
    role: "staff",
    status: "active",
    lastActive: "2023-10-14 14:20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-009",
    name: "Jessica Martinez",
    email: "jessica.martinez@medcenter.com",
    department: "Administration",
    role: "viewer",
    status: "active",
    lastActive: "2023-10-15 11:10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-010",
    name: "David Wilson",
    email: "david.wilson@medcenter.com",
    department: "Pharmacy",
    role: "staff",
    status: "active",
    lastActive: "2023-10-13 13:25",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-011",
    name: "Sarah Thompson",
    email: "sarah.thompson@medcenter.com",
    department: "Nursing",
    role: "viewer",
    status: "active",
    lastActive: "2023-10-14 10:15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR-012",
    name: "John Baker",
    email: "john.baker@medcenter.com",
    department: "Laboratory",
    role: "viewer",
    status: "inactive",
    lastActive: "2023-09-30 16:40",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface UsersTableProps {
  role?: string
}

export function UsersTable({ role }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [viewUserId, setViewUserId] = useState<string | null>(null)

  const filteredData = role ? usersData.filter((user) => user.role === role) : usersData

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredData.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredData.map((user) => user.id))
    }
  }

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "administrator":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500 flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            Admin
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
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedUsers.length === filteredData.length && filteredData.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user.id} className={selectedUsers.includes(user.id) ? "bg-muted/50" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleSelectUser(user.id)}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setViewUserId(user.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Manage Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewUserId && (
        <UserDetailsDialog
          userId={viewUserId}
          open={!!viewUserId}
          onOpenChange={(open) => {
            if (!open) setViewUserId(null)
          }}
        />
      )}
    </>
  )
}
