"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Calendar, TrendingUp, Users, DollarSign, Filter } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Lead, Deal } from "@/types/sales"

interface ReportsViewProps {
  leads: Lead[]
  deals: Deal[]
}

interface Report {
  id: string
  name: string
  description: string
  type: "sales" | "leads" | "performance" | "forecast"
  lastGenerated: Date
  status: "ready" | "generating" | "scheduled"
}

const availableReports: Report[] = [
  {
    id: "1",
    name: "Monthly Sales Report",
    description: "Comprehensive sales performance for the current month",
    type: "sales",
    lastGenerated: new Date("2024-01-15"),
    status: "ready",
  },
  {
    id: "2",
    name: "Lead Conversion Analysis",
    description: "Analysis of lead sources and conversion rates",
    type: "leads",
    lastGenerated: new Date("2024-01-14"),
    status: "ready",
  },
  {
    id: "3",
    name: "Team Performance Report",
    description: "Individual and team sales performance metrics",
    type: "performance",
    lastGenerated: new Date("2024-01-13"),
    status: "generating",
  },
  {
    id: "4",
    name: "Sales Forecast",
    description: "Projected sales for the next quarter",
    type: "forecast",
    lastGenerated: new Date("2024-01-12"),
    status: "scheduled",
  },
  {
    id: "5",
    name: "Pipeline Health Report",
    description: "Analysis of deal pipeline and potential risks",
    type: "sales",
    lastGenerated: new Date("2024-01-11"),
    status: "ready",
  },
]

export function ReportsView({ leads, deals }: ReportsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedType, setSelectedType] = useState("all")

  const filteredReports =
    selectedType === "all" ? availableReports : availableReports.filter((r) => r.type === selectedType)

  const handleGenerateReport = (report: Report) => {
    toast({
      title: "Generating Report",
      description: `${report.name} is being generated...`,
    })
  }

  const handleDownloadReport = (report: Report) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.name}`,
    })
  }

  const handleScheduleReport = (report: Report) => {
    toast({
      title: "Report Scheduled",
      description: `${report.name} has been scheduled for automatic generation`,
    })
  }

  const getStatusBadge = (status: Report["status"]) => {
    const variants = {
      ready: "default",
      generating: "secondary",
      scheduled: "outline",
    } as const

    const colors = {
      ready: "bg-green-100 text-green-800",
      generating: "bg-blue-100 text-blue-800",
      scheduled: "bg-yellow-100 text-yellow-800",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeIcon = (type: Report["type"]) => {
    switch (type) {
      case "sales":
        return <DollarSign className="h-4 w-4" />
      case "leads":
        return <Users className="h-4 w-4" />
      case "performance":
        return <TrendingUp className="h-4 w-4" />
      case "forecast":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Quick stats for the current period
  const totalRevenue = deals.filter((d) => d.status === "closed-won").reduce((sum, deal) => sum + deal.amount, 0)
  const totalLeads = leads.length
  const conversionRate = totalLeads > 0 ? (deals.filter((d) => d.status === "closed-won").length / totalLeads) * 100 : 0
  const avgDealSize = deals.length > 0 ? totalRevenue / deals.filter((d) => d.status === "closed-won").length : 0

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">Active leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Lead to deal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per closed deal</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>Generate and download comprehensive sales reports</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="forecast">Forecast</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(report.type)}
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">{report.description}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.lastGenerated.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {report.status === "ready" && (
                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleGenerateReport(report)}>
                        Generate
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleScheduleReport(report)}>
                        Schedule
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
