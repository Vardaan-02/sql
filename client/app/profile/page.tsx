import type { Metadata } from "next"
import { ProfileView } from "@/components/profile/profile-view"

export const metadata: Metadata = {
  title: "Profile | Medical Inventory Management System",
  description: "Manage your profile settings",
}

export default function ProfilePage() {
  return <ProfileView />
}
