"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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
import { Edit, Eye, FileText, MoreHorizontal, Truck, XCircle } from "lucide-react"
import { OrderDetailsDialog } from "@/components/orders/order-details-dialog"

interface OrdersTableProps {
  status?: string
}

interface OrderItem {
  id: string
  supplier: string
  date: string
  deliveryDate: string
  items: string
  amount: string
  status: string
  paymentStatus: string
}

export function OrdersTable({ status }: OrdersTableProps) {
  const [ordersData, setOrdersData] = useState<OrderItem[]>([])
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [viewOrderId, setViewOrderId] = useState<string | null>(null)

  // Fetch orders data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000//purchase-orders") // Replace with your API endpoint
        setOrdersData(response.data)
      } catch (error) {
        console.error("Error fetching orders data:", error)
      }
    }

    fetchData()
  }, [])

  const filteredData = status ? ordersData.filter((order) => order.status === status) : ordersData

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredData.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredData.map((order) => order.id))
    }
  }

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Approved
          </Badge>
        )
      case "in-transit":
        return <Badge variant="default">In Transit</Badge>
      case "delivered":
        return <Badge variant="secondary">Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Paid
          </Badge>
        )
      case "unpaid":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Unpaid
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Refunded
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
                  checked={selectedOrders.length === filteredData.length && filteredData.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((order) => (
              <TableRow key={order.id} className={selectedOrders.includes(order.id) ? "bg-muted/50" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleSelectOrder(order.id)}
                    aria-label={`Select ${order.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
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
                      <DropdownMenuItem onClick={() => setViewOrderId(order.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Invoice
                      </DropdownMenuItem>
                      {order.status === "pending" && (
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Mark as Shipped
                        </DropdownMenuItem>
                      )}
                      {(order.status === "pending" || order.status === "approved") && (
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Order
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewOrderId && (
        <OrderDetailsDialog
          orderId={viewOrderId}
          open={!!viewOrderId}
          onOpenChange={(open) => {
            if (!open) setViewOrderId(null)
          }}
        />
      )}
    </>
  )
}
