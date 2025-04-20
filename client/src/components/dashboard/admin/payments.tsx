
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MoreHorizontal, Search, Eye, Download, RefreshCw } from "lucide-react";

export default function Payments() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // Mock data for payments
  const payments = [
    {
      id: 1,
      paymentId: "PMT10045",
      bookingId: "B10045",
      customer: "Maria Johnson",
      provider: "Quick Plumbing",
      service: "Pipe Repair",
      amount: 350.00,
      platformFee: 35.00,
      date: "2023-08-15",
      status: "completed",
      method: "paytoday",
      reference: "PTY78923412",
    },
    {
      id: 2,
      paymentId: "PMT10046",
      bookingId: "B10046",
      customer: "John Smith",
      provider: "ElectroPro",
      service: "Electrical Installation",
      amount: 750.00,
      platformFee: 75.00,
      date: "2023-08-15",
      status: "pending",
      method: "card",
      reference: "",
    },
    {
      id: 3,
      paymentId: "PMT10047",
      bookingId: "B10047",
      customer: "Alice Brown",
      provider: "Clean House Services",
      service: "Deep Cleaning",
      amount: 650.00,
      platformFee: 65.00,
      date: "2023-08-16",
      status: "pending",
      method: "ewallet",
      reference: "",
    },
    {
      id: 4,
      paymentId: "PMT10048",
      bookingId: "B10048",
      customer: "David Wilson",
      provider: "GreenThumb Gardening",
      service: "Lawn Maintenance",
      amount: 300.00,
      platformFee: 30.00,
      date: "2023-08-14",
      status: "completed",
      method: "payfast",
      reference: "PF89034512",
    },
    {
      id: 5,
      paymentId: "PMT10049",
      bookingId: "B10049",
      customer: "Sarah Miller",
      provider: "Quick Plumbing",
      service: "Emergency Leak Fix",
      amount: 450.00,
      platformFee: 45.00,
      date: "2023-08-15",
      status: "failed",
      method: "card",
      reference: "ERR-DECLINED",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "refunded":
        return <Badge className="bg-blue-500">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case "paytoday":
        return "PayToday";
      case "payfast":
        return "PayFast";
      case "ewallet":
        return "EWallet";
      case "dop":
        return "DOP Wallet";
      case "mobile_banking":
        return "Mobile Banking";
      case "card":
        return "Card Payment";
      case "cash":
        return "Cash";
      default:
        return method;
    }
  };

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setOpenPaymentDialog(true);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer.toLowerCase().includes(search.toLowerCase()) || 
      payment.provider.toLowerCase().includes(search.toLowerCase()) ||
      payment.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "pending") return matchesSearch && payment.status === "pending";
    if (selectedTab === "completed") return matchesSearch && payment.status === "completed";
    if (selectedTab === "failed") return matchesSearch && payment.status === "failed";
    if (selectedTab === "refunded") return matchesSearch && payment.status === "refunded";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Processing</CardTitle>
          <CardDescription>
            Monitor and manage all platform payments and transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Export Transactions
              </Button>
            </div>

            <Tabs
              defaultValue="all"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
                <TabsTrigger value="refunded">Refunded</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.paymentId}</TableCell>
                        <TableCell>{payment.bookingId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.provider}</TableCell>
                        <TableCell>N${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                              </DropdownMenuItem>
                              {payment.status === "pending" && (
                                <DropdownMenuItem>
                                  <RefreshCw className="mr-2 h-4 w-4" /> Check Status
                                </DropdownMenuItem>
                              )}
                              {payment.status === "completed" && (
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" /> Download Receipt
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

      {/* Payment details dialog */}
      <Dialog open={openPaymentDialog} onOpenChange={setOpenPaymentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              View detailed information about this payment.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment ID</p>
                  <p className="font-semibold">{selectedPayment.paymentId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedPayment.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking ID</p>
                  <p>{selectedPayment.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{new Date(selectedPayment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p>{selectedPayment.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p>{selectedPayment.provider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p>{getPaymentMethodDisplay(selectedPayment.method)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Reference</p>
                  <p>{selectedPayment.reference || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="font-semibold">N${selectedPayment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Platform Fee</p>
                  <p>N${selectedPayment.platformFee.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider's Share</p>
                  <p>N${(selectedPayment.amount - selectedPayment.platformFee).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={() => setOpenPaymentDialog(false)}>
              Close
            </Button>
            {selectedPayment && selectedPayment.status === "completed" && (
              <Button>
                <Download className="mr-2 h-4 w-4" /> Download Receipt
              </Button>
            )}
            {selectedPayment && selectedPayment.status === "pending" && (
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" /> Check Status
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
