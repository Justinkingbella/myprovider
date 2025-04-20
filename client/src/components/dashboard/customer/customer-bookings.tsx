
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare,
  Eye,
  User,
  Calendar as CalendarIcon
} from "lucide-react";

export default function CustomerBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Mock data for bookings
  const upcomingBookings = [
    {
      id: 1,
      provider: {
        name: "CleanCo Services",
        contact: "+264 81 123 4567",
        image: "https://i.pravatar.cc/150?img=1"
      },
      service: "Home Deep Cleaning",
      date: "2023-07-15",
      time: "14:00 - 16:00",
      status: "confirmed",
      location: "7863 Independence Ave, Windhoek",
      price: 350,
      priceType: "hourly",
      notes: "Please focus on the kitchen and bathrooms"
    },
    {
      id: 2,
      provider: {
        name: "Express Plumbers",
        contact: "+264 81 456 7890",
        image: "https://i.pravatar.cc/150?img=2"
      },
      service: "Plumbing Repairs",
      date: "2023-07-18",
      time: "10:00 - 12:00",
      status: "pending",
      location: "495 Sam Nujoma Dr, Windhoek",
      price: 450,
      priceType: "hourly",
      notes: "Leaking faucet in kitchen and bathroom"
    }
  ];

  const pastBookings = [
    {
      id: 101,
      provider: {
        name: "Green Thumb Gardening",
        contact: "+264 81 789 1234",
        image: "https://i.pravatar.cc/150?img=3"
      },
      service: "Garden Maintenance",
      date: "2023-06-28",
      time: "09:00 - 11:00",
      status: "completed",
      location: "21 Robert Mugabe Ave, Windhoek",
      price: 300,
      priceType: "hourly"
    },
    {
      id: 102,
      provider: {
        name: "PowerPro Electrical",
        contact: "+264 81 234 5678",
        image: "https://i.pravatar.cc/150?img=4"
      },
      service: "Electrical Installations",
      date: "2023-06-15",
      time: "13:00 - 16:00",
      status: "cancelled",
      location: "18 Nelson Mandela Ave, Windhoek",
      price: 500,
      priceType: "fixed",
      cancellationReason: "Provider unavailable due to emergency"
    }
  ];

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setBookingDetailsOpen(true);
  };

  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    // In a real app, this would send the cancellation to the backend
    alert(`Booking ${selectedBooking.id} cancelled`);
    setCancelDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-300">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-300">Confirmed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-300">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-300">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
        <CardDescription>
          View and manage your upcoming and past bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                You don't have any upcoming bookings.
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.provider.name}</TableCell>
                        <TableCell>
                          {booking.date}<br />
                          <span className="text-sm text-muted-foreground">{booking.time}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDetails(booking)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleCancelBooking(booking)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastBookings.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                You don't have any past bookings.
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.provider.name}</TableCell>
                        <TableCell>
                          {booking.date}<br />
                          <span className="text-sm text-muted-foreground">{booking.time}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewDetails(booking)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Booking details dialog */}
        <Dialog open={bookingDetailsOpen} onOpenChange={setBookingDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Reference: #{selectedBooking?.id}
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service</p>
                    <p className="font-medium">{selectedBooking.service}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div>{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Provider</p>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p>{selectedBooking.provider.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.provider.contact}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>{selectedBooking.date}</p>
                        <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p>{selectedBooking.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p>N${selectedBooking.price} {selectedBooking.priceType === 'hourly' ? '/ hour' : 'fixed'}</p>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedBooking.notes}</p>
                  </div>
                )}
                
                {selectedBooking.cancellationReason && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Cancellation Reason</p>
                    <p className="text-sm">{selectedBooking.cancellationReason}</p>
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter className="flex gap-2 sm:gap-0">
              {selectedBooking && selectedBooking.status !== 'completed' && selectedBooking.status !== 'cancelled' && (
                <Button 
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setBookingDetailsOpen(false);
                    handleCancelBooking(selectedBooking);
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Booking
                </Button>
              )}
              <Button onClick={() => setBookingDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Cancel booking confirmation dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-2">
                <p><span className="font-medium">Service:</span> {selectedBooking.service}</p>
                <p><span className="font-medium">Provider:</span> {selectedBooking.provider.name}</p>
                <p><span className="font-medium">Date & Time:</span> {selectedBooking.date}, {selectedBooking.time}</p>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setCancelDialogOpen(false)}
              >
                Keep Booking
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmCancelBooking}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
