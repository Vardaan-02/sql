"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
}: CreateOrderDialogProps) {
  const [orderId] = useState(`ORD-${Date.now()}`);
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [paymentTerms, setPaymentTerms] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState(
    "Medical Center Main Building, 123 Healthcare Ave, Medical District, MD 12345"
  );
  const [supplier, setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>(
    []
  );
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingInstructions, setShippingInstructions] = useState("");
  const [notes, setNotes] = useState("");
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliers(response.data.data); // Adjust if your API structure differs
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const [orderItems, setOrderItems] = useState<
    { id: string; name: string; quantity: number; price: number }[]
  >([
    { id: "1", name: "Paracetamol 500mg", quantity: 100, price: 0.15 },
    { id: "2", name: "Surgical Gloves (M)", quantity: 20, price: 8.5 },
  ]);

  const addItem = () => {
    setOrderItems([...orderItems, { id: "", name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderItems(newItems);
  };

  const calculateTotal = () => {
    return orderItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {
    if (
      !supplier ||
      !paymentTerms ||
      !paymentMethod ||
      orderItems.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      Supplier_ID: Number(supplier),
      Delivery_Date: deliveryDate?.toISOString().split("T")[0] || null,
      Payment_Terms: paymentTerms,
      Payment_Method: paymentMethod,
      Shipping_Address: shippingAddress,
      Shipping_Method: shippingMethod,
      Shipping_Instructions: shippingInstructions,
      Notes: notes,
      items: orderItems.map((item) => ({
        Product_ID: Number(item.id),
        Quantity: item.quantity,
        Unit_Price: item.price,
      })),
    };

    console.log(orderData);

    try {
      const response = await axios.post(
        "http://localhost:5000/purchase-orders", // updated route
        orderData
      );
      console.log("Order submitted successfully:", response.data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new purchase order.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="items">Order Items</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-id">Order ID</Label>
                <Input id="order-id" value={orderId} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-date">Order Date</Label>
                <Input
                  id="order-date"
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select value={supplier} onValueChange={setSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((sup) => (
                      <SelectItem key={sup.Supplier_ID} value={sup.Supplier_ID}>
                        {sup.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-delivery">Expected Delivery</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate
                        ? format(deliveryDate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger id="payment-terms">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net60">Net 60</SelectItem>
                    <SelectItem value="net90">Net 90</SelectItem>
                    <SelectItem value="immediate">Immediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory items..."
                  className="pl-8"
                />
              </div>
              <Button onClick={addItem} type="button">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Item ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead className="w-[100px] text-right">
                      Quantity
                    </TableHead>
                    <TableHead className="w-[100px] text-right">
                      Unit Price
                    </TableHead>
                    <TableHead className="w-[100px] text-right">
                      Total
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={item.id}
                          onChange={(e) =>
                            updateItem(index, "id", e.target.value)
                          }
                          placeholder="Item ID"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.name}
                          onChange={(e) =>
                            updateItem(index, "name", e.target.value)
                          }
                          placeholder="Item name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              Number.parseInt(e.target.value)
                            )
                          }
                          className="text-right"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "price",
                              Number.parseFloat(e.target.value)
                            )
                          }
                          className="text-right"
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          disabled={orderItems.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-medium">
                      Total:
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${calculateTotal()}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-address">Shipping Address</Label>
                <Textarea
                  id="shipping-address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping-method">Shipping Method</Label>
                <Select
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <SelectTrigger id="shipping-method">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Shipping</SelectItem>
                    <SelectItem value="express">Express Shipping</SelectItem>
                    <SelectItem value="overnight">
                      Overnight Shipping
                    </SelectItem>
                    <SelectItem value="pickup">Supplier Pickup</SelectItem>
                  </SelectContent>
                </Select>

                <div className="pt-4">
                  <Label htmlFor="shipping-instructions">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="shipping-instructions"
                    value={shippingInstructions}
                    onChange={(e) => setShippingInstructions(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Order Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
