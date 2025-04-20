import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { User } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LogOut, User as UserIcon, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import ProviderDashboard from "@/components/dashboard/provider-dashboard";
import CustomerDashboard from "@/components/dashboard/customer-dashboard";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isLoaded: isUserLoaded, signOut } = useUser();
  const { userRole } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch user details from our database
  const { data: dbUser, isLoading } = useQuery<User>({
    queryKey: ["/api/users/me"],
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      setLocation("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Determine which dashboard to show based on user role
  const renderDashboard = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading dashboard...</span>
        </div>
      );
    }

    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "provider":
        return <ProviderDashboard />;
      case "customer":
        return <CustomerDashboard />;
      default:
        return (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900">
              Role not assigned
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Please contact an administrator to assign you a role.
            </p>
          </div>
        );
    }
  };

  // Get the navbar color based on user role
  const getNavbarColor = () => {
    switch (userRole) {
      case "admin":
        return "bg-primary-600";
      case "provider":
        return "bg-secondary-600";
      case "customer":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  // Get the dashboard title based on user role
  const getDashboardTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Panel";
      case "provider":
        return "Provider Portal";
      case "customer":
        return "Customer Portal";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className={`${getNavbarColor()} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                  R
                </div>
                <span className="ml-2 text-white font-semibold text-lg">
                  {getDashboardTitle()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user?.primaryEmailAddress?.emailAddress && (
                <span className="text-white text-sm hidden sm:block">
                  {user.primaryEmailAddress.emailAddress}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10" 
                onClick={() => setLocation("/")}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10" 
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {userRole === "customer" && user?.firstName 
              ? `Welcome, ${user.firstName}` 
              : "Dashboard"}
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
}
