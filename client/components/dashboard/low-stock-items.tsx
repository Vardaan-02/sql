"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const lowStockItems = [
  {
    id: "MED-001",
    name: "Paracetamol 500mg",
    category: "Medication",
    current: 15,
    minimum: 50,
    level: "critical",
  },
  {
    id: "MED-023",
    name: "Amoxicillin 250mg",
    category: "Medication",
    current: 25,
    minimum: 40,
    level: "warning",
  },
  {
    id: "SUP-045",
    name: "Surgical Gloves (M)",
    category: "Supplies",
    current: 120,
    minimum: 200,
    level: "warning",
  },
  {
    id: "EQP-012",
    name: "Syringe 5ml",
    category: "Equipment",
    current: 30,
    minimum: 100,
    level: "critical",
  },
]

export function LowStockItems() {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              <Badge variant={item.level === "critical" ? "destructive" : "warning"} className="text-xs">
                {item.level}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {item.category} • ID: {item.id}
            </div>
            <div className="text-sm">
              <span className="font-medium">{item.current}</span>
              <span className="text-muted-foreground">/{item.minimum} units</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="h-8">
            <ShoppingCart className="mr-1 h-3.5 w-3.5" />
            Order
          </Button>
        </div>
      ))}
    </div>
  )
}
