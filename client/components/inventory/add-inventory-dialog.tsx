"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

interface AddInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInventoryDialog({
  open,
  onOpenChange,
}: AddInventoryDialogProps) {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    category: "",
    subcategory: "",
    manufacturer: "",
    supplier: "",
    initialStock: "",
    unit: "",
    minStock: "",
    location: "",
    batchNumber: "",
    purchasePrice: "",
    sellingPrice: "",
    description: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data before submitting
    if (
      !formData.itemId ||
      !formData.itemName ||
      !formData.purchasePrice ||
      !formData.sellingPrice
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    // Prepare the data to be sent to the backend
    const data = {
      itemId: formData.itemId,
      itemName: formData.itemName,
      category: formData.category,
      subcategory: formData.subcategory,
      manufacturer: formData.manufacturer,
      supplier: formData.supplier,
      initialStock: formData.initialStock,
      unit: formData.unit,
      minStock: formData.minStock,
      location: formData.location,
      batchNumber: formData.batchNumber,
      purchasePrice: formData.purchasePrice,
      sellingPrice: formData.sellingPrice,
      description: formData.description,
      notes: formData.notes,
    };

    try {
      // Make the Axios request to your API
      const response = await axios.post("http://localhost:5000/products", data);

      // Check for successful response
      if (response.status === 201) {
        alert("Product created successfully");
        console.log(response.data);
        onOpenChange(false); // Close the form or do any other post-submit action
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error submitting form, please try again later.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <DialogDescription>
            Enter the details of the new inventory item below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="stock">Stock Details</TabsTrigger>
              <TabsTrigger value="additional">Additional Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-id">Item ID</Label>
                  <Input
                    id="item-id"
                    name="itemId"
                    placeholder="e.g., MED-001"
                    value={formData.itemId}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    name="itemName"
                    placeholder="e.g., Paracetamol 500mg"
                    value={formData.itemName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medications">Medications</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    name="subcategory"
                    placeholder="e.g., Pain Relief"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    placeholder="e.g., Pharma Inc."
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                  >
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medsupply">MedSupply Co.</SelectItem>
                      <SelectItem value="pharmatech">
                        PharmaTech Inc.
                      </SelectItem>
                      <SelectItem value="mediequip">MediEquip Ltd.</SelectItem>
                      <SelectItem value="labsupplies">
                        LabSupplies Global
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stock" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-stock">Initial Stock</Label>
                  <Input
                    id="initial-stock"
                    name="initialStock"
                    type="number"
                    min="0"
                    placeholder="e.g., 100"
                    value={formData.initialStock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="e.g., Tablets, Boxes"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-stock">Minimum Stock Level</Label>
                  <Input
                    id="min-stock"
                    name="minStock"
                    type="number"
                    min="0"
                    placeholder="e.g., 20"
                    value={formData.minStock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Pharmacy A2"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch-number">Batch Number</Label>
                  <Input
                    id="batch-number"
                    name="batchNumber"
                    placeholder="e.g., BN12345"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase-price">Purchase Price</Label>
                  <Input
                    id="purchase-price"
                    name="purchasePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 10.50"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selling-price">Selling Price</Label>
                  <Input
                    id="selling-price"
                    name="sellingPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 15.75"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter additional details about the item"
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special handling instructions or notes"
                    className="min-h-[100px]"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
