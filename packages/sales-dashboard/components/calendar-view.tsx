"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Deal } from "@/types/sales"

interface CalendarViewProps {
  deals: Deal[]
}

interface CalendarEvent {
  id: string
  title: string
  type: "meeting" | "call" | "demo" | "follow-up" | "deadline"
  time: string
  duration: string
  attendees?: string[]
  deal?: Deal
  date: Date
}

export function CalendarView({ deals }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Generate mock calendar events based on deals
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Demo with Acme Corp",
      type: "demo",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: ["John Smith", "Jane Doe"],
      deal: deals[0],
      date: new Date(2024, 0, 16),
    },
    {
      id: "2",
      title: "Follow-up call - TechStart Inc",
      type: "follow-up",
      time: "2:00 PM",
      duration: "30 minutes",
      attendees: ["Sarah Johnson"],
      deal: deals[1],
      date: new Date(2024, 0, 16),
    },
    {
      id: "3",
      title: "Proposal deadline - Global Solutions",
      type: "deadline",
      time: "5:00 PM",
      duration: "Deadline",
      deal: deals[0],
      date: new Date(2024, 0, 18),
    },
    {
      id: "4",
      title: "Team meeting",
      type: "meeting",
      time: "9:00 AM",
      duration: "1 hour",
      attendees: ["Sales Team"],
      date: new Date(2024, 0, 17),
    },
    {
      id: "5",
      title: "Client call - Enterprise Inc",
      type: "call",
      time: "3:00 PM",
      duration: "45 minutes",
      attendees: ["Emily Chen"],
      date: new Date(2024, 0, 19),
    },
  ]

  const todayEvents = events.filter((event) => {
    const today = new Date()
    return (
      event.date.getDate() === today.getDate() &&
      event.date.getMonth() === today.getMonth() &&
      event.date.getFullYear() === today.getFullYear()
    )
  })

  const upcomingEvents = events.filter((event) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    return event.date >= tomorrow && event.date <= nextWeek
  })

  const handleAddEvent = () => {
    toast({
      title: "Add Event",
      description: "Opening event creation dialog...",
    })
  }

  const handleEventClick = (event: CalendarEvent) => {
    toast({
      title: "Event Details",
      description: `Viewing details for ${event.title}`,
    })
  }

  const handleJoinMeeting = (event: CalendarEvent) => {
    toast({
      title: "Joining Meeting",
      description: `Joining ${event.title}...`,
    })
  }

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "call":
        return "bg-green-100 text-green-800"
      case "demo":
        return "bg-purple-100 text-purple-800"
      case "follow-up":
        return "bg-yellow-100 text-yellow-800"
      case "deadline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "meeting":
      case "demo":
        return <Users className="h-4 w-4" />
      case "call":
      case "follow-up":
        return <Clock className="h-4 w-4" />
      case "deadline":
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Calendar</h2>
          <p className="text-muted-foreground">Manage your sales activities and meetings</p>
        </div>
        <Button onClick={handleAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Events
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events scheduled for today</p>
            ) : (
              todayEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.time} • {event.duration}
                    </p>
                    <Badge variant="outline" className={`text-xs mt-1 ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEventClick(event)}>
                    View
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming events</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString()} • {event.time}
                    </p>
                    <Badge variant="outline" className={`text-xs mt-1 ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleEventClick(event)}>
                    View
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common calendar actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={handleAddEvent}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleAddEvent}>
              <Clock className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleAddEvent}>
              <Users className="h-4 w-4 mr-2" />
              Book Demo
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleAddEvent}>
              <Calendar className="h-4 w-4 mr-2" />
              Set Deadline
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setMonth(newDate.getMonth() - 1)
                  setCurrentDate(newDate)
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setMonth(newDate.getMonth() + 1)
                  setCurrentDate(newDate)
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {/* Calendar days would be rendered here */}
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className="p-2 text-sm border rounded cursor-pointer hover:bg-muted/50 min-h-[60px] flex flex-col"
                onClick={() => setSelectedDate(new Date())}
              >
                <span>{((i % 31) + 1).toString()}</span>
                {/* Event indicators would be shown here */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
