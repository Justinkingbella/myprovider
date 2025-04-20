
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
import { 
  CreditCard, MoreHorizontal, CheckCircle, XCircle, AlertTriangle, Eye, Search, Filter 
} from "lucide-react";

export default function WithdrawalRequests() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("pending");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Mock data for the UI
  const withdrawalRequests = [
    { 
      id: 1, 
      providerName: "John's Plumbing", 
      providerId: 45, 
      amount: 750.00, 
      requestDate: "2023-07-15", 
      status: "pending",
      paymentMethod: "bank_transfer",
      paymentDetails: {
        accountHolder: "John Smith",
        bankName: "First National Bank",
        accountNumber: "****5678",
        branchCode: "250655"
      }
    },
    { 
      id: 2, 
      providerName: "Clean House Services", 
      providerId: 23, 
      amount: 1200.50, 
      requestDate: "2023-07-12", 
      status: "approved",
      paymentMethod: "ewallet",
      paymentDetails: {
        walletProvider: "EWallet",
        phoneNumber: "+264 81 123 4567"
      },
      processedDate: "2023-07-14",
      transactionId: "TRX89012345"
    },
    { 
      id: 3, 
      providerName: "Quick Errands", 
      providerId: 67, 
      amount: 450.75, 
      requestDate: "2023-07-10", 
      status: "pending",
      paymentMethod: "paytoday",
      paymentDetails: {
        accountId: "PT54321",
        name: "Quick Errands Ltd"
      }
    },
    { 
      id: 4, 
      providerName: "Garden Experts", 
      providerId: 31, 
      amount: 890.25, 
      requestDate: "2023-07-08", 
      status: "rejected",
      paymentMethod: "bank_transfer",
      paymentDetails: {
        accountHolder: "Garden Experts LLC",
        bankName: "Bank Windhoek",
        accountNumber: "****9012",
        branchCode: "482773"
      },
      rejectionReason: "Invalid account details provided"
    },
    { 
      id: 5, 
      providerName: "Elite Electricians", 
      providerId: 52, 
      amount: 1450.00, 
      requestDate: "2023-07-05", 
      status: "completed",
      paymentMethod: "payfast",
      paymentDetails: {
        accountId: "PF12345",
        name: "Elite Electricians"
      },
      processedDate: "2023-07-07",
      transactionId: "TRX78901234"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Bank Transfer";
      case "ewallet":
        return "EWallet";
      case "paytoday":
        return "PayToday";
      case "payfast":
        return "PayFast";
      case "dop":
        return "DOP Wallet";
      default:
        return method;
    }
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setOpenDetailsDialog(true);
  };

  const filteredRequests = withdrawalRequests.filter(request => {
    const matchesSearch = 
      request.providerName.toLowerCase().includes(search.toLowerCase()) || 
      request.providerId.toString().includes(search);
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "pending") return matchesSearch && request.status === "pending";
    if (selectedTab === "approved") return matchesSearch && request.status === "approved";
    if (selectedTab === "completed") return matchesSearch && request.status === "completed";
    if (selectedTab === "rejected") return matchesSearch && request.status === "rejected";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>
            Manage service provider withdrawal requests and process payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search providers..."
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
              defaultValue="pending"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-5">
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No withdrawal requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.providerName}</TableCell>
                        <TableCell>N${request.amount.toFixed(2)}</TableCell>
                        <TableCell>{getPaymentMethodDisplay(request.paymentMethod)}</TableCell>
                        <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewDetails(request)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                              </DropdownMenuItem>
                              {request.status === "pending" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {request.status === "approved" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
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

      {/* Withdrawal details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdrawal Request Details</DialogTitle>
            <DialogDescription>
              Review the details of this withdrawal request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p>{selectedRequest.providerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider ID</p>
                  <p>{selectedRequest.providerId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="font-semibold">N${selectedRequest.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedRequest.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Request Date</p>
                  <p>{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p>{getPaymentMethodDisplay(selectedRequest.paymentMethod)}</p>
                </div>
                {selectedRequest.processedDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Processed Date</p>
                    <p>{new Date(selectedRequest.processedDate).toLocaleDateString()}</p>
                  </div>
                )}
                {selectedRequest.transactionId && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Transaction ID</p>
                    <p>{selectedRequest.transactionId}</p>
                  </div>
                )}
                {selectedRequest.rejectionReason && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Rejection Reason</p>
                    <p className="text-red-500">{selectedRequest.rejectionReason}</p>
                  </div>
                )}
              </div>
              
              <div className="border rounded-md p-4 mt-4">
                <h4 className="text-sm font-semibold mb-2">Payment Details</h4>
                {selectedRequest.paymentMethod === "bank_transfer" && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Account Holder</p>
                      <p>{selectedRequest.paymentDetails.accountHolder}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Bank Name</p>
                      <p>{selectedRequest.paymentDetails.bankName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account Number</p>
                      <p>{selectedRequest.paymentDetails.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Branch Code</p>
                      <p>{selectedRequest.paymentDetails.branchCode}</p>
                    </div>
                  </div>
                )}
                {selectedRequest.paymentMethod === "ewallet" && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Wallet Provider</p>
                      <p>{selectedRequest.paymentDetails.walletProvider}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone Number</p>
                      <p>{selectedRequest.paymentDetails.phoneNumber}</p>
                    </div>
                  </div>
                )}
                {(selectedRequest.paymentMethod === "paytoday" || selectedRequest.paymentMethod === "payfast") && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Account ID</p>
                      <p>{selectedRequest.paymentDetails.accountId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p>{selectedRequest.paymentDetails.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            {selectedRequest && selectedRequest.status === "pending" && (
              <>
                <Button variant="destructive">
                  Reject Request
                </Button>
                <Button>
                  Approve Request
                </Button>
              </>
            )}
            {selectedRequest && selectedRequest.status === "approved" && (
              <Button>
                Mark as Completed
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
