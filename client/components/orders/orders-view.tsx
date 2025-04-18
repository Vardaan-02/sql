"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Filter, Plus, Search } from "lucide-react"
import { OrdersTable } from "@/components/orders/orders-table"
import { CreateOrderDialog } from "@/components/orders/create-order-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdersView() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Purchase Orders</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search orders..." className="pl-8" />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              <SelectItem value="medsupply">MedSupply Co.</SelectItem>
              <SelectItem value="pharmatech">PharmaTech Inc.</SelectItem>
              <SelectItem value="mediequip">MediEquip Ltd.</SelectItem>
              <SelectItem value="labsupplies">LabSupplies Global</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange date={date} setDate={setDate} />

          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <TabsContent value="all">
          <OrdersTable />
        </TabsContent>

        <TabsContent value="pending">
          <OrdersTable status="pending" />
        </TabsContent>

        <TabsContent value="approved">
          <OrdersTable status="approved" />
        </TabsContent>

        <TabsContent value="in-transit">
          <OrdersTable status="in-transit" />
        </TabsContent>

        <TabsContent value="delivered">
          <OrdersTable status="delivered" />
        </TabsContent>

        <TabsContent value="cancelled">
          <OrdersTable status="cancelled" />
        </TabsContent>
      </Tabs>

      <CreateOrderDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
