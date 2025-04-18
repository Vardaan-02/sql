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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Printer, Truck, XCircle } from "lucide-react"

interface OrderDetailsDialogProps {
  orderId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample order details
const orderDetails = {
  id: "ORD-001",
  supplier: "MedSupply Co.",
  date: "2023-10-12",
  deliveryDate: "2023-10-19",
  amount: "$2,345.00",
  status: "delivered",
  paymentStatus: "paid",
  paymentMethod: "Credit Card",
  paymentTerms: "Net 30",
  shippingAddress: "Medical Center Main Building, 123 Healthcare Ave, Medical District, MD 12345",
  shippingMethod: "Standard Shipping",
  trackingNumber: "TRK123456789",
  notes: "Please deliver to the receiving dock at the back of the building.",
  items: [
    {
      id: "MED-001",
      name: "Paracetamol 500mg",
      quantity: 500,
      unitPrice: "$0.15",
      total: "$75.00",
    },
    {
      id: "SUP-045",
      name: "Surgical Gloves (M)",
      quantity: 100,
      unitPrice: "$8.50",
      total: "$850.00",
    },
    {
      id: "EQP-012",
      name: "Syringe 5ml",
      quantity: 1000,
      unitPrice: "$0.12",
      total: "$120.00",
    },
    {
      id: "MED-023",
      name: "Amoxicillin 250mg",
      quantity: 200,
      unitPrice: "$0.45",
      total: "$90.00",
    },
    {
      id: "SUP-078",
      name: "Surgical Masks",
      quantity: 500,
      unitPrice: "$0.25",
      total: "$125.00",
    },
  ],
}

export function OrderDetailsDialog({ orderId, open, onOpenChange }: OrderDetailsDialogProps) {
  // In a real application, you would fetch the order details based on the orderId

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
        return <Badge variant="warning">In Transit</Badge>
      case "delivered":
        return <Badge variant="success">Delivered</Badge>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Order Details - {orderDetails.id}</DialogTitle>
          <DialogDescription>Complete information about this purchase order.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supplier:</span>
                <span>{orderDetails.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Date:</span>
                <span>{orderDetails.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(orderDetails.status)}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">{orderDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                {getPaymentStatusBadge(orderDetails.paymentStatus)}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Terms:</span>
                <span>{orderDetails.paymentTerms}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground">Address:</span>
              <span>{orderDetails.shippingAddress}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground">Method:</span>
              <span>{orderDetails.shippingMethod}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground">Tracking:</span>
              <span>{orderDetails.trackingNumber}</span>
            </div>
            {orderDetails.notes && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="text-muted-foreground">Notes:</span>
                <span>{orderDetails.notes}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unitPrice}</TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Total:
                  </TableCell>
                  <TableCell className="text-right font-bold">{orderDetails.amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="flex gap-2">
            {orderDetails.status === "pending" && (
              <Button variant="outline" size="sm">
                <Truck className="mr-2 h-4 w-4" />
                Mark as Shipped
              </Button>
            )}
            {(orderDetails.status === "pending" || orderDetails.status === "approved") && (
              <Button variant="outline" size="sm">
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Order
              </Button>
            )}
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
