import type { Metadata } from "next"
import SuppliersView from "@/components/suppliers/suppliers-view"

export const metadata: Metadata = {
  title: "Suppliers | Medical Inventory Management",
  description: "Supplier Management for Medical Inventory System",
}

export default function SuppliersPage() {
  return <SuppliersView />
}
