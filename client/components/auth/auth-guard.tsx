"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

// Pages that don't require authentication
const publicPages = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return

    // If not authenticated and not on a public page, redirect to login
    if (!isAuthenticated && !publicPages.includes(pathname)) {
      router.push("/auth/login")
    }

    // If authenticated and on a public page, redirect to dashboard
    if (isAuthenticated && publicPages.includes(pathname)) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show nothing while loading
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // If on a public page or authenticated, render children
  if (publicPages.includes(pathname) || isAuthenticated) {
    return <>{children}</>
  }

  // Otherwise render nothing
  return null
}
