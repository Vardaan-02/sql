"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { OrderDetailsDialog } from "@/components/orders/order-details-dialog";

interface OrdersTableProps {
  status?: string;
}

interface OrderItem {
  Purchase_Order_ID: number;
  Order_ID: string;
  Supplier_ID: number; // or string if you plan to map it to a name
  Order_Date: string; // ISO string
  Delivery_Date: string; // ISO string
  Shipping_Method: string;
  Shipping_Address: string;
  Shipping_Instructions: string;
  Payment_Method: string;
  Payment_Terms: string;
  Total_Amount: string; // or number if you're treating it as numeric
  Notes: string;
  Status?: string; // optional, if status exists
  paymentStatus?: string; // optional, if you want to keep it separately
}

export function OrdersTable({ status }: OrdersTableProps) {
  const [ordersData, setOrdersData] = useState<OrderItem[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [viewOrderId, setViewOrderId] = useState<string | null>(null);

  // Fetch orders data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/purchase-orders"
        ); // Replace with your API endpoint
        setOrdersData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = status
    ? ordersData.filter((order) => order.status === status)
    : ordersData;

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredData.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredData.map((order) => order.id));
    }
  };

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this supplier?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/purchase-orders/${id}`);
      setOrdersData((prev) => prev.filter((s) => s.Purchase_Order_ID !== id));
    } catch (error) {
      console.error("Failed to delete supplier:", error);
      alert("Failed to delete supplier.");
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Paid
          </Badge>
        );
      case "unpaid":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Unpaid
          </Badge>
        );
      case "refunded":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-500"
          >
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedOrders.length === filteredData.length &&
                    filteredData.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Shipping Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Terms</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 &&
              filteredData.map((order) => (
                <TableRow
                  key={order.Purchase_Order_ID}
                  className={
                    selectedOrders.includes(order.Purchase_Order_ID)
                      ? "bg-muted/50"
                      : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.Purchase_Order_ID)}
                      onCheckedChange={() =>
                        toggleSelectOrder(order.Purchase_Order_ID)
                      }
                      aria-label={`Select ${order.Order_ID}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.Order_ID}
                  </TableCell>
                  <TableCell>{order.Supplier_ID}</TableCell>
                  <TableCell>
                    {new Date(order.Order_Date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(order.Delivery_Date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.Shipping_Method}</TableCell>
                  <TableCell>${order.Total_Amount}</TableCell>
                  <TableCell>{order.Payment_Method}</TableCell>
                  <TableCell>{order.Payment_Terms}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() =>
                            setViewOrderId(order.Purchase_Order_ID)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteOrder(order.Purchase_Order_ID)
                          }
                        >
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

      {viewOrderId && (
        <OrderDetailsDialog
          orderId={viewOrderId}
          open={!!viewOrderId}
          onOpenChange={(open) => {
            if (!open) setViewOrderId(null);
          }}
        />
      )}
    </>
  );
}
