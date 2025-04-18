import type { Metadata } from "next"
import OrdersView from "@/components/orders/orders-view"

export const metadata: Metadata = {
  title: "Orders | Medical Inventory Management",
  description: "Purchase Orders Management for Medical Inventory System",
}

export default function OrdersPage() {
  return <OrdersView />
}
