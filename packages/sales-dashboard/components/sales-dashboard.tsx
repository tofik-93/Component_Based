"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AddDealDialog } from "@/components/add-deal-dialog"
import { NotificationPanel } from "@/components/notification-panel"
import type { Lead, Deal } from "@/types/sales"

// Mock data
const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@techcorp.com",
    company: "TechCorp",
    phone: "+1 (555) 123-4567",
    status: "qualified",
    source: "Website",
    value: 25000,
    lastContact: new Date("2024-01-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@innovate.io",
    company: "Innovate Solutions",
    phone: "+1 (555) 987-6543",
    status: "new",
    source: "LinkedIn",
    value: 15000,
    lastContact: new Date("2024-01-14"),
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@globaltech.com",
    company: "Global Tech",
    phone: "+1 (555) 456-7890",
    status: "contacted",
    source: "Referral",
    value: 45000,
    lastContact: new Date("2024-01-13"),
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@startup.co",
    company: "Startup Co",
    phone: "+1 (555) 321-0987",
    status: "proposal",
    source: "Cold Email",
    value: 32000,
    lastContact: new Date("2024-01-12"),
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva@enterprise.com",
    company: "Enterprise Inc",
    phone: "+1 (555) 654-3210",
    status: "negotiation",
    source: "Trade Show",
    value: 75000,
    lastContact: new Date("2024-01-11"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-11"),
  },
]

const initialDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "Acme Corp",
    contact: "John Smith",
    amount: 25000,
    status: "negotiation",
    probability: 75,
    expectedCloseDate: new Date("2024-02-15"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Cloud Migration Project",
    company: "TechStart Inc",
    contact: "Sarah Johnson",
    amount: 15000,
    status: "proposal",
    probability: 60,
    expectedCloseDate: new Date("2024-02-28"),
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-14"),
  },
]

export function SalesDashboard() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [isAddDealOpen, setIsAddDealOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")

  const handleAddDeal = (newDeal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => {
    const deal: Deal = {
      ...newDeal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setDeals((prev) => [deal, ...prev])
  }

  const handleUpdateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates, updatedAt: new Date() } : lead)))
  }

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId))
  }

  const handleConvertLeadToDeal = (lead: Lead) => {
    const newDeal: Deal = {
      id: Date.now().toString(),
      title: `${lead.company} - Sales Opportunity`,
      company: lead.company,
      contact: lead.name,
      amount: lead.value,
      status: "proposal",
      probability: 50,
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setDeals((prev) => [newDeal, ...prev])
    handleDeleteLead(lead.id)
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} onViewChange={setActiveView} />
      <SidebarInset>
        <DashboardHeader
          onAddDeal={() => setIsAddDealOpen(true)}
          onNotificationClick={() => setIsNotificationOpen(true)}
        />
        <DashboardContent
          leads={leads}
          deals={deals}
          onUpdateLead={handleUpdateLead}
          onDeleteLead={handleDeleteLead}
          onConvertLeadToDeal={handleConvertLeadToDeal}
          activeView={activeView}
        />
      </SidebarInset>

      <AddDealDialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen} onAddDeal={handleAddDeal} />

      <NotificationPanel open={isNotificationOpen} onOpenChange={setIsNotificationOpen} />
    </SidebarProvider>
  )
}
