"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  FileText,
  Home,
  Layers,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  History,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserNav } from "@/components/layout/user-nav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { open: isOpen, setOpen: setIsOpen } = useSidebar();

  // Don't show sidebar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null;
  }

  return (
    <>
      <div>
        <div className="m-4 absolute cursor-pointer">
          <Menu onClick={() => setIsOpen(!isOpen)} />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-[260px]">
            <MobileSidebar pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

interface SidebarContentProps {
  pathname: string;
}

function MobileSidebar({ pathname }: SidebarContentProps) {
  const { setOpen: setIsOpen } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setIsOpen(false)}
        >
          <Box className="h-6 w-6" />
          <span>Medical Inventory</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <NavItems pathname={pathname} onClick={() => setIsOpen(false)} />
        </nav>
      </ScrollArea>
      <div className="flex items-center justify-between border-t p-4">
        <ThemeToggle />
        <UserNav />
      </div>
    </div>
  );
}

interface NavItemsProps {
  pathname: string;
  onClick?: () => void;
}

function NavItems({ pathname, onClick }: NavItemsProps) {
  return (
    <>
      <NavItem
        href="/dashboard"
        icon={Home}
        label="Dashboard"
        isActive={pathname === "/dashboard"}
        onClick={onClick}
      />
      <NavItem
        href="/inventory"
        icon={Layers}
        label="Inventory"
        isActive={pathname === "/inventory"}
        onClick={onClick}
      />
      <NavItem
        href="/orders"
        icon={ShoppingCart}
        label="Orders"
        isActive={pathname === "/orders"}
        onClick={onClick}
      />
      <NavItem
        href="/suppliers"
        icon={Truck}
        label="Suppliers"
        isActive={pathname === "/suppliers"}
        onClick={onClick}
      />
      <NavItem
        href="/reports"
        icon={FileText}
        label="Reports"
        isActive={pathname === "/reports"}
        onClick={onClick}
      />
      <NavItem
        href="/analytics"
        icon={BarChart3}
        label="Analytics"
        isActive={pathname === "/analytics"}
        onClick={onClick}
      />
      <NavItem
        href="/users"
        icon={Users}
        label="Users"
        isActive={pathname === "/users"}
        onClick={onClick}
      />
      <NavItem
        href="/audit-logs"
        icon={History}
        label="Audit Logs"
        isActive={pathname === "/audit-logs"}
        onClick={onClick}
      />
      <NavItem
        href="/settings"
        icon={Settings}
        label="Settings"
        isActive={pathname === "/settings"}
        onClick={onClick}
      />
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={onClick}
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
