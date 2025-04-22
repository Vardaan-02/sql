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
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface InventoryTableProps {
  category?: string;
  searchQuery?: string;
}

interface InventoryItem {
  Product_ID: string;
  Name: string;
  Category: string;
  Subcategory: string;
  Initial_Stock: number;
  Unit: string;
  Location: string;
  expiry: string | null;
  Status: string;
  Purchase_Price: number;
}

export function InventoryTable({ category, searchQuery }: InventoryTableProps) {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Fetch inventory data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setInventoryData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = inventoryData.filter((item) => {
    const matchesCategory = category ? item.Category === category : true;
    const matchesSearch = searchQuery
      ? item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.Product_ID));
    }
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        // Optionally: refresh list, show notification
        alert("Product deleted successfully!");
        // e.g., refresh data:
        // await fetchInventory();
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedItems.length === filteredData.length &&
                  filteredData.length > 0
                }
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Sub-Category</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 &&
            filteredData.map((item) => (
              <TableRow
                key={item.Product_ID}
                className={
                  selectedItems.includes(item.Product_ID)
                    ? "bg-muted/50"
                    : undefined
                }
              >
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.Product_ID)}
                    onCheckedChange={() => toggleSelectItem(item.Product_ID)}
                    aria-label={`Select ${item.Name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.Product_ID}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell className="capitalize">{item.Category}</TableCell>
                <TableCell className="text-center">
                  {item.Initial_Stock} {item.Unit}
                </TableCell>
                <TableCell>{item.Location}</TableCell>
                <TableCell>{item.Subcategory}</TableCell>{" "}
                {/* No expiry field in the data */}
                <TableCell>{item.Purchase_Price}</TableCell>{" "}
                {/* Add fallback if status isn't provided */}
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(item.Product_ID)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
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
  );
}
