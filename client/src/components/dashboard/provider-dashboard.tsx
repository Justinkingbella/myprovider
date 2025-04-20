import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, DollarSign, Settings, Star, MessageSquare, Users } from "lucide-react";
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
              {stats.totalReviews} reviews
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
              Unread customer messages
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProviderProfile user={user} />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServiceManagement />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <BookingCalendar />
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <EarningsPayout />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <CustomerMessages />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <ReviewsRatings />
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <SubscriptionPlans />
        </TabsContent>
      </Tabs>
    </div>
  );
}