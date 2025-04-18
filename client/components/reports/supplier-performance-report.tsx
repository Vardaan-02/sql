"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

const supplierPerformanceData = [
  {
    id: "SUP-001",
    name: "MedSupply Co.",
    category: "Medications, Supplies",
    orders: 156,
    onTimeDelivery: 95,
    qualityRating: 4.8,
    responseTime: "1.2 days",
    status: "preferred",
  },
  {
    id: "SUP-002",
    name: "PharmaTech Inc.",
    category: "Medications",
    orders: 98,
    onTimeDelivery: 88,
    qualityRating: 4.5,
    responseTime: "1.5 days",
    status: "active",
  },
  {
    id: "SUP-003",
    name: "MediEquip Ltd.",
    category: "Equipment",
    orders: 72,
    onTimeDelivery: 82,
    qualityRating: 4.2,
    responseTime: "2.1 days",
    status: "active",
  },
  {
    id: "SUP-004",
    name: "LabSupplies Global",
    category: "Laboratory, Supplies",
    orders: 124,
    onTimeDelivery: 92,
    qualityRating: 4.7,
    responseTime: "1.3 days",
    status: "preferred",
  },
  {
    id: "SUP-007",
    name: "Healthcare Essentials",
    category: "Supplies",
    orders: 112,
    onTimeDelivery: 96,
    qualityRating: 4.9,
    responseTime: "1.0 days",
    status: "preferred",
  },
]

export function SupplierPerformanceReport() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preferred":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500 flex items-center gap-1">
            <Star className="h-3 w-3 fill-green-500" />
            Preferred
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead>On-Time Delivery</TableHead>
              <TableHead>Quality Rating</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierPerformanceData.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.category}</TableCell>
                <TableCell className="text-right">{supplier.orders}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={supplier.onTimeDelivery} className="h-2" />
                    <span className="text-sm">{supplier.onTimeDelivery}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{supplier.qualityRating}</span>
                    <span className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(supplier.qualityRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{supplier.responseTime}</TableCell>
                <TableCell>{getStatusBadge(supplier.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
