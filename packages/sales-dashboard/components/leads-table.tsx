"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone, Edit, Trash2, ArrowRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditLeadDialog } from "@/components/edit-lead-dialog"
import { toast } from "@/hooks/use-toast"
import type { Lead } from "@/types/sales"

interface LeadsTableProps {
  leads: Lead[]
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => void
  onDeleteLead: (leadId: string) => void
  onConvertLeadToDeal: (lead: Lead) => void
}

function getStatusBadge(status: Lead["status"]) {
  const variants = {
    new: "secondary",
    contacted: "outline",
    qualified: "default",
    proposal: "secondary",
    negotiation: "destructive",
  } as const

  return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}

export function LeadsTable({ leads, onUpdateLead, onDeleteLead, onConvertLeadToDeal }: LeadsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleDelete = () => {
    if (selectedLead) {
      onDeleteLead(selectedLead.id)
      toast({
        title: "Lead Deleted",
        description: `${selectedLead.name} has been removed from your leads.`,
      })
      setDeleteDialogOpen(false)
      setSelectedLead(null)
    }
  }

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setEditDialogOpen(true)
  }

  const handleConvert = (lead: Lead) => {
    onConvertLeadToDeal(lead)
    toast({
      title: "Lead Converted",
      description: `${lead.name} has been converted to a deal.`,
    })
  }

  const handleSendEmail = (lead: Lead) => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${lead.email}`,
    })
  }

  const handleScheduleCall = (lead: Lead) => {
    toast({
      title: "Call Scheduled",
      description: `Call scheduled with ${lead.name}`,
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Leads Management</CardTitle>
          <CardDescription>Manage and track your sales leads and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span className="text-xs">{lead.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell className="font-medium">${lead.value.toLocaleString()}</TableCell>
                  <TableCell>{lead.lastContact.toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(lead)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(lead)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleScheduleCall(lead)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Schedule call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleConvert(lead)}>
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Convert to deal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLead(lead)
                            setDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete lead
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the lead for{" "}
              <strong>{selectedLead?.name}</strong> from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedLead && (
        <EditLeadDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          lead={selectedLead}
          onUpdateLead={onUpdateLead}
        />
      )}
    </>
  )
}
