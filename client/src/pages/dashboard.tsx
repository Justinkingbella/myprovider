import { useState, useEffect } from "react";
import { useUser, useAuth, SignOutButton } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, LogOut, Settings, User, Calendar, CreditCard, MessageSquare, Star, Search, Briefcase } from "lucide-react";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import ProviderDashboard from "@/components/dashboard/provider-dashboard";
import CustomerDashboard from "@/components/dashboard/customer-dashboard";
import { getCurrentUser } from "@/lib/auth";
import { User as UserType } from "@shared/schema";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<string>("customer"); 
  const [dbUser, setDbUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        if (userData) {
          setDbUser(userData);
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isSignedIn) {
      loadUserData();
    }
  }, [isSignedIn]);

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  const getDashboardTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Dashboard";
      case "provider":
        return "Service Provider Dashboard";
      case "customer":
      default:
        return "Customer Dashboard";
    }
  };

  const getNavbarColor = () => {
    switch (userRole) {
      case "admin":
        return "bg-purple-700";
      case "provider":
        return "bg-blue-700";
      case "customer":
      default:
        return "bg-green-700";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {userRole === "admin" && <AdminDashboard user={dbUser} />}
        {userRole === "provider" && <ProviderDashboard user={dbUser} />}
        {userRole === "customer" && <CustomerDashboard user={dbUser} />}
      </main>
    </div>
  );
}