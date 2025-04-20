
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
import { Calendar, Check, MoreHorizontal, Search, X, Eye, MessageSquare } from "lucide-react";

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      bookingId: "B10045",
      customer: "Maria Johnson",
      provider: "Quick Plumbing",
      service: "Pipe Repair",
      date: "2023-08-15",
      time: "14:30",
      duration: 120,
      status: "confirmed",
      price: 350.00,
      location: "Windhoek, Central",
      isUrgent: false,
    },
    {
      id: 2,
      bookingId: "B10046",
      customer: "John Smith",
      provider: "ElectroPro",
      service: "Electrical Installation",
      date: "2023-08-15",
      time: "10:00",
      duration: 180,
      status: "in_progress",
      price: 750.00,
      location: "Windhoek, Khomasdal",
      isUrgent: false,
    },
    {
      id: 3,
      bookingId: "B10047",
      customer: "Alice Brown",
      provider: "Clean House Services",
      service: "Deep Cleaning",
      date: "2023-08-16",
      time: "09:00",
      duration: 240,
      status: "pending",
      price: 650.00,
      location: "Windhoek, Kleine Kuppe",
      isUrgent: false,
    },
    {
      id: 4,
      bookingId: "B10048",
      customer: "David Wilson",
      provider: "GreenThumb Gardening",
      service: "Lawn Maintenance",
      date: "2023-08-14",
      time: "16:00",
      duration: 90,
      status: "completed",
      price: 300.00,
      location: "Windhoek, Olympia",
      isUrgent: false,
    },
    {
      id: 5,
      bookingId: "B10049",
      customer: "Sarah Miller",
      provider: "Quick Plumbing",
      service: "Emergency Leak Fix",
      date: "2023-08-15",
      time: "13:00",
      duration: 60,
      status: "confirmed",
      price: 450.00,
      location: "Windhoek, Eros",
      isUrgent: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case "in_progress":
        return <Badge className="bg-purple-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "disputed":
        return <Badge className="bg-orange-500">Disputed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenBookingDialog(true);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(search.toLowerCase()) || 
      booking.provider.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      booking.service.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "active") return matchesSearch && (booking.status === "confirmed" || booking.status === "in_progress");
    if (selectedTab === "pending") return matchesSearch && booking.status === "pending";
    if (selectedTab === "completed") return matchesSearch && booking.status === "completed";
    if (selectedTab === "cancelled") return matchesSearch && booking.status === "cancelled";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            View and manage all bookings across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <Tabs
              defaultValue="active"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.bookingId}
                          {booking.isUrgent && (
                            <Badge className="ml-2 bg-red-500">Urgent</Badge>
                          )}
                        </TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.provider}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          {new Date(booking.date).toLocaleDateString()} {booking.time}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" /> Message parties
                              </DropdownMenuItem>
                              {booking.status === "pending" && (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" /> Confirm booking
                                </DropdownMenuItem>
                              )}
                              {(booking.status === "pending" || booking.status === "confirmed") && (
                                <DropdownMenuItem>
                                  <X className="mr-2 h-4 w-4" /> Cancel booking
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

      {/* Booking details dialog */}
      <Dialog open={openBookingDialog} onOpenChange={setOpenBookingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View detailed information about this booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking ID</p>
                  <p className="font-semibold">
                    {selectedBooking.bookingId}
                    {selectedBooking.isUrgent && (
                      <Badge className="ml-2 bg-red-500">Urgent</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedBooking.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p>{selectedBooking.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p>{selectedBooking.provider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p>N${selectedBooking.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date & Time</p>
                  <p>{new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p>{selectedBooking.duration} minutes</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p>{selectedBooking.location}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={() => setOpenBookingDialog(false)}>
              Close
            </Button>
            {selectedBooking && selectedBooking.status === "pending" && (
              <Button>
                Confirm Booking
              </Button>
            )}
            {selectedBooking && (selectedBooking.status === "pending" || selectedBooking.status === "confirmed") && (
              <Button variant="destructive">
                Cancel Booking
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
