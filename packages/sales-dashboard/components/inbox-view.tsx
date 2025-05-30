"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Send, Reply, Archive, Trash2, Star, Search, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  timestamp: Date
  read: boolean
  starred: boolean
  type: "email" | "sms" | "note"
  leadId?: string
  dealId?: string
}

const messages: Message[] = [
  {
    id: "1",
    from: "alice@techcorp.com",
    to: "sales@company.com",
    subject: "Re: Product Demo Request",
    content:
      "Thank you for the demo yesterday. We're very interested in moving forward with the enterprise package. Could we schedule a follow-up meeting to discuss pricing?",
    timestamp: new Date("2024-01-16T10:30:00"),
    read: false,
    starred: true,
    type: "email",
    leadId: "1",
  },
  {
    id: "2",
    from: "bob@innovate.io",
    to: "sales@company.com",
    subject: "Initial Inquiry",
    content:
      "Hi, I saw your LinkedIn post about the new features. We're a growing startup and looking for a solution like yours. Can we set up a call?",
    timestamp: new Date("2024-01-16T09:15:00"),
    read: true,
    starred: false,
    type: "email",
    leadId: "2",
  },
  {
    id: "3",
    from: "+1-555-123-4567",
    to: "sales@company.com",
    subject: "SMS: Follow-up reminder",
    content:
      "Hi John, this is Carol from Global Tech. Just wanted to follow up on our conversation last week. Are you available for a quick call today?",
    timestamp: new Date("2024-01-16T08:45:00"),
    read: true,
    starred: false,
    type: "sms",
    leadId: "3",
  },
  {
    id: "4",
    from: "david@startup.co",
    to: "sales@company.com",
    subject: "Proposal Questions",
    content:
      "I've reviewed the proposal you sent. Overall it looks good, but I have a few questions about the implementation timeline and support options.",
    timestamp: new Date("2024-01-15T16:20:00"),
    read: true,
    starred: false,
    type: "email",
    dealId: "4",
  },
]

export function InboxView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const unreadCount = messages.filter((m) => !m.read).length
  const starredMessages = messages.filter((m) => m.starred)

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    // Mark as read
    message.read = true
  }

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return

    toast({
      title: "Reply Sent",
      description: `Reply sent to ${selectedMessage.from}`,
    })
    setReplyContent("")
  }

  const handleArchive = (message: Message) => {
    toast({
      title: "Message Archived",
      description: `Message from ${message.from} has been archived`,
    })
  }

  const handleDelete = (message: Message) => {
    toast({
      title: "Message Deleted",
      description: `Message from ${message.from} has been deleted`,
    })
  }

  const handleStar = (message: Message) => {
    message.starred = !message.starred
    toast({
      title: message.starred ? "Message Starred" : "Star Removed",
      description: `Message from ${message.from} ${message.starred ? "starred" : "unstarred"}`,
    })
  }

  const handleCompose = () => {
    toast({
      title: "Compose Message",
      description: "Opening compose dialog...",
    })
  }

  const getMessageTypeIcon = (type: Message["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Send className="h-4 w-4" />
      case "note":
        return <Reply className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getMessageTypeBadge = (type: Message["type"]) => {
    const colors = {
      email: "bg-blue-100 text-blue-800",
      sms: "bg-green-100 text-green-800",
      note: "bg-yellow-100 text-yellow-800",
    }

    return (
      <Badge variant="outline" className={colors[type]}>
        {type.toUpperCase()}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Inbox Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inbox</h2>
          <p className="text-muted-foreground">Manage your sales communications</p>
        </div>
        <Button onClick={handleCompose}>
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      {/* Inbox Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starred</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{starredMessages.length}</div>
            <p className="text-xs text-muted-foreground">Important messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Message List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <div className="space-y-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 cursor-pointer hover:bg-muted/50 border-b ${
                        selectedMessage?.id === message.id ? "bg-muted" : ""
                      } ${!message.read ? "font-semibold" : ""}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {message.from
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{message.from}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-1">
                            {getMessageTypeIcon(message.type)}
                            {message.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="mt-0">
                <div className="space-y-1">
                  {messages
                    .filter((m) => !m.read)
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 cursor-pointer hover:bg-muted/50 border-b font-semibold ${
                          selectedMessage?.id === message.id ? "bg-muted" : ""
                        }`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {message.from
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate">{message.from}</p>
                              <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <div className="flex items-center space-x-1">
                              {getMessageTypeIcon(message.type)}
                              {message.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="starred" className="mt-0">
                <div className="space-y-1">
                  {starredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 cursor-pointer hover:bg-muted/50 border-b ${
                        selectedMessage?.id === message.id ? "bg-muted" : ""
                      } ${!message.read ? "font-semibold" : ""}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {message.from
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{message.from}</p>
                            <p className="text-xs text-muted-foreground truncate">{message.subject}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-1">
                            {getMessageTypeIcon(message.type)}
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="md:col-span-2">
          <CardHeader>
            {selectedMessage ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {selectedMessage.from
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      From: {selectedMessage.from} • {selectedMessage.timestamp.toLocaleString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getMessageTypeBadge(selectedMessage.type)}
                  <Button variant="ghost" size="sm" onClick={() => handleStar(selectedMessage)}>
                    <Star className={`h-4 w-4 ${selectedMessage.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleArchive(selectedMessage)}>
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(selectedMessage)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <CardTitle>Select a message</CardTitle>
                <CardDescription>Choose a message from the list to view its content</CardDescription>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                </div>

                {/* Reply Section */}
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium mb-3">Reply</h4>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={4}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Archive className="h-4 w-4 mr-2" />
                          Template
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                      <Button onClick={handleReply} disabled={!replyContent.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No message selected</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
