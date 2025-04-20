
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
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
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, CreditCard, CheckCircle, X, AlertCircle } from "lucide-react";

export default function BookingPayments() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Mock data for bookings awaiting payment
  const upcomingBookings = [
    {
      id: 1,
      provider: "CleanCo Services",
      service: "Home Deep Cleaning",
      date: "2023-07-15",
      time: "14:00 - 16:00",
      price: 350,
      status: "pending_payment"
    },
    {
      id: 2,
      provider: "Express Plumbers",
      service: "Plumbing Repairs",
      date: "2023-07-18",
      time: "10:00 - 12:00",
      price: 450,
      status: "pending_payment"
    }
  ];

  // Mock data for payment history
  const paymentHistory = [
    {
      id: 101,
      provider: "Green Thumb Gardening",
      service: "Garden Maintenance",
      date: "2023-06-28",
      amount: 300,
      method: "ewallet",
      status: "completed"
    },
    {
      id: 102,
      provider: "PowerPro Electrical",
      service: "Electrical Installations",
      date: "2023-06-15",
      amount: 500,
      method: "paytoday",
      status: "completed"
    },
    {
      id: 103,
      provider: "QuickRun Errands",
      service: "Grocery Shopping",
      date: "2023-05-30",
      amount: 200,
      method: "card",
      status: "completed"
    }
  ];

  const handlePayNow = (booking: any) => {
    setSelectedBooking(booking);
    setPaymentDialogOpen(true);
  };

  const processPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    // Here you would integrate with the actual payment processor
    alert(`Processing ${paymentMethod} payment for N$${selectedBooking.price}`);
    setPaymentDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_payment":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-300">Awaiting Payment</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-300">Paid</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-300">Failed</Badge>;
      case "refunded":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-300">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Payments</CardTitle>
        <CardDescription>
          Make payments for upcoming bookings and view your payment history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Pending Payments</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No pending payments at the moment.
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.provider}</TableCell>
                        <TableCell>
                          {booking.date}<br />
                          <span className="text-sm text-muted-foreground">{booking.time}</span>
                        </TableCell>
                        <TableCell>N${booking.price}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => handlePayNow(booking)}>Pay Now</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.service}</TableCell>
                      <TableCell>{payment.provider}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>N${payment.amount}</TableCell>
                      <TableCell className="capitalize">{payment.method.replace('_', ' ')}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Payment dialog */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make Payment</DialogTitle>
              <DialogDescription>
                Select your preferred payment method.
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-4 py-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span className="font-medium">{selectedBooking.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium">{selectedBooking.date}, {selectedBooking.time}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Amount:</span>
                  <span>N${selectedBooking.price}</span>
                </div>
                
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paytoday">PayToday</SelectItem>
                      <SelectItem value="payfast">PayFast</SelectItem>
                      <SelectItem value="ewallet">EWallet</SelectItem>
                      <SelectItem value="dop">DOP</SelectItem>
                      <SelectItem value="easywallet">EasyWallet</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
              <Button onClick={processPayment}>
                <DollarSign className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
