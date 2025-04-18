import type { Metadata } from "next"
import InventoryView from "@/components/inventory/inventory-view"

export const metadata: Metadata = {
  title: "Inventory | Medical Inventory Management",
  description: "Medical Center Inventory Management System",
}

export default function InventoryPage() {
  return <InventoryView />
}
