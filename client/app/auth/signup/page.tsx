import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up | Medical Inventory Management System",
  description: "Create an account for the Medical Inventory Management System",
}

export default function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
