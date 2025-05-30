"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface NotificationPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const notifications = [
  {
    id: "1",
    title: "New lead assigned",
    description: "Alice Johnson from TechCorp has been assigned to you",
    time: "2 minutes ago",
    type: "info",
    unread: true,
  },
  {
    id: "2",
    title: "Deal closed",
    description: "Global Solutions deal worth $45,000 has been closed",
    time: "1 hour ago",
    type: "success",
    unread: true,
  },
  {
    id: "3",
    title: "Follow-up reminder",
    description: "Schedule follow-up call with David Wilson",
    time: "3 hours ago",
    type: "warning",
    unread: false,
  },
  {
    id: "4",
    title: "Meeting scheduled",
    description: "Demo meeting with Enterprise Inc at 3 PM",
    time: "1 day ago",
    type: "info",
    unread: false,
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "warning":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Bell className="h-4 w-4 text-blue-600" />
  }
}

export function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Stay updated with your latest sales activities</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.unread ? "bg-muted/50" : "bg-background"}`}
            >
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {notification.unread && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Mark all as read
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
