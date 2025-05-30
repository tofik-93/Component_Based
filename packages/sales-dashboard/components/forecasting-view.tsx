"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Target, Calendar, DollarSign, Users, Download, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Deal } from "@/types/sales"

interface ForecastingViewProps {
  deals: Deal[]
}

export function ForecastingView({ deals }: ForecastingViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("quarter")
  const [selectedScenario, setSelectedScenario] = useState("realistic")

  // Mock forecast data
  const forecastData = [
    { month: "Jan", conservative: 120000, realistic: 150000, optimistic: 180000, actual: 145000 },
    { month: "Feb", conservative: 130000, realistic: 160000, optimistic: 190000, actual: 155000 },
    { month: "Mar", conservative: 140000, realistic: 170000, optimistic: 200000, actual: 165000 },
    { month: "Apr", conservative: 135000, realistic: 165000, optimistic: 195000, actual: null },
    { month: "May", conservative: 145000, realistic: 175000, optimistic: 205000, actual: null },
    { month: "Jun", conservative: 155000, realistic: 185000, optimistic: 215000, actual: null },
  ]

  const pipelineData = [
    { stage: "Proposal", value: 450000, probability: 30, weighted: 135000 },
    { stage: "Negotiation", value: 320000, probability: 60, weighted: 192000 },
    { stage: "Verbal Commit", value: 180000, probability: 85, weighted: 153000 },
    { stage: "Contract Sent", value: 120000, probability: 95, weighted: 114000 },
  ]

  const teamForecast = [
    { name: "John Doe", target: 50000, forecast: 48000, actual: 45000, achievement: 90 },
    { name: "Jane Smith", target: 45000, forecast: 47000, actual: 49000, achievement: 109 },
    { name: "Mike Johnson", target: 40000, forecast: 38000, actual: 36000, achievement: 90 },
    { name: "Sarah Wilson", target: 35000, forecast: 39000, actual: 41000, achievement: 117 },
  ]

  const confidenceData = [
    { name: "High Confidence", value: 35, color: "#22c55e" },
    { name: "Medium Confidence", value: 45, color: "#f59e0b" },
    { name: "Low Confidence", value: 20, color: "#ef4444" },
  ]

  const currentQuarterTarget = 500000
  const currentQuarterForecast = 485000
  const currentQuarterActual = 365000
  const achievementRate = (currentQuarterActual / currentQuarterTarget) * 100

  const handleRefreshForecast = () => {
    toast({
      title: "Forecast Updated",
      description: "Sales forecast has been refreshed with latest data",
    })
  }

  const handleExportForecast = () => {
    toast({
      title: "Export Started",
      description: "Forecast report is being generated for download",
    })
  }

  const handleScenarioChange = (scenario: string) => {
    setSelectedScenario(scenario)
    toast({
      title: "Scenario Updated",
      description: `Switched to ${scenario} forecast scenario`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Forecasting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Forecasting</h2>
          <p className="text-muted-foreground">Predict future sales performance and track progress</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefreshForecast}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExportForecast}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quarter Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentQuarterTarget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Q1 2024 Goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentQuarterForecast.toLocaleString()}</div>
            <p className="text-xs text-green-600">97% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentQuarterActual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">73% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievement</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievementRate.toFixed(1)}%</div>
            <div className="mt-2">
              <Progress value={achievementRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">Forecast Trends</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Analysis</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Levels</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue Forecast</CardTitle>
                    <CardDescription>Projected vs actual revenue by month</CardDescription>
                  </div>
                  <Select value={selectedScenario} onValueChange={handleScenarioChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="optimistic">Optimistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={forecastData}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, ""]} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey={selectedScenario}
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                      name="Forecast"
                    />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                      name="Actual"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast Accuracy</CardTitle>
                <CardDescription>Historical forecast vs actual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">January</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      97%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">February</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      103%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">March</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      97%
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Accuracy</span>
                    <span className="text-lg font-bold text-green-600">99%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Weighted Forecast</CardTitle>
                <CardDescription>Deals by stage with probability weighting</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pipelineData}>
                    <XAxis dataKey="stage" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, ""]} />
                    <Bar dataKey="value" fill="#8884d8" name="Pipeline Value" />
                    <Bar dataKey="weighted" fill="#82ca9d" name="Weighted Value" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Health</CardTitle>
                <CardDescription>Stage-by-stage analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineData.map((stage) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">${stage.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={stage.probability} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-12">{stage.probability}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Weighted: ${stage.weighted.toLocaleString()}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Forecast Performance</CardTitle>
              <CardDescription>Individual targets vs forecasts vs actual performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamForecast.map((member) => (
                  <div key={member.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{member.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          member.achievement >= 100
                            ? "bg-green-100 text-green-800"
                            : member.achievement >= 90
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {member.achievement}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium">${member.target.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Forecast</p>
                        <p className="font-medium">${member.forecast.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Actual</p>
                        <p className="font-medium">${member.actual.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={member.achievement} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confidence" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Confidence</CardTitle>
                <CardDescription>Confidence levels across pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={confidenceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {confidenceData.map((entry, index) => (
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
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Potential risks to forecast achievement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="text-sm font-medium">Economic Uncertainty</p>
                      <p className="text-xs text-muted-foreground">Market volatility impact</p>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      High
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="text-sm font-medium">Competition</p>
                      <p className="text-xs text-muted-foreground">New market entrants</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Medium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="text-sm font-medium">Resource Constraints</p>
                      <p className="text-xs text-muted-foreground">Team capacity limits</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Medium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="text-sm font-medium">Seasonal Trends</p>
                      <p className="text-xs text-muted-foreground">Q4 holiday impact</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Low
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
