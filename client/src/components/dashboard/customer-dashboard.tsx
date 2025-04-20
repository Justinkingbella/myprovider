import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Search, Heart, MessageSquare, Star, Gift } from "lucide-react";
import { User as UserType } from "@shared/schema";

// Customer dashboard panels
import CustomerProfile from "./customer/customer-profile";
import ServiceSearch from "./customer/service-search";
import CustomerBookings from "./customer/customer-bookings";
import FavoriteProviders from "./customer/favorite-providers";
import ProviderMessages from "./customer/provider-messages";
import CustomerReviews from "./customer/customer-reviews";
import ReferralRewards from "./customer/referral-rewards";

interface CustomerDashboardProps {
  user: UserType | null;
}

export default function CustomerDashboard({ user }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState("search");

  // Stats for overview cards
  const stats = {
    activeBookings: 2,
    completedBookings: 14,
    favoriteProviders: 8,
    unreadMessages: 3,
    pendingReviews: 2,
    referralCredits: 150,
    loyaltyPoints: 750
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Customer Dashboard</h1>
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
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteProviders}</div>
            <p className="text-xs text-muted-foreground">
              Saved service providers
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
              Unread provider messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N${stats.referralCredits}</div>
            <p className="text-xs text-muted-foreground">
              {stats.loyaltyPoints} loyalty points
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="search">Find Services</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <ServiceSearch />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <CustomerBookings />
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <FavoriteProviders />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <ProviderMessages />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <CustomerReviews />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <ReferralRewards />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <CustomerProfile user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}