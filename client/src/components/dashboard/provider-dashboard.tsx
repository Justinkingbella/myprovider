
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, DollarSign, Settings, Star, MessageSquare, Users, Briefcase, CreditCard } from "lucide-react";
import { User as UserType } from "@shared/schema";

// Provider dashboard panels
import ProviderProfile from "./provider/provider-profile";
import ServiceManagement from "./provider/service-management";
import BookingCalendar from "./provider/booking-calendar";
import EarningsPayout from "./provider/earnings-payout";
import CustomerMessages from "./provider/customer-messages";
import ReviewsRatings from "./provider/reviews-ratings";
import SubscriptionPlans from "./provider/subscription-plans";

interface ProviderDashboardProps {
  user: UserType | null;
}

export default function ProviderDashboard({ user }: ProviderDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Stats for overview cards
  const stats = {
    totalServices: 5,
    activeBookings: 3,
    completedBookings: 27,
    currentRating: 4.8,
    totalReviews: 24,
    thisMonthEarnings: 3250.75,
    pendingPayouts: 1200.50,
    unreadMessages: 5
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Service Provider Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedBookings} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N${stats.thisMonthEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              N${stats.pendingPayouts.toLocaleString()} pending payout
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentRating}/5.0</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-7">
          <TabsTrigger value="overview">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="services">
            <Briefcase className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Earnings</span>
          </TabsTrigger>
          <TabsTrigger value="messages">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Reviews</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks you may want to perform
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab("services")}>
                  <Briefcase className="h-5 w-5 mr-3 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Manage Services</h3>
                    <p className="text-sm text-muted-foreground">Update your service offerings</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab("bookings")}>
                  <Calendar className="h-5 w-5 mr-3 text-green-500" />
                  <div>
                    <h3 className="font-medium">View Bookings</h3>
                    <p className="text-sm text-muted-foreground">Check your upcoming appointments</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab("earnings")}>
                  <DollarSign className="h-5 w-5 mr-3 text-yellow-500" />
                  <div>
                    <h3 className="font-medium">Request Payout</h3>
                    <p className="text-sm text-muted-foreground">Withdraw your earnings</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab("profile")}>
                  <User className="h-5 w-5 mr-3 text-purple-500" />
                  <div>
                    <h3 className="font-medium">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your business information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Your current plan and benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Free Plan</h3>
                    <p className="text-sm text-muted-foreground">Basic features for individuals</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm">5 active bookings per month</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm">Standard commission rate (10%)</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm">Basic profile listing</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setActiveTab("subscription")}
                  >
                    Upgrade Plan →
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Your most recent service bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <Calendar className="h-9 w-9 p-2 mr-3 bg-blue-100 text-blue-700 rounded-md" />
                    <div>
                      <h4 className="font-medium">Home Cleaning</h4>
                      <p className="text-sm text-muted-foreground">Jane Smith • Today, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <Calendar className="h-9 w-9 p-2 mr-3 bg-blue-100 text-blue-700 rounded-md" />
                    <div>
                      <h4 className="font-medium">Furniture Assembly</h4>
                      <p className="text-sm text-muted-foreground">Michael Brown • Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <Calendar className="h-9 w-9 p-2 mr-3 bg-blue-100 text-blue-700 rounded-md" />
                    <div>
                      <h4 className="font-medium">Electrical Repair</h4>
                      <p className="text-sm text-muted-foreground">Sarah Johnson • July 18, 9:00 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button 
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setActiveTab("bookings")}
                >
                  View All Bookings
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <ProviderProfile user={user} />
        </TabsContent>
        
        <TabsContent value="services">
          <ServiceManagement />
        </TabsContent>
        
        <TabsContent value="bookings">
          <BookingCalendar />
        </TabsContent>
        
        <TabsContent value="earnings">
          <EarningsPayout />
        </TabsContent>
        
        <TabsContent value="messages">
          <CustomerMessages />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsRatings />
        </TabsContent>
        
        <TabsContent value="subscription">
          <SubscriptionPlans />
        </TabsContent>
      </Tabs>
    </div>
  );
}
