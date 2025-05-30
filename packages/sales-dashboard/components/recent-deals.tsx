"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Deal } from "@/types/sales"

interface RecentDealsProps {
  deals: Deal[]
}

function getStatusColor(status: Deal["status"]) {
  switch (status) {
    case "negotiation":
      return "text-yellow-600"
    case "proposal":
      return "text-blue-600"
    case "closed-won":
      return "text-green-600"
    case "closed-lost":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

function getStatusText(status: Deal["status"]) {
  switch (status) {
    case "negotiation":
      return "Negotiation"
    case "proposal":
      return "Proposal"
    case "closed-won":
      return "Closed Won"
    case "closed-lost":
      return "Closed Lost"
    default:
      return "Unknown"
  }
}

export function RecentDeals({ deals }: RecentDealsProps) {
  const recentDeals = deals.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deals</CardTitle>
        <CardDescription>Latest deal activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentDeals.map((deal) => (
            <div key={deal.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt={deal.contact} />
                <AvatarFallback>
                  {deal.contact
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{deal.company}</p>
                <p className="text-sm text-muted-foreground">{deal.contact}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm font-medium">${deal.amount.toLocaleString()}</div>
                <div className={`text-xs ${getStatusColor(deal.status)}`}>{getStatusText(deal.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
