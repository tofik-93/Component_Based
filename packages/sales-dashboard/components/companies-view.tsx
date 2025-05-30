"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Users, DollarSign, MoreHorizontal, Mail, Phone, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import type { Lead, Deal } from "@/types/sales"

interface CompaniesViewProps {
  leads: Lead[]
  deals: Deal[]
}

interface Company {
  name: string
  industry: string
  leadsCount: number
  dealsCount: number
  totalValue: number
  status: "active" | "prospect" | "customer"
  lastContact: Date
}

export function CompaniesView({ leads, deals }: CompaniesViewProps) {
  // Aggregate company data from leads and deals
  const companies: Company[] = []
  const companyMap = new Map<string, Company>()

  // Process leads
  leads.forEach((lead) => {
    if (!companyMap.has(lead.company)) {
      companyMap.set(lead.company, {
        name: lead.company,
        industry: "Technology", // Mock data
        leadsCount: 0,
        dealsCount: 0,
        totalValue: 0,
        status: "prospect",
        lastContact: lead.lastContact,
      })
    }
    const company = companyMap.get(lead.company)!
    company.leadsCount++
    company.totalValue += lead.value
    if (lead.lastContact > company.lastContact) {
      company.lastContact = lead.lastContact
    }
  })

  // Process deals
  deals.forEach((deal) => {
    if (!companyMap.has(deal.company)) {
      companyMap.set(deal.company, {
        name: deal.company,
        industry: "Technology", // Mock data
        leadsCount: 0,
        dealsCount: 0,
        totalValue: 0,
        status: "customer",
        lastContact: new Date(),
      })
    }
    const company = companyMap.get(deal.company)!
    company.dealsCount++
    company.totalValue += deal.amount
    company.status = deal.status === "closed-won" ? "customer" : "active"
  })

  const companiesArray = Array.from(companyMap.values())

  const totalCompanies = companiesArray.length
  const activeCustomers = companiesArray.filter((c) => c.status === "customer").length
  const totalRevenue = companiesArray.reduce((sum, company) => sum + company.totalValue, 0)

  const handleViewCompany = (company: Company) => {
    toast({
      title: "Company Details",
      description: `Viewing details for ${company.name}`,
    })
  }

  const handleContactCompany = (company: Company) => {
    toast({
      title: "Contact Company",
      description: `Contacting ${company.name}`,
    })
  }

  function getStatusBadge(status: Company["status"]) {
    const variants = {
      active: "default",
      prospect: "secondary",
      customer: "default",
    } as const

    const colors = {
      active: "bg-blue-100 text-blue-800",
      prospect: "bg-yellow-100 text-yellow-800",
      customer: "bg-green-100 text-green-800",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Company Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">In your database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all companies</p>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Companies</CardTitle>
          <CardDescription>Manage your company relationships and track engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Deals</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companiesArray.map((company) => (
                <TableRow key={company.name}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell>{company.leadsCount}</TableCell>
                  <TableCell>{company.dealsCount}</TableCell>
                  <TableCell className="font-medium">${company.totalValue.toLocaleString()}</TableCell>
                  <TableCell>{company.lastContact.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewCompany(company)}>
                          <Building2 className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContactCompany(company)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleContactCompany(company)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Schedule call
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewCompany(company)}>
                          <Globe className="mr-2 h-4 w-4" />
                          Visit website
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
