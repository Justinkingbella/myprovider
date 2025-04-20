
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import {
  Search, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  User, 
  BookOpen, 
  Star, 
  DollarSign, 
  MessageSquare, 
  Bell, 
  Settings, 
  FileCheck,
  HomeIcon
} from "lucide-react";

export default function HowItWorks() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-yellow-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">How It Works</h1>
              <p className="text-gray-800">Learn how to use Namibian Service Hub as a customer or service provider</p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white mt-4 md:mt-0"
              onClick={() => setLocation("/")}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <Tabs defaultValue="customers" className="w-full">
            <div className="text-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="customers" className="text-lg px-6 py-3">For Customers</TabsTrigger>
                <TabsTrigger value="providers" className="text-lg px-6 py-3">For Service Providers</TabsTrigger>
              </TabsList>
            </div>
            
            {/* For Customers */}
            <TabsContent value="customers">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Find and Book Services</h2>
                  <p className="text-gray-600">
                    Follow these simple steps to find reliable service providers in your area
                  </p>
                </div>
                
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        1
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <Search className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Search for Services</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Browse our wide range of service categories or use the search function to find specific services you need. You can filter by location to find providers in your area.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Browse services by category</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Search for specific services</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Filter by location and price range</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        2
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <User className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Choose a Provider</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Compare service providers based on reviews, ratings, pricing, and availability. View detailed profiles to ensure they meet your requirements.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Read verified customer reviews</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Check provider qualifications</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Compare prices and service offerings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        3
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <Calendar className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Book a Time Slot</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Select a convenient date and time from the provider's available slots. Provide details about your service requirements.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Select from available time slots</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Specify service details and requirements</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Add your location and contact information</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        4
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <CreditCard className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Secure Payment</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Pay securely through our platform using your preferred payment method. Payment is held until the service is completed satisfactorily.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Multiple payment options available</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Secure, encrypted transactions</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Payment held in escrow until service completion</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        5
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Service Completion & Review</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        After the service is completed, confirm your satisfaction and release payment to the provider. Share your experience by leaving a review.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Confirm service completion</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Rate your experience</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Leave a detailed review to help others</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <Button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => setLocation("/sign-up")}
                  >
                    Get Started as a Customer
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* For Providers */}
            <TabsContent value="providers">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Offer Your Services</h2>
                  <p className="text-gray-600">
                    Join our platform as a service provider and grow your business
                  </p>
                </div>
                
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        1
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <User className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Create a Provider Account</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Sign up as a service provider and complete your verification process to gain trust from potential customers.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Create a free account</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Complete identity verification</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Submit required documents and qualifications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        2
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Build Your Profile</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Create a comprehensive profile showcasing your skills, experience, and the services you offer to attract potential customers.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Add a professional photo and bio</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>List your services and pricing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Highlight your experience and qualifications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        3
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <Settings className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Set Up Your Services</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Define the services you offer, set your pricing, and specify your service areas and availability.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Create detailed service listings</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Set competitive pricing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Define your service area and availability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        4
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <Bell className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Receive Booking Requests</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Get notified when customers book your services. Review details and confirm bookings based on your availability.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Receive instant notifications</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Review booking details</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Accept or reschedule as needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        5
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <FileCheck className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Provide Quality Service</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Deliver high-quality service to your customers according to the agreed terms and schedule.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Confirm appointment details</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Provide professional service</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Mark the service as complete in the system</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 6 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 md:order-last">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        6
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <DollarSign className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Get Paid Securely</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Receive secure payments directly to your account once the customer confirms service completion.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Fast payment processing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Multiple payout options</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Transparent fee structure</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 7 */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 text-yellow-600 font-bold text-2xl mx-auto">
                        7
                      </div>
                    </div>
                    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-3">
                        <Star className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-xl font-semibold">Build Your Reputation</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Collect positive reviews and ratings to build your reputation and attract more customers.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Request reviews from satisfied customers</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Respond to feedback professionally</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                          <span>Improve your service based on feedback</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <Button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => setLocation("/sign-up")}
                  >
                    Register as a Service Provider
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">© 2023 Namibian Service Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
