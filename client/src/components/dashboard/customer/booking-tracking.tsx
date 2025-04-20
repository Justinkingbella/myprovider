
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  MessageSquare, 
  Clock, 
  MapPin, 
  Check, 
  AlertTriangle,
  Info,
  Calendar,
  Loader
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function BookingTracking() {
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  // Mock data for active bookings
  const activeBookings = [
    {
      id: 1,
      provider: {
        name: "John Doe",
        phone: "+264 81 123 4567",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      service: "Home Deep Cleaning",
      date: "Today",
      startTime: "14:00",
      endTime: "16:00",
      location: "7863 Independence Ave, Windhoek",
      status: "in_progress",
      progress: 45,
      price: 350,
      notes: "Please make sure to clean under the furniture",
      timeline: [
        { time: "13:30", status: "Provider is on the way", completed: true },
        { time: "14:05", status: "Service started", completed: true },
        { time: "15:15", status: "Living room and kitchen completed", completed: false },
        { time: "16:00", status: "Service completed", completed: false }
      ],
      messages: [
        { sender: "provider", content: "Hello! I'm on my way to your location", time: "13:30" },
        { sender: "customer", content: "Great! The front gate is open, you can come right in", time: "13:32" },
        { sender: "provider", content: "I've arrived. Starting work now.", time: "14:02" }
      ]
    },
    {
      id: 2,
      provider: {
        name: "Sarah Johnson",
        phone: "+264 81 456 7890",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      service: "Plumbing Repairs",
      date: "Today",
      startTime: "10:00",
      endTime: "12:00",
      location: "495 Sam Nujoma Dr, Windhoek",
      status: "confirmed",
      progress: 0,
      price: 450,
      notes: "Leaking faucet in the kitchen and bathroom sink",
      timeline: [
        { time: "09:45", status: "Provider is on the way", completed: false },
        { time: "10:00", status: "Service started", completed: false },
        { time: "12:00", status: "Service completed", completed: false }
      ],
      messages: []
    }
  ];

  const handleViewTracking = (booking: any) => {
    setActiveBooking(booking);
  };

  const handleOpenChat = () => {
    setMessageDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real app, you would send this to your backend
    alert(`Message sent: ${messageInput}`);
    setMessageInput("");
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
        <CardTitle>Track Your Bookings</CardTitle>
        <CardDescription>
          Monitor the status of your active service bookings in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeBookings.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            You don't have any active bookings at the moment.
          </div>
        ) : activeBooking ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveBooking(null)}
              className="mb-4"
            >
              ← Back to all bookings
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeBooking.provider.avatar} alt={activeBooking.provider.name} />
                  <AvatarFallback>{activeBooking.provider.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeBooking.provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{activeBooking.provider.phone}</p>
                </div>
              </div>
              <Button onClick={handleOpenChat}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Service</p>
                <p>{activeBooking.service}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <p>{activeBooking.date}, {activeBooking.startTime} - {activeBooking.endTime}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  {activeBooking.location}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  {getStatusBadge(activeBooking.status)}
                  {activeBooking.status === 'in_progress' && (
                    <span className="text-sm">{activeBooking.progress}% complete</span>
                  )}
                </div>
              </div>
            </div>
            
            {activeBooking.status === 'in_progress' && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Progress</p>
                <Progress value={activeBooking.progress} className="h-2" />
              </div>
            )}
            
            <div className="space-y-3 pt-4">
              <h3 className="font-medium">Timeline</h3>
              <div className="space-y-4">
                {activeBooking.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      {item.completed ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : activeBooking.status === 'in_progress' && index === activeBooking.timeline.findIndex((t: any) => !t.completed) ? (
                        <Loader className="h-5 w-5 text-blue-500 animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {activeBooking.notes && (
              <div className="space-y-2 pt-2">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm">{activeBooking.notes}</p>
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
              {activeBooking.status !== 'completed' && (
                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-600 hover:bg-red-50">
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-medium">Active Bookings</h3>
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">{booking.service}</h4>
                        <p className="text-sm text-muted-foreground">
                          {booking.date}, {booking.startTime} - {booking.endTime}
                        </p>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          {booking.location}
                        </div>
                      </div>
                      <div>{getStatusBadge(booking.status)}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={booking.provider.avatar} alt={booking.provider.name} />
                          <AvatarFallback>{booking.provider.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{booking.provider.name}</span>
                      </div>
                      <Button size="sm" onClick={() => handleViewTracking(booking)}>
                        Track
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Chat dialog */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message Provider</DialogTitle>
              <DialogDescription>
                Communicate with your service provider.
              </DialogDescription>
            </DialogHeader>
            
            {activeBooking && (
              <div className="flex flex-col h-[300px]">
                <div className="flex-1 overflow-y-auto space-y-4 p-3">
                  {activeBooking.messages.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      No messages yet. Send your first message to the provider.
                    </div>
                  ) : (
                    activeBooking.messages.map((message: any, index: number) => (
                      <div 
                        key={index} 
                        className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.sender === 'customer' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs ${message.sender === 'customer' ? 'text-primary-foreground/70' : 'text-muted-foreground'} mt-1`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <Input 
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
