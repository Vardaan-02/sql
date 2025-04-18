"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "ORD-001",
    supplier: "MedSupply Co.",
    date: "2023-10-12",
    amount: "$2,345.00",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    supplier: "PharmaTech Inc.",
    date: "2023-10-10",
    amount: "$1,245.00",
    status: "In-Transit",
  },
  {
    id: "ORD-003",
    supplier: "MediEquip Ltd.",
    date: "2023-10-08",
    amount: "$4,320.00",
    status: "Pending",
  },
  {
    id: "ORD-004",
    supplier: "LabSupplies Global",
    date: "2023-10-05",
    amount: "$890.00",
    status: "Delivered",
  },
  {
    id: "ORD-005",
    supplier: "MedSupply Co.",
    date: "2023-10-01",
    amount: "$1,670.00",
    status: "Delivered",
  },
]

export function RecentOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.supplier}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "Delivered" ? "success" : order.status === "In-Transit" ? "warning" : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
