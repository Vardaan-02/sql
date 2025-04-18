import type { Metadata } from "next"
import UsersView from "@/components/users/users-view"

export const metadata: Metadata = {
  title: "Users | Medical Inventory Management",
  description: "User Management for Medical Inventory System",
}

export default function UsersPage() {
  return <UsersView />
}
