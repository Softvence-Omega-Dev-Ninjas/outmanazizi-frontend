"use client";

import { MobileSidebar } from "./mobile-sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useNotifications } from "@/hooks/useNotifications";
import { Notification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function Navbar() {
  const { adminInfo, logout } = useAuth();
  const router = useRouter();
  const { data: notifications = [] } = useNotifications();
  
  const unreadCount = notifications.length;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account.",
    });
    router.push("/login");
  };

  return (
    <div className="flex items-center p-4 border-b">
      <MobileSidebar />
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-semibold ml-4 md:ml-0">Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-white text-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification: Notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/notifications" className="w-full text-center text-sm font-medium cursor-pointer">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback>{adminInfo?.name?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{adminInfo?.name || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{adminInfo?.role || "ADMIN"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}