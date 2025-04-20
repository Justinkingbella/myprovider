import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Settings, Calendar, DollarSign, BarChart2, MessageSquare, CreditCard } from "lucide-react";
import { User as UserType } from "@shared/schema";

// Admin dashboard panels
import UserManagement from "./admin/user-management";
import ServiceCategories from "./admin/service-categories";
import Bookings from "./admin/bookings";
import Payments from "./admin/payments";
import FinancialManagement from "./admin/financial-management";
import AnalyticsReports from "./admin/analytics-reports";
import SystemSettings from "./admin/system-settings";
import DisputeResolution from "./admin/dispute-resolution";

interface AdminDashboardProps {
  user: UserType | null;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Stats for overview cards
  const stats = {
    totalUsers: 245,
    activeProviders: 78,
    pendingApprovals: 12,
    totalBookings: 1230,
    completedBookings: 980,
    pendingDisputes: 8,
    thisMonthRevenue: 15430.75,
    pendingWithdrawals: 4560.50
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProviders} active providers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedBookings} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N${stats.thisMonthRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month's platform commission
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals + stats.pendingDisputes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingApprovals} approvals, {stats.pendingDisputes} disputes
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServiceCategories />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Bookings />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Payments />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <FinancialManagement />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsReports />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <DisputeResolution />
        </TabsContent>
      </Tabs>
    </div>
  );
}