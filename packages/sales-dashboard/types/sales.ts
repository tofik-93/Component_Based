export interface Lead {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation"
  source: string
  value: number
  lastContact: Date
  createdAt: Date
  updatedAt: Date
}

export interface Deal {
  id: string
  title: string
  company: string
  contact: string
  amount: number
  status: "negotiation" | "proposal" | "closed-won" | "closed-lost"
  probability: number
  expectedCloseDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface SalesMetric {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
}

export interface Company {
  id: string
  name: string
  industry: string
  size: string
  website?: string
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}
