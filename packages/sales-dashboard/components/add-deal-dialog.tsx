"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import type { Deal } from "@/types/sales"

interface AddDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddDeal: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => void
}

export function AddDealDialog({ open, onOpenChange, onAddDeal }: AddDealDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    contact: "",
    amount: "",
    status: "proposal" as Deal["status"],
    probability: "50",
    expectedCloseDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.company || !formData.contact || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newDeal: Omit<Deal, "id" | "createdAt" | "updatedAt"> = {
      title: formData.title,
      company: formData.company,
      contact: formData.contact,
      amount: Number.parseFloat(formData.amount),
      status: formData.status,
      probability: Number.parseInt(formData.probability),
      expectedCloseDate: formData.expectedCloseDate ? new Date(formData.expectedCloseDate) : new Date(),
    }

    onAddDeal(newDeal)
    toast({
      title: "Deal Added",
      description: `${formData.title} has been added to your deals.`,
    })

    // Reset form
    setFormData({
      title: "",
      company: "",
      contact: "",
      amount: "",
      status: "proposal",
      probability: "50",
      expectedCloseDate: "",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
          <DialogDescription>Create a new sales opportunity. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="col-span-3"
                placeholder="Deal title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="col-span-3"
                placeholder="Company name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact *
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                className="col-span-3"
                placeholder="Contact person"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                className="col-span-3"
                placeholder="Deal value"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: Deal["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                  <SelectItem value="closed-lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="probability" className="text-right">
                Probability
              </Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData((prev) => ({ ...prev, probability: e.target.value }))}
                className="col-span-3"
                placeholder="Win probability %"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expectedCloseDate" className="text-right">
                Close Date
              </Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, expectedCloseDate: e.target.value }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Deal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
