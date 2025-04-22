"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { AddInventoryDialog } from "@/components/inventory/add-inventory-dialog";

export default function InventoryView() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="supplies">Supplies</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="col-id" defaultChecked />
                    <label htmlFor="col-id">ID</label>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="col-name" defaultChecked />
                    <label htmlFor="col-name">Name</label>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="col-category" defaultChecked />
                    <label htmlFor="col-category">Category</label>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="col-stock" defaultChecked />
                    <label htmlFor="col-stock">Stock</label>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="col-expiry" defaultChecked />
                    <label htmlFor="col-expiry">Expiry</label>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all">
          <InventoryTable searchQuery={searchQuery}/>
        </TabsContent>

        <TabsContent value="medications">
          <InventoryTable category="medications" searchQuery={searchQuery}/>
        </TabsContent>

        <TabsContent value="equipment">
          <InventoryTable category="equipment" searchQuery={searchQuery}/>
        </TabsContent>

        <TabsContent value="supplies">
          <InventoryTable category="supplies" searchQuery={searchQuery}/>
        </TabsContent>
      </Tabs>

      <AddInventoryDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
