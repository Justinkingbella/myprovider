
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, Shield, CreditCard, BellRing, FileText, Map, MessageSquare, Calendar, Search
} from "lucide-react";

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState("general");

  // Mock data for platform settings
  const settings = {
    general: {
      platformName: "ServiceConnect Namibia",
      platformLogo: "/assets/logo.png",
      supportEmail: "support@serviceconnect.na",
      supportPhone: "+264 61 123 4567",
      defaultCurrency: "NAD",
      defaultCommissionRate: 10,
      maxBookingsPerDay: 20,
      platformFee: 2.5
    },
    features: {
      enableEmergencyBookings: true,
      enableReferralProgram: true,
      enableLoyaltyProgram: true,
      enableProviderVerification: true,
      enableInAppMessaging: true,
      enableInAppCalling: false,
      enableReviews: true,
      enableJobBoard: true,
      enableMultiVendorAccounts: true,
      enableLocationTracking: true,
      enableDigitalContracts: false,
      enableAIRecommendations: false
    },
    commissions: {
      defaultRate: 10,
      cleaningServices: 8,
      plumbing: 12,
      electrical: 12,
      gardening: 10,
      personalErrands: 7,
      beautyWellness: 15,
      professionalServices: 15,
      transportDelivery: 8
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage general platform settings and configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue={settings.general.platformName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue={settings.general.supportEmail} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue={settings.general.supportPhone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select defaultValue={settings.general.defaultCurrency}>
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NAD">Namibian Dollar (NAD)</SelectItem>
                      <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Default Commission Rate (%)</Label>
                  <Input 
                    id="commission-rate" 
                    type="number" 
                    defaultValue={settings.general.defaultCommissionRate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                  <Input 
                    id="platform-fee" 
                    type="number" 
                    defaultValue={settings.general.platformFee}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-bookings">Max Bookings Per Day</Label>
                  <Input 
                    id="max-bookings" 
                    type="number" 
                    defaultValue={settings.general.maxBookingsPerDay}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Management</CardTitle>
              <CardDescription>
                Enable or disable platform features and functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <Label htmlFor="emergency-bookings">Emergency Bookings</Label>
                    </div>
                    <Switch 
                      id="emergency-bookings" 
                      checked={settings.features.enableEmergencyBookings} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <Label htmlFor="referral-program">Referral Program</Label>
                    </div>
                    <Switch 
                      id="referral-program" 
                      checked={settings.features.enableReferralProgram} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <Label htmlFor="loyalty-program">Loyalty Program</Label>
                    </div>
                    <Switch 
                      id="loyalty-program" 
                      checked={settings.features.enableLoyaltyProgram} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="provider-verification">Provider Verification</Label>
                    </div>
                    <Switch 
                      id="provider-verification" 
                      checked={settings.features.enableProviderVerification} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label htmlFor="in-app-messaging">In-App Messaging</Label>
                    </div>
                    <Switch 
                      id="in-app-messaging" 
                      checked={settings.features.enableInAppMessaging} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <BellRing className="h-4 w-4" />
                      <Label htmlFor="in-app-calling">In-App Calling</Label>
                    </div>
                    <Switch 
                      id="in-app-calling" 
                      checked={settings.features.enableInAppCalling} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <Label htmlFor="reviews">Reviews & Ratings</Label>
                    </div>
                    <Switch 
                      id="reviews" 
                      checked={settings.features.enableReviews} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4" />
                      <Label htmlFor="job-board">Job Board</Label>
                    </div>
                    <Switch 
                      id="job-board" 
                      checked={settings.features.enableJobBoard} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <Label htmlFor="multi-vendor">Multi-Vendor Accounts</Label>
                    </div>
                    <Switch 
                      id="multi-vendor" 
                      checked={settings.features.enableMultiVendorAccounts} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Map className="h-4 w-4" />
                      <Label htmlFor="location-tracking">Location Tracking</Label>
                    </div>
                    <Switch 
                      id="location-tracking" 
                      checked={settings.features.enableLocationTracking} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <Label htmlFor="digital-contracts">Digital Contracts</Label>
                    </div>
                    <Switch 
                      id="digital-contracts" 
                      checked={settings.features.enableDigitalContracts} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <Label htmlFor="ai-recommendations">AI Recommendations</Label>
                    </div>
                    <Switch 
                      id="ai-recommendations" 
                      checked={settings.features.enableAIRecommendations} 
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button>Save Features</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>
                Manage commission rates for different service categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-commission">Default Commission Rate (%)</Label>
                    <Input 
                      id="default-commission" 
                      type="number" 
                      defaultValue={settings.commissions.defaultRate}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cleaning-commission">Cleaning Services (%)</Label>
                    <Input 
                      id="cleaning-commission" 
                      type="number" 
                      defaultValue={settings.commissions.cleaningServices}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plumbing-commission">Plumbing (%)</Label>
                    <Input 
                      id="plumbing-commission" 
                      type="number" 
                      defaultValue={settings.commissions.plumbing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="electrical-commission">Electrical (%)</Label>
                    <Input 
                      id="electrical-commission" 
                      type="number" 
                      defaultValue={settings.commissions.electrical}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gardening-commission">Gardening (%)</Label>
                    <Input 
                      id="gardening-commission" 
                      type="number" 
                      defaultValue={settings.commissions.gardening}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="errands-commission">Personal Errands (%)</Label>
                    <Input 
                      id="errands-commission" 
                      type="number" 
                      defaultValue={settings.commissions.personalErrands}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beauty-commission">Beauty & Wellness (%)</Label>
                    <Input 
                      id="beauty-commission" 
                      type="number" 
                      defaultValue={settings.commissions.beautyWellness}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professional-commission">Professional Services (%)</Label>
                    <Input 
                      id="professional-commission" 
                      type="number" 
                      defaultValue={settings.commissions.professionalServices}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transport-commission">Transport & Delivery (%)</Label>
                    <Input 
                      id="transport-commission" 
                      type="number" 
                      defaultValue={settings.commissions.transportDelivery}
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button>Save Commission Rates</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure platform security and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="password-complexity">Enforce Password Complexity</Label>
                    </div>
                    <Switch id="password-complexity" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">Max Login Attempts</Label>
                    <Input id="login-attempts" type="number" defaultValue="5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allowed-domains">Allowed Email Domains (for Admin)</Label>
                  <Input 
                    id="allowed-domains" 
                    placeholder="example.com, company.org"
                    defaultValue="serviceconnect.na"
                  />
                  <p className="text-sm text-muted-foreground">Comma-separated list of domains</p>
                </div>
                
                <Separator />
                <div className="flex justify-end">
                  <Button>Save Security Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
