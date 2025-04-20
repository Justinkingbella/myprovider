
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  PhoneCall, 
  Video, 
  Calendar, 
  MoreVertical, 
  Search, 
  Clock 
} from "lucide-react";

export default function CustomerMessages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  // Mock chat data
  const chats = [
    {
      id: 1,
      customer: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isOnline: true
      },
      lastMessage: "When will you arrive for the cleaning service?",
      time: "10:32 AM",
      unread: 2,
      booking: {
        service: "Home Cleaning",
        date: "Today, 2:00 PM"
      }
    },
    {
      id: 2,
      customer: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        isOnline: false
      },
      lastMessage: "Thanks for confirming the appointment.",
      time: "Yesterday",
      unread: 0,
      booking: {
        service: "Furniture Assembly",
        date: "Tomorrow, 10:00 AM"
      }
    },
    {
      id: 3,
      customer: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        isOnline: true
      },
      lastMessage: "Can you bring the necessary tools?",
      time: "Jul 10",
      unread: 0,
      booking: {
        service: "Electrical Repair",
        date: "Jul 18, 9:00 AM"
      }
    }
  ];

  // Mock conversation messages
  const conversations = {
    1: [
      {
        id: 1,
        sender: "customer",
        message: "Hi, I'm inquiring about the home cleaning service I booked.",
        time: "10:00 AM"
      },
      {
        id: 2,
        sender: "provider",
        message: "Hello! Yes, we have your booking for today at 2:00 PM.",
        time: "10:05 AM"
      },
      {
        id: 3,
        sender: "customer",
        message: "Great! When will you arrive?",
        time: "10:15 AM"
      },
      {
        id: 4,
        sender: "customer",
        message: "And do I need to prepare anything before you arrive?",
        time: "10:15 AM"
      },
      {
        id: 5,
        sender: "provider",
        message: "I'll be there right at 2:00 PM. Just clear some space around the areas that need the most cleaning. I'll bring all necessary cleaning supplies.",
        time: "10:20 AM"
      },
      {
        id: 6,
        sender: "customer",
        message: "When will you arrive for the cleaning service?",
        time: "10:32 AM"
      }
    ],
    2: [
      {
        id: 1,
        sender: "customer",
        message: "Hello, I'm just confirming my furniture assembly appointment.",
        time: "Yesterday, 3:00 PM"
      },
      {
        id: 2,
        sender: "provider",
        message: "Hi Michael, yes your appointment is confirmed for tomorrow at 10:00 AM.",
        time: "Yesterday, 3:10 PM"
      },
      {
        id: 3,
        sender: "customer",
        message: "Thanks for confirming the appointment.",
        time: "Yesterday, 3:15 PM"
      }
    ],
    3: [
      {
        id: 1,
        sender: "customer",
        message: "Hi, I need help with some electrical issues in my kitchen.",
        time: "Jul 10, 2:00 PM"
      },
      {
        id: 2,
        sender: "provider",
        message: "Hello Sarah, I'll be happy to help. Could you describe the issue in more detail?",
        time: "Jul 10, 2:05 PM"
      },
      {
        id: 3,
        sender: "customer",
        message: "The power outlets near my kitchen counter aren't working. I think it might be a circuit breaker issue.",
        time: "Jul 10, 2:15 PM"
      },
      {
        id: 4,
        sender: "provider",
        message: "That's possible. I'll check the circuit breaker and the wiring when I come. I've booked you for July 18th at 9:00 AM.",
        time: "Jul 10, 2:25 PM"
      },
      {
        id: 5,
        sender: "customer",
        message: "Can you bring the necessary tools?",
        time: "Jul 10, 2:30 PM"
      }
    ]
  };

  const selectedCustomer = chats.find(chat => chat.id === selectedChat)?.customer;
  const selectedBooking = chats.find(chat => chat.id === selectedChat)?.booking;
  const currentConversation = conversations[selectedChat as keyof typeof conversations] || [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      alert(`Message sent: ${messageInput}`);
      setMessageInput("");
      // In a real implementation, this would add the message to the conversation 
      // and send it to the backend
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-13rem)]">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle>Customer Messages</CardTitle>
        <CardDescription>
          Chat with your customers about bookings and services.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex overflow-hidden">
        {/* Chat list sidebar */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div 
                key={chat.id}
                className={`p-3 border-b cursor-pointer hover:bg-slate-50 ${selectedChat === chat.id ? 'bg-slate-50' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.customer.avatar} alt={chat.customer.name} />
                      <AvatarFallback>{chat.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.customer.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm truncate">{chat.customer.name}</h4>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">{chat.booking.service}</span>
                    </div>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="ml-2 bg-primary h-5 w-5 flex items-center justify-center rounded-full p-0">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat conversation */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          {selectedCustomer && (
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                  <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedCustomer.name}</h3>
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full ${selectedCustomer.isOnline ? 'bg-green-500' : 'bg-gray-300'} mr-1`}></span>
                    <span className="text-xs text-muted-foreground">
                      {selectedCustomer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <PhoneCall className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Booking information banner */}
          {selectedBooking && (
            <div className="p-2 bg-blue-50 text-blue-800 text-sm flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="font-medium">{selectedBooking.service}</span>
                <span className="mx-1">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{selectedBooking.date}</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View Booking
              </Button>
            </div>
          )}
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {currentConversation.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg py-2 px-3 ${
                      message.sender === 'provider' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'provider' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
