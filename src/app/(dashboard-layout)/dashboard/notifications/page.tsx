"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Notification } from "@/types/notification";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Inbox } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Bell className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            All your notifications ({notifications.length} total)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </CardContent>
            </Card>
          ))
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
              <p className="text-sm text-muted-foreground">
                When you receive notifications, they will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification: Notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
