
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
  Input
} from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  Calendar, 
  Clock, 
  MoreVertical, 
  Phone, 
  Video,
  MessageSquare,
  Image as ImageIcon,
  Paperclip,
  UserPlus,
  ChevronLeft
} from "lucide-react";

export default function ProviderMessages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'chat'>('list');

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      provider: {
        id: 101,
        name: "CleanCo Services",
        avatar: "https://i.pravatar.cc/150?img=1",
        isOnline: true
      },
      lastMessage: {
        content: "Hello! I'm on my way to your location",
        timestamp: "10:32 AM",
        isRead: true,
        sender: "provider"
      },
      unreadCount: 0,
      messages: [
        { id: 1, content: "Hi there! I'd like to book a cleaning service", timestamp: "10:25 AM", sender: "customer" },
        { id: 2, content: "Hello! I'm on my way to your location", timestamp: "10:32 AM", sender: "provider" }
      ],
      booking: {
        id: 201,
        service: "Home Deep Cleaning",
        date: "Today",
        time: "14:00 - 16:00"
      }
    },
    {
      id: 2,
      provider: {
        id: 102,
        name: "Express Plumbers",
        avatar: "https://i.pravatar.cc/150?img=2",
        isOnline: false
      },
      lastMessage: {
        content: "We'll need to check your pipes. When would be a good time?",
        timestamp: "Yesterday",
        isRead: false,
        sender: "provider"
      },
      unreadCount: 1,
      messages: [
        { id: 1, content: "I have a leaking faucet in my bathroom", timestamp: "Yesterday, 3:15 PM", sender: "customer" },
        { id: 2, content: "Could you send a photo of the leak?", timestamp: "Yesterday, 3:18 PM", sender: "provider" },
        { id: 3, content: "Here's a photo of the leak *image*", timestamp: "Yesterday, 3:22 PM", sender: "customer" },
        { id: 4, content: "We'll need to check your pipes. When would be a good time?", timestamp: "Yesterday, 3:25 PM", sender: "provider" }
      ],
      booking: {
        id: 202,
        service: "Plumbing Repairs",
        date: "Tomorrow",
        time: "10:00 - 12:00"
      }
    },
    {
      id: 3,
      provider: {
        id: 103,
        name: "Green Thumb Gardening",
        avatar: "https://i.pravatar.cc/150?img=3",
        isOnline: true
      },
      lastMessage: {
        content: "Thank you for your review! We appreciate your feedback.",
        timestamp: "2 days ago",
        isRead: true,
        sender: "provider"
      },
      unreadCount: 0,
      messages: [
        { id: 1, content: "Thank you for the great garden service today!", timestamp: "2 days ago, 5:15 PM", sender: "customer" },
        { id: 2, content: "Thank you for your review! We appreciate your feedback.", timestamp: "2 days ago, 5:20 PM", sender: "provider" }
      ],
      booking: {
        id: 203,
        service: "Garden Maintenance",
        date: "June 28, 2023",
        time: "09:00 - 11:00"
      }
    }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // In a real app, you would send this message to the backend
    alert(`Message sent: ${currentMessage}`);
    setCurrentMessage("");
  };

  const filteredConversations = conversations.filter(conv => 
    conv.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const handleSelectConversation = (conversationId: number) => {
    setActiveConversation(conversationId);
    setMobileViewMode('chat');
  };

  const handleBackToList = () => {
    setMobileViewMode('list');
  };

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>
          Chat with service providers about your bookings.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-5rem)] flex">
        {/* Conversations list (hidden on mobile when in chat view) */}
        <div className={`w-full md:w-1/3 border-r ${mobileViewMode === 'chat' ? 'hidden md:block' : 'block'}`}>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No conversations found.
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-3 flex items-start gap-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      activeConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.provider.avatar} alt={conversation.provider.name} />
                        <AvatarFallback>{conversation.provider.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.provider.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate">{conversation.provider.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.sender === 'provider' ? '' : 'You: '}
                        {conversation.lastMessage.content}
                      </p>
                      <div className="mt-1 text-xs">
                        <Badge variant="outline" className="bg-muted-foreground/10">
                          {conversation.booking.service}
                        </Badge>
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge className="ml-auto flex-shrink-0">{conversation.unreadCount}</Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Chat area (hidden on mobile when in list view) */}
        <div className={`w-full md:w-2/3 flex flex-col ${mobileViewMode === 'list' ? 'hidden md:flex' : 'flex'}`}>
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden" 
                    onClick={handleBackToList}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarImage src={currentConversation?.provider.avatar} alt={currentConversation?.provider.name} />
                    <AvatarFallback>{currentConversation?.provider.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversation?.provider.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation?.provider.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Booking info */}
              <div className="bg-muted/30 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{currentConversation?.booking.service}</span>
                  <span className="text-sm text-muted-foreground">-</span>
                  <span className="text-sm text-muted-foreground">{currentConversation?.booking.date}</span>
                  <Clock className="h-4 w-4 ml-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{currentConversation?.booking.time}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Booking
                </Button>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {currentConversation?.messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'provider' && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src={currentConversation.provider.avatar} alt={currentConversation.provider.name} />
                        <AvatarFallback>{currentConversation.provider.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'customer' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs ${message.sender === 'customer' ? 'text-primary-foreground/70' : 'text-muted-foreground'} mt-1 text-right`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your Messages</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
