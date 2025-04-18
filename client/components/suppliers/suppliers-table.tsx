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
  MoreHorizontal,
  ShoppingCart,
  Star,
  Trash2,
  UndoIcon,
} from "lucide-react";
import { SupplierDetailsDialog } from "@/components/suppliers/supplier-details-dialog";

interface Supplier {
  Supplier_ID: number;
  Name: string;
  ContactTitle: string;
  ContactName: string;
  ContactEmail: string;
  ContactPhone: string;
  ContactMobile: string;
  ContactFax: string;
  Address: string;
  Currency: string;
  LeadTime: string;
  Website: string;
  TaxId: string;
  PaymentTerms: string;
  Status: string;
  Notes: string;
}

interface SuppliersTableProps {
  status?: string;
  searchQuery?: string;
  category?: string;
}

export function SuppliersTable({
  status,
  searchQuery,
  category,
}: SuppliersTableProps) {
  const [suppliersData, setSuppliersData] = useState<Supplier[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [viewSupplierId, setViewSupplierId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliersData(response.data.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setError("Failed to fetch suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDeleteSupplier = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this supplier?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/suppliers/${id}`);
      setSuppliersData((prev) => prev.filter((s) => s.Supplier_ID !== id));
    } catch (error) {
      console.error("Failed to delete supplier:", error);
      alert("Failed to delete supplier.");
    }
  };

  const filteredData = suppliersData.filter((supplier) => {
    // Filter by status (if the 'status' prop is passed)
    if (status && supplier.Status !== status) {
      return false;
    }

    // Filter by category (if the 'category' prop is passed)
    if (category && category !== "all" && supplier.ContactTitle !== category) {
      return false;
    }

    // Filter by search query (if the 'searchQuery' prop is passed)
    if (
      (searchQuery &&
        !supplier.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  const toggleSelectAll = () => {
    if (selectedSuppliers.length === filteredData.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(
        filteredData.map((supplier) => supplier.Supplier_ID)
      );
    }
  };

  const toggleSelectSupplier = (id: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(id)
        ? prev.filter((supplierId) => supplierId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preferred":
        return (
          <Badge
            variant="outline"
            className="border-green-500 text-green-500 flex items-center gap-1"
          >
            <Star className="h-3 w-3 fill-green-500" />
            Preferred
          </Badge>
        );
      case "active":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Loading suppliers...
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500 text-sm">{error}</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedSuppliers.length === filteredData.length &&
                    filteredData.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Lead Time</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Currency</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 &&
              filteredData.map((supplier) => (
                <TableRow
                  key={supplier.Supplier_ID}
                  className={
                    selectedSuppliers.includes(String(supplier.Supplier_ID))
                      ? "bg-muted/50"
                      : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedSuppliers.includes(
                        String(supplier.Supplier_ID)
                      )}
                      onCheckedChange={() =>
                        toggleSelectSupplier(String(supplier.Supplier_ID))
                      }
                      aria-label={`Select ${supplier.Name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {supplier.Supplier_ID}
                  </TableCell>
                  <TableCell>{supplier.Name}</TableCell>
                  <TableCell>{supplier.ContactTitle}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{supplier.ContactName}</span>
                      <span className="text-xs text-muted-foreground">
                        {supplier.ContactEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.LeadTime} days</TableCell>
                  <TableCell>{supplier.Address}</TableCell>
                  <TableCell>{getStatusBadge(supplier.Status)}</TableCell>
                  <TableCell className="text-right">
                    {supplier.Currency?.toUpperCase()}
                  </TableCell>
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
                            setViewSupplierId(String(supplier.Supplier_ID))
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Supplier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Create Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteSupplier(supplier.Supplier_ID)
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
    </>
  );
}
