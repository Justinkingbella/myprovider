import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [, setLocation] = useLocation();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      setLocation("/dashboard");
    }
  }, [isSignedIn, setLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">R</div>
            <span className="ml-2 text-xl font-semibold text-gray-900">RoleBasedAuth</span>
          </div>
          <div>
            <SignedIn>
              <Button onClick={() => setLocation("/dashboard")}>Go to Dashboard</Button>
            </SignedIn>
            <SignedOut>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setLocation("/sign-up")}>
                  Sign Up
                </Button>
                <Button onClick={() => setLocation("/sign-in")}>
                  Sign In
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Role-Based Authentication System
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            A secure platform with separate panels for Admin, Provider, and Customer users.
          </p>
          <div className="mt-8 flex justify-center">
            <SignedOut>
              <Button size="lg" onClick={() => setLocation("/sign-up")}>
                Get Started
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" onClick={() => setLocation("/dashboard")}>
                Go to Dashboard
              </Button>
            </SignedIn>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Admin Panel</h3>
              <p className="mt-2 text-sm text-gray-500">
                Complete control over user management, with the ability to add, edit, and remove users from the system.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Provider Portal</h3>
              <p className="mt-2 text-sm text-gray-500">
                Service providers can manage their schedule, view upcoming appointments, and track client interactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-md bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Customer Dashboard</h3>
              <p className="mt-2 text-sm text-gray-500">
                Customers can book services, view their appointment history, and manage their profile information.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} RoleBasedAuth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
