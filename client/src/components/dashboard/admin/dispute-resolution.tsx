
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisputeResolution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispute Resolution</CardTitle>
        <CardDescription>
          Handle customer disputes and resolve issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Dispute resolution interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, MoreHorizontal, CheckCircle, XCircle, Eye, Filter, Search, MessageSquare 
} from "lucide-react";

export default function DisputeResolution() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("open");
  const [openDisputeDialog, setOpenDisputeDialog] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  // Mock data for the UI
  const disputes = [
    { 
      id: 1, 
      bookingId: "B1023", 
      customerName: "Alice Brown", 
      customerId: 45, 
      providerName: "Quick Plumbing", 
      providerId: 23, 
      serviceName: "Pipe Repair",
      issueDate: "2023-07-15", 
      status: "open",
      priority: "high",
      issueType: "quality",
      description: "The pipe was fixed but started leaking again after 2 days.",
      customerContact: "+264 81 123 4567",
      providerContact: "+264 81 765 4321",
      messages: [
        { id: 1, sender: "customer", time: "2023-07-15T14:30:00", message: "I've raised this dispute because the pipe you fixed is leaking again after just 2 days." },
        { id: 2, sender: "provider", time: "2023-07-15T15:45:00", message: "I'm sorry to hear that. Can you please send a photo of the leak so I can better understand the issue?" },
        { id: 3, sender: "customer", time: "2023-07-15T16:20:00", message: "I've sent the photo to your WhatsApp. The leak is worse than before." }
      ]
    },
    { 
      id: 2, 
      bookingId: "B985", 
      customerName: "John Smith", 
      customerId: 32, 
      providerName: "Clean Home Services", 
      providerId: 18, 
      serviceName: "Deep Cleaning",
      issueDate: "2023-07-12", 
      status: "in_review",
      priority: "medium",
      issueType: "billing",
      description: "I was charged for 4 hours but the cleaner only stayed for 3 hours.",
      customerContact: "+264 81 234 5678",
      providerContact: "+264 81 876 5432",
      messages: [
        { id: 1, sender: "customer", time: "2023-07-12T10:15:00", message: "I've been overcharged for my cleaning service. The cleaner left early but I was billed for the full time." },
        { id: 2, sender: "provider", time: "2023-07-12T11:30:00", message: "Let me check the time logs with our cleaner and get back to you." }
      ]
    },
    { 
      id: 3, 
      bookingId: "B876", 
      customerName: "Emma Wilson", 
      customerId: 56, 
      providerName: "GreenThumb Gardening", 
      providerId: 41, 
      serviceName: "Lawn Maintenance",
      issueDate: "2023-07-10", 
      status: "resolved",
      priority: "low",
      issueType: "no_show",
      resolution: "refund",
      description: "Gardener didn't show up at the scheduled time.",
      resolutionNotes: "Full refund processed. Provider had emergency and failed to notify customer.",
      customerContact: "+264 81 345 6789",
      providerContact: "+264 81 987 6543",
      messages: [
        { id: 1, sender: "customer", time: "2023-07-10T09:45:00", message: "The gardener never showed up for my scheduled appointment." },
        { id: 2, sender: "admin", time: "2023-07-10T10:30:00", message: "We're sorry about this issue. We've contacted the provider and are looking into it." },
        { id: 3, sender: "provider", time: "2023-07-10T11:15:00", message: "I apologize for missing the appointment. I had a family emergency and couldn't make it." },
        { id: 4, sender: "admin", time: "2023-07-10T14:00:00", message: "We've processed a full refund for this booking. The amount will appear in your account in 2-3 business days." }
      ]
    },
    { 
      id: 4, 
      bookingId: "B752", 
      customerName: "David Johnson", 
      customerId: 67, 
      providerName: "ElectroPro", 
      providerId: 29, 
      serviceName: "Electrical Wiring",
      issueDate: "2023-07-08", 
      status: "escalated",
      priority: "critical",
      issueType: "safety",
      description: "Wiring was left exposed and created a safety hazard.",
      customerContact: "+264 81 456 7890",
      providerContact: "+264 81 098 7654",
      messages: [
        { id: 1, sender: "customer", time: "2023-07-08T16:30:00", message: "The electrician left exposed wires that are dangerous. This needs immediate attention!" },
        { id: 2, sender: "admin", time: "2023-07-08T16:45:00", message: "This is a serious issue. We've escalated this to our safety team and are contacting the provider right away." },
        { id: 3, sender: "provider", time: "2023-07-08T17:15:00", message: "I apologize for this oversight. I'll come back immediately to fix the issue." }
      ]
    },
    { 
      id: 5, 
      bookingId: "B645", 
      customerName: "Sarah Miller", 
      customerId: 78, 
      providerName: "Speedy Delivery", 
      providerId: 35, 
      serviceName: "Package Delivery",
      issueDate: "2023-07-05", 
      status: "closed",
      priority: "medium",
      issueType: "damaged",
      resolution: "partial_refund",
      description: "Package was delivered but items inside were damaged.",
      resolutionNotes: "50% refund processed. Provider agreed to partial compensation for damaged goods.",
      customerContact: "+264 81 567 8901",
      providerContact: "+264 81 210 9876",
      messages: [
        { id: 1, sender: "customer", time: "2023-07-05T13:20:00", message: "My package was delivered but the items inside are damaged." },
        { id: 2, sender: "provider", time: "2023-07-05T14:30:00", message: "I'm sorry to hear that. Can you please send photos of the damaged items?" },
        { id: 3, sender: "customer", time: "2023-07-05T15:00:00", message: "I've sent the photos by email." },
        { id: 4, sender: "admin", time: "2023-07-06T10:15:00", message: "After reviewing the case, we've arranged for a 50% refund as compensation for the damaged items." }
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "in_review":
        return <Badge className="bg-yellow-500">In Review</Badge>;
      case "escalated":
        return <Badge className="bg-red-500">Escalated</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-slate-100 text-slate-500">Low</Badge>;
      case "medium":
        return <Badge className="bg-yellow-400">Medium</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleViewDispute = (dispute: any) => {
    setSelectedDispute(dispute);
    setOpenDisputeDialog(true);
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = 
      dispute.customerName.toLowerCase().includes(search.toLowerCase()) || 
      dispute.providerName.toLowerCase().includes(search.toLowerCase()) ||
      dispute.bookingId.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "open") return matchesSearch && dispute.status === "open";
    if (selectedTab === "in_review") return matchesSearch && dispute.status === "in_review";
    if (selectedTab === "escalated") return matchesSearch && dispute.status === "escalated";
    if (selectedTab === "resolved") return matchesSearch && (dispute.status === "resolved" || dispute.status === "closed");
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Dispute Resolution</CardTitle>
          <CardDescription>
            Manage and resolve disputes between customers and service providers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search disputes..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="open"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">All Disputes</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in_review">In Review</TabsTrigger>
                <TabsTrigger value="escalated">Escalated</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDisputes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No disputes found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDisputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.bookingId}</TableCell>
                        <TableCell>{dispute.customerName}</TableCell>
                        <TableCell>{dispute.providerName}</TableCell>
                        <TableCell className="capitalize">{dispute.issueType.replace("_", " ")}</TableCell>
                        <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                        <TableCell>{getPriorityBadge(dispute.priority)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDispute(dispute)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" /> Send message
                              </DropdownMenuItem>
                              {(dispute.status === "open" || dispute.status === "in_review") && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as resolved
                                </DropdownMenuItem>
                              )}
                              {dispute.status === "open" && (
                                <DropdownMenuItem>
                                  <AlertTriangle className="mr-2 h-4 w-4" /> Escalate
                                </DropdownMenuItem>
                              )}
                              {(dispute.status === "resolved" || dispute.status === "closed") && (
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4" /> Reopen dispute
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dispute details dialog */}
      <Dialog open={openDisputeDialog} onOpenChange={setOpenDisputeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Dispute Details</DialogTitle>
            <DialogDescription>
              Review and manage dispute for booking {selectedDispute?.bookingId}.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDispute && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking ID</p>
                  <p className="font-semibold">{selectedDispute.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{selectedDispute.serviceName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p>{selectedDispute.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p>{selectedDispute.providerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedDispute.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Priority</p>
                  <p>{getPriorityBadge(selectedDispute.priority)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Issue Type</p>
                  <p className="capitalize">{selectedDispute.issueType.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date Reported</p>
                  <p>{new Date(selectedDispute.issueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="mt-1 text-sm">{selectedDispute.description}</p>
              </div>
              
              {selectedDispute.resolution && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Resolution</p>
                  <p className="mt-1 text-sm capitalize">{selectedDispute.resolution.replace("_", " ")}</p>
                  <p className="mt-1 text-sm">{selectedDispute.resolutionNotes}</p>
                </div>
              )}
              
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversation History
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {selectedDispute.messages.map((msg: any) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-center' : msg.sender === 'provider' ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`rounded-lg px-4 py-2 max-w-[80%] text-sm
                          ${msg.sender === 'customer' ? 'bg-blue-100' : 
                            msg.sender === 'provider' ? 'bg-green-100' : 
                            'bg-gray-100'}`}
                      >
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          {msg.sender === 'customer' ? selectedDispute.customerName : 
                           msg.sender === 'provider' ? selectedDispute.providerName : 
                           'Admin'} - {new Date(msg.time).toLocaleString()}
                        </p>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response-message">Response</Label>
                <Textarea 
                  id="response-message" 
                  placeholder="Type your response here..." 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={() => setOpenDisputeDialog(false)}>
              Close
            </Button>
            {selectedDispute && (selectedDispute.status === "open" || selectedDispute.status === "in_review") && (
              <>
                <Button>
                  Send Response
                </Button>
                <Button variant="default">
                  Mark as Resolved
                </Button>
              </>
            )}
            {selectedDispute && selectedDispute.status === "open" && (
              <Button variant="destructive">
                Escalate Issue
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
