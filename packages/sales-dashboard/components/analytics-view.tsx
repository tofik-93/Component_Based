"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Target, Calendar } from "lucide-react"
import type { Lead, Deal } from "@/types/sales"

interface AnalyticsViewProps {
  leads: Lead[]
  deals: Deal[]
}

export function AnalyticsView({ leads, deals }: AnalyticsViewProps) {
  // Sales funnel data
  const funnelData = [
    { stage: "Leads", count: leads.length, color: "#8884d8" },
    { stage: "Qualified", count: leads.filter((l) => l.status === "qualified").length, color: "#82ca9d" },
    { stage: "Proposal", count: leads.filter((l) => l.status === "proposal").length, color: "#ffc658" },
    { stage: "Negotiation", count: leads.filter((l) => l.status === "negotiation").length, color: "#ff7300" },
    { stage: "Closed Won", count: deals.filter((d) => d.status === "closed-won").length, color: "#00ff00" },
  ]

  // Monthly performance data
  const monthlyData = [
    { month: "Jan", leads: 45, deals: 12, revenue: 125000 },
    { month: "Feb", leads: 52, deals: 15, revenue: 145000 },
    { month: "Mar", leads: 48, deals: 18, revenue: 165000 },
    { month: "Apr", leads: 61, deals: 22, revenue: 185000 },
    { month: "May", leads: 55, deals: 19, revenue: 175000 },
    { month: "Jun", leads: 67, deals: 25, revenue: 205000 },
  ]

  // Lead source distribution
  const sourceData = [
    { name: "Website", value: 35, color: "#0088FE" },
    { name: "LinkedIn", value: 25, color: "#00C49F" },
    { name: "Referral", value: 20, color: "#FFBB28" },
    { name: "Cold Email", value: 15, color: "#FF8042" },
    { name: "Trade Show", value: 5, color: "#8884D8" },
  ]

  // Deal status distribution
  const dealStatusData = [
    { name: "Proposal", value: deals.filter((d) => d.status === "proposal").length, color: "#8884d8" },
    { name: "Negotiation", value: deals.filter((d) => d.status === "negotiation").length, color: "#82ca9d" },
    { name: "Closed Won", value: deals.filter((d) => d.status === "closed-won").length, color: "#ffc658" },
    { name: "Closed Lost", value: deals.filter((d) => d.status === "closed-lost").length, color: "#ff7300" },
  ]

  const totalRevenue = deals.filter((d) => d.status === "closed-won").reduce((sum, deal) => sum + deal.amount, 0)
  const conversionRate =
    leads.length > 0 ? (deals.filter((d) => d.status === "closed-won").length / leads.length) * 100 : 0
  const avgDealSize = deals.length > 0 ? totalRevenue / deals.filter((d) => d.status === "closed-won").length : 0

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-red-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 days</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              -3 days from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Leads, deals, and revenue trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Leads" />
                <Line type="monotone" dataKey="deals" stroke="#82ca9d" name="Deals" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead progression through sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution of lead acquisition channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Status Distribution</CardTitle>
            <CardDescription>Current status of all deals in pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dealStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
