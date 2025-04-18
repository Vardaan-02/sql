"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stockLevelData = [
  {
    category: "Medications",
    totalItems: 245,
    inStock: 210,
    lowStock: 25,
    outOfStock: 10,
    value: "$45,680",
  },
  {
    category: "Equipment",
    totalItems: 120,
    inStock: 105,
    lowStock: 12,
    outOfStock: 3,
    value: "$38,450",
  },
  {
    category: "Supplies",
    totalItems: 350,
    inStock: 290,
    lowStock: 42,
    outOfStock: 18,
    value: "$28,750",
  },
  {
    category: "Laboratory",
    totalItems: 85,
    inStock: 75,
    lowStock: 8,
    outOfStock: 2,
    value: "$11,700",
  },
]

export function StockLevelReport() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Total Items</TableHead>
              <TableHead className="text-right">In Stock</TableHead>
              <TableHead className="text-right">Low Stock</TableHead>
              <TableHead className="text-right">Out of Stock</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockLevelData.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right">{item.totalItems}</TableCell>
                <TableCell className="text-right">
                  {item.inStock} ({((item.inStock / item.totalItems) * 100).toFixed(1)}%)
                </TableCell>
                <TableCell className="text-right">
                  <span className="flex items-center justify-end">
                    {item.lowStock} ({((item.lowStock / item.totalItems) * 100).toFixed(1)}%)
                    <Badge variant="warning" className="ml-2">
                      Low
                    </Badge>
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="flex items-center justify-end">
                    {item.outOfStock} ({((item.outOfStock / item.totalItems) * 100).toFixed(1)}%)
                    <Badge variant="destructive" className="ml-2">
                      Out
                    </Badge>
                  </span>
                </TableCell>
                <TableCell className="text-right">{item.value}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">
                {stockLevelData.reduce((sum, item) => sum + item.totalItems, 0)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {stockLevelData.reduce((sum, item) => sum + item.inStock, 0)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {stockLevelData.reduce((sum, item) => sum + item.lowStock, 0)}
              </TableCell>
              <TableCell className="text-right font-bold">
                {stockLevelData.reduce((sum, item) => sum + item.outOfStock, 0)}
              </TableCell>
              <TableCell className="text-right font-bold">$124,580</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
