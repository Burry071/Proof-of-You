"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, Clock } from "lucide-react"

export default function Notifications() {
  const { isAuthenticated, isDemo, enterDemoMode } = useAuth()
  const { getNotifications } = useDemoData()

  // Get notifications
  const notifications = getNotifications()

  // If not authenticated and not in demo mode, enter demo mode automatically
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      enterDemoMode()
    }
  }, [isAuthenticated, isDemo, enterDemoMode])

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Notifications</h1>
              {isDemo && <DemoIndicator />}
            </div>
            <p className="text-muted-foreground">
              {isDemo
                ? "Demo Mode: Viewing simulated notifications"
                : "Stay updated with the latest information about your verifications"}
            </p>
          </div>
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Your latest updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div
                      className={`shrink-0 p-2 rounded-full ${
                        notification.title.includes("Completed")
                          ? "bg-green-100"
                          : notification.title.includes("Progress")
                            ? "bg-blue-100"
                            : "bg-amber-100"
                      }`}
                    >
                      {notification.title.includes("Completed") ? (
                        <CheckCircle
                          className={`h-5 w-5 ${
                            notification.title.includes("Completed")
                              ? "text-green-600"
                              : notification.title.includes("Progress")
                                ? "text-blue-600"
                                : "text-amber-600"
                          }`}
                        />
                      ) : notification.title.includes("Progress") ? (
                        <Clock
                          className={`h-5 w-5 ${
                            notification.title.includes("Completed")
                              ? "text-green-600"
                              : notification.title.includes("Progress")
                                ? "text-blue-600"
                                : "text-amber-600"
                          }`}
                        />
                      ) : (
                        <Bell
                          className={`h-5 w-5 ${
                            notification.title.includes("Completed")
                              ? "text-green-600"
                              : notification.title.includes("Progress")
                                ? "text-blue-600"
                                : "text-amber-600"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium">No notifications yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You'll receive notifications about your verification activities here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isDemo && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Demo Mode Information</h3>
            <p className="text-sm text-muted-foreground mb-2">
              You're viewing simulated notifications in demo mode. In a real account, you would receive actual
              notifications about your verification activities.
            </p>
            <p className="text-sm text-muted-foreground">
              To receive real notifications, please{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                create an account
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
