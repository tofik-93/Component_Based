"use client"

import { SalesMetrics } from "@/components/sales-metrics"
import { SalesChart } from "@/components/sales-chart"
import { RecentDeals } from "@/components/recent-deals"
import { LeadsTable } from "@/components/leads-table"
import { DealsView } from "@/components/deals-view"
import { CompaniesView } from "@/components/companies-view"
import { AnalyticsView } from "@/components/analytics-view"
import { ReportsView } from "@/components/reports-view"
import { CalendarView } from "@/components/calendar-view"
import { InboxView } from "@/components/inbox-view"
import { SettingsView } from "@/components/settings-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lead, Deal } from "@/types/sales"
import { PipelineView } from "@/components/pipeline-view"
import { ForecastingView } from "@/components/forecasting-view"

interface DashboardContentProps {
  leads: Lead[]
  deals: Deal[]
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => void
  onDeleteLead: (leadId: string) => void
  onConvertLeadToDeal: (lead: Lead) => void
  activeView: string
}

export function DashboardContent({
  leads,
  deals,
  onUpdateLead,
  onDeleteLead,
  onConvertLeadToDeal,
  activeView,
}: DashboardContentProps) {
  // Render different views based on activeView
  switch (activeView) {
    case "leads":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <LeadsTable
            leads={leads}
            onUpdateLead={onUpdateLead}
            onDeleteLead={onDeleteLead}
            onConvertLeadToDeal={onConvertLeadToDeal}
          />
        </div>
      )

    case "deals":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DealsView deals={deals} />
        </div>
      )

    case "companies":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <CompaniesView leads={leads} deals={deals} />
        </div>
      )

    case "analytics":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <AnalyticsView leads={leads} deals={deals} />
        </div>
      )

    case "reports":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ReportsView leads={leads} deals={deals} />
        </div>
      )

    case "calendar":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <CalendarView deals={deals} />
        </div>
      )

    case "inbox":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <InboxView />
        </div>
      )

    case "settings":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SettingsView />
        </div>
      )
    case "pipeline":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <PipelineView deals={deals} />
        </div>
      )

    case "forecasting":
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ForecastingView deals={deals} />
        </div>
      )

    default:
      // Dashboard view
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SalesMetrics leads={leads} deals={deals} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <SalesChart />
            </div>
            <div className="col-span-3">
              <RecentDeals deals={deals} />
            </div>
          </div>

          <Tabs defaultValue="leads" className="space-y-4">
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="deals">Active Deals</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
            </TabsList>
            <TabsContent value="leads" className="space-y-4">
              <LeadsTable
                leads={leads}
                onUpdateLead={onUpdateLead}
                onDeleteLead={onDeleteLead}
                onConvertLeadToDeal={onConvertLeadToDeal}
              />
            </TabsContent>
            <TabsContent value="deals" className="space-y-4">
              <DealsView deals={deals} />
            </TabsContent>
            <TabsContent value="companies" className="space-y-4">
              <CompaniesView leads={leads} deals={deals} />
            </TabsContent>
          </Tabs>
        </div>
      )
  }
}
