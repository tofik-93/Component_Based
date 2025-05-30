"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Target } from "lucide-react"
import type { Lead, Deal } from "@/types/sales"

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  trend: "up" | "down"
}

function MetricCard({ title, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>{change} from last month</p>
      </CardContent>
    </Card>
  )
}

interface SalesMetricsProps {
  leads: Lead[]
  deals: Deal[]
}

export function SalesMetrics({ leads, deals }: SalesMetricsProps) {
  const totalRevenue = deals.filter((deal) => deal.status === "closed-won").reduce((sum, deal) => sum + deal.amount, 0)

  const activeLeads = leads.length
  const closedDeals = deals.filter((deal) => deal.status === "closed-won").length
  const conversionRate = leads.length > 0 ? (closedDeals / leads.length) * 100 : 0

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+20.1%",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Active Leads",
      value: `${activeLeads}`,
      change: "+180.1%",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Deals Closed",
      value: `${closedDeals}`,
      change: "+19%",
      icon: Target,
      trend: "up" as const,
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate.toFixed(1)}%`,
      change: "+4.2%",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}
