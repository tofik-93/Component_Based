"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, DollarSign, Calendar, TrendingUp, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import type { Deal } from "@/types/sales"

interface DealsViewProps {
  deals: Deal[]
}

function getStatusBadge(status: Deal["status"]) {
  const variants = {
    negotiation: "default",
    proposal: "secondary",
    "closed-won": "default",
    "closed-lost": "destructive",
  } as const

  const colors = {
    negotiation: "bg-yellow-100 text-yellow-800",
    proposal: "bg-blue-100 text-blue-800",
    "closed-won": "bg-green-100 text-green-800",
    "closed-lost": "bg-red-100 text-red-800",
  }

  return (
    <Badge variant={variants[status]} className={colors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </Badge>
  )
}

export function DealsView({ deals }: DealsViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredDeals = selectedStatus === "all" ? deals : deals.filter((deal) => deal.status === selectedStatus)

  const totalValue = deals.reduce((sum, deal) => sum + deal.amount, 0)
  const wonDeals = deals.filter((deal) => deal.status === "closed-won")
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.amount, 0)
  const avgDealSize = deals.length > 0 ? totalValue / deals.length : 0

  const handleEditDeal = (deal: Deal) => {
    toast({
      title: "Edit Deal",
      description: `Editing ${deal.title}`,
    })
  }

  const handleDeleteDeal = (deal: Deal) => {
    toast({
      title: "Deal Deleted",
      description: `${deal.title} has been deleted`,
    })
  }

  const handleUpdateStatus = (deal: Deal, newStatus: Deal["status"]) => {
    toast({
      title: "Status Updated",
      description: `${deal.title} status changed to ${newStatus}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Deal Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {deals.length} deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Won Deals Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wonValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{wonDeals.length} deals closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per deal average</p>
          </CardContent>
        </Card>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Deals</CardTitle>
          <CardDescription>Manage your sales pipeline and track deal progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.company}</TableCell>
                  <TableCell>{deal.contact}</TableCell>
                  <TableCell className="font-medium">${deal.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(deal.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={deal.probability} className="w-16" />
                      <span className="text-sm text-muted-foreground">{deal.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{deal.expectedCloseDate.toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit deal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUpdateStatus(deal, "proposal")}>
                          Set to Proposal
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(deal, "negotiation")}>
                          Set to Negotiation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(deal, "closed-won")}>
                          Mark as Won
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(deal, "closed-lost")}>
                          Mark as Lost
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteDeal(deal)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete deal
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
