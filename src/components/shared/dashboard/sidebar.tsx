"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserCheck,
  ShoppingCart,
  ArrowRightLeft,
  LogOut,
  Menu,
  LayoutDashboard,
  Briefcase,
  MapPin,
  CheckCircle,
  Star,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Service Providers",
    href: "/dashboard/service-provider",
    icon: UserCheck,
  },
  // {
  //   title: "Verifications",
  //   href: "/dashboard/verifications",
  //   icon: CheckCircle,
  // },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Briefcase,
  },
  {
    title: "Areas",
    href: "/dashboard/areas",
    icon: MapPin,
  },
  {
    title: "Orders",
    href: "/dashboard/order",
    icon: ShoppingCart,
  },
  {
    title: "Transfers",
    href: "/dashboard/transfer",
    icon: ArrowRightLeft,
  },
  // {
  //   title: "Reviews",
  //   href: "/dashboard/reviews",
  //   icon: Star,
  // },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account.",
    });
    router.push("/login");
  };

  return (
    <div
      className={cn("h-screen flex flex-col bg-background border-r", className)}
    >
      <div className="py-4 flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-2 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Admin</h2>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-1 flex-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
          <div className="pt-4 shrink-0">
            <Separator className="mb-4" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
