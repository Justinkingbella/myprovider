import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "./hooks/use-auth";
import { useEffect, useState } from "react";
import { 
  ClerkLoaded, 
  ClerkLoading, 
  SignedIn, 
  SignedOut,
  RedirectToSignIn,
  useClerk
} from "@clerk/clerk-react";

// Pages
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useLocation();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setLocation("/sign-in");
    }
  }, [isSignedIn, isLoaded, setLocation]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return isSignedIn ? <>{children}</> : <RedirectToSignIn />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="app-container">
          <ClerkLoading>
            <LoadingSpinner />
          </ClerkLoading>
          <ClerkLoaded>
            <Router />
          </ClerkLoaded>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
