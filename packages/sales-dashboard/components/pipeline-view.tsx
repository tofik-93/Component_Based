"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { MoreHorizontal, DollarSign, Calendar, User, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import type { Deal } from "@/types/sales"

interface PipelineViewProps {
  deals: Deal[]
}

interface PipelineStage {
  id: string
  title: string
  deals: Deal[]
  color: string
}

export function PipelineView({ deals }: PipelineViewProps) {
  const [selectedOwner, setSelectedOwner] = useState<string>("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("all")

  // Initialize pipeline stages
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: "proposal",
      title: "Proposal",
      deals: deals.filter((deal) => deal.status === "proposal"),
      color: "bg-blue-100 border-blue-200",
    },
    {
      id: "negotiation",
      title: "Negotiation",
      deals: deals.filter((deal) => deal.status === "negotiation"),
      color: "bg-yellow-100 border-yellow-200",
    },
    {
      id: "closed-won",
      title: "Closed Won",
      deals: deals.filter((deal) => deal.status === "closed-won"),
      color: "bg-green-100 border-green-200",
    },
    {
      id: "closed-lost",
      title: "Closed Lost",
      deals: deals.filter((deal) => deal.status === "closed-lost"),
      color: "bg-red-100 border-red-200",
    },
  ])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceStage = stages.find((stage) => stage.id === source.droppableId)
    const destStage = stages.find((stage) => stage.id === destination.droppableId)

    if (!sourceStage || !destStage) return

    const deal = sourceStage.deals.find((d) => d.id === draggableId)
    if (!deal) return

    // Update deal status
    const updatedDeal = { ...deal, status: destination.droppableId as Deal["status"] }

    // Update stages
    const newStages = stages.map((stage) => {
      if (stage.id === source.droppableId) {
        return {
          ...stage,
          deals: stage.deals.filter((d) => d.id !== draggableId),
        }
      }
      if (stage.id === destination.droppableId) {
        const newDeals = [...stage.deals]
        newDeals.splice(destination.index, 0, updatedDeal)
        return {
          ...stage,
          deals: newDeals,
        }
      }
      return stage
    })

    setStages(newStages)

    toast({
      title: "Deal Updated",
      description: `${deal.title} moved to ${destStage.title}`,
    })
  }

  const handleDealAction = (deal: Deal, action: string) => {
    toast({
      title: "Deal Action",
      description: `${action} performed on ${deal.title}`,
    })
  }

  const getTotalValue = (stageDeals: Deal[]) => {
    return stageDeals.reduce((sum, deal) => sum + deal.amount, 0)
  }

  const getWeightedValue = (stageDeals: Deal[]) => {
    return stageDeals.reduce((sum, deal) => sum + deal.amount * (deal.probability / 100), 0)
  }

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Pipeline</h2>
          <p className="text-muted-foreground">Drag and drop deals to update their status</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedOwner} onValueChange={setSelectedOwner}>
            <SelectTrigger className="w-40">
              <User className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {stages.map((stage) => (
          <Card key={stage.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stage.deals.length}</div>
              <p className="text-xs text-muted-foreground">${getTotalValue(stage.deals).toLocaleString()}</p>
              {stage.id !== "closed-won" && stage.id !== "closed-lost" && (
                <p className="text-xs text-muted-foreground">
                  Weighted: ${getWeightedValue(stage.deals).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <Card key={stage.id} className={`${stage.color} min-h-[600px]`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{stage.title}</span>
                  <Badge variant="secondary">{stage.deals.length}</Badge>
                </CardTitle>
                <CardDescription>${getTotalValue(stage.deals).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[400px] ${snapshot.isDraggingOver ? "bg-muted/50 rounded-lg" : ""}`}
                    >
                      {stage.deals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`cursor-move ${
                                snapshot.isDragging ? "shadow-lg rotate-2" : ""
                              } hover:shadow-md transition-shadow`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-sm leading-tight">{deal.title}</h4>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <MoreHorizontal className="h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => handleDealAction(deal, "Edit")}>
                                        Edit Deal
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDealAction(deal, "View")}>
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDealAction(deal, "Contact")}>
                                        Contact Client
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{deal.company}</span>
                                    <span className="font-medium">${deal.amount.toLocaleString()}</span>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src="/placeholder.svg" />
                                      <AvatarFallback className="text-xs">
                                        {deal.contact
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground truncate">{deal.contact}</span>
                                  </div>

                                  {stage.id !== "closed-won" && stage.id !== "closed-lost" && (
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between text-xs">
                                        <span>Probability</span>
                                        <span>{deal.probability}%</span>
                                      </div>
                                      <Progress value={deal.probability} className="h-1" />
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Close: {deal.expectedCloseDate.toLocaleDateString()}</span>
                                    <DollarSign className="h-3 w-3" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
