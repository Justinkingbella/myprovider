
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Mail, MessageSquare, Smartphone, Send } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("email");

  // Mock templates
  const templates = {
    email: [
      "booking_confirmation",
      "booking_reminder",
      "booking_cancellation",
      "payment_received",
      "account_created",
      "password_reset",
      "new_message",
      "review_request",
      "provider_approved",
      "weekly_summary"
    ],
    push: [
      "new_booking",
      "booking_status_change",
      "payment_received",
      "new_message",
      "provider_nearby",
      "booking_reminder",
      "special_offer"
    ],
    sms: [
      "booking_confirmation",
      "booking_reminder",
      "verification_code",
      "payment_received",
      "booking_status_change"
    ]
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure system notifications and messaging settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="email">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="push">
                <BellRing className="h-4 w-4 mr-2" />
                Push Notifications
              </TabsTrigger>
              <TabsTrigger value="sms">
                <Smartphone className="h-4 w-4 mr-2" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="in-app">
                <MessageSquare className="h-4 w-4 mr-2" />
                In-App Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-email" defaultChecked />
                    <Label htmlFor="enable-email">Enable Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for important events
                  </p>
                </div>
                <Button variant="outline">
                  Test Email
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notification Templates</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email-template">Select Template</Label>
                      <Select defaultValue={templates.email[0]}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.email.map(template => (
                            <SelectItem key={template} value={template}>
                              {template.split('_').join(' ').replace(/\b\w/g, c => c.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-sender">From Name</Label>
                      <Select defaultValue="system">
                        <SelectTrigger id="email-sender">
                          <SelectValue placeholder="Select sender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System Notifications</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="no-reply">No-Reply</SelectItem>
                          <SelectItem value="admin">Admin Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Textarea 
                      id="email-subject" 
                      className="h-10"
                      placeholder="Enter email subject"
                      defaultValue="Your booking has been confirmed"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-body">Email Body</Label>
                    <Textarea 
                      id="email-body" 
                      className="min-h-[200px]"
                      placeholder="Enter email content"
                      defaultValue="Dear {{customer_name}},\n\nYour booking #{{booking_id}} has been confirmed for {{service_name}} on {{booking_date}} at {{booking_time}} with {{provider_name}}.\n\nThank you for using our service.\n\nBest regards,\nThe ServiceConnect Team"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {{variable}} for dynamic content placeholders
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    Save Template
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="push" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-push" defaultChecked />
                    <Label htmlFor="enable-push">Enable Push Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send push notifications to mobile devices
                  </p>
                </div>
                <Button variant="outline">
                  Test Push
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notification Templates</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="push-template">Select Template</Label>
                      <Select defaultValue={templates.push[0]}>
                        <SelectTrigger id="push-template">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.push.map(template => (
                            <SelectItem key={template} value={template}>
                              {template.split('_').join(' ').replace(/\b\w/g, c => c.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="push-title">Notification Title</Label>
                    <Textarea 
                      id="push-title" 
                      className="h-10"
                      placeholder="Enter notification title"
                      defaultValue="New Booking Request"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="push-body">Notification Body</Label>
                    <Textarea 
                      id="push-body" 
                      className="min-h-[100px]"
                      placeholder="Enter notification content"
                      defaultValue="You have received a new booking request from {{customer_name}} for {{service_name}}."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="push-sound" defaultChecked />
                    <Label htmlFor="push-sound">Play sound with notification</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="push-vibrate" defaultChecked />
                    <Label htmlFor="push-vibrate">Vibrate with notification</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    Save Template
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sms" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-sms" defaultChecked />
                    <Label htmlFor="enable-sms">Enable SMS Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send text messages for critical updates
                  </p>
                </div>
                <Button variant="outline">
                  Test SMS
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">SMS Templates</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sms-template">Select Template</Label>
                      <Select defaultValue={templates.sms[0]}>
                        <SelectTrigger id="sms-template">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.sms.map(template => (
                            <SelectItem key={template} value={template}>
                              {template.split('_').join(' ').replace(/\b\w/g, c => c.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sms-sender">Sender ID</Label>
                      <Select defaultValue="ServiceConnect">
                        <SelectTrigger id="sms-sender">
                          <SelectValue placeholder="Select sender ID" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ServiceConnect">ServiceConnect</SelectItem>
                          <SelectItem value="SCNotify">SCNotify</SelectItem>
                          <SelectItem value="SConnect">SConnect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sms-body">Message Text</Label>
                    <Textarea 
                      id="sms-body" 
                      className="min-h-[100px]"
                      placeholder="Enter SMS content"
                      defaultValue="ServiceConnect: Your booking #{{booking_id}} for {{service_name}} is confirmed for {{booking_date}} at {{booking_time}}. Reply HELP for assistance."
                    />
                    <p className="text-xs text-muted-foreground">
                      Keep messages short (160 characters for standard SMS). Character count: 141
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    Save Template
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="in-app" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-inapp" defaultChecked />
                    <Label htmlFor="enable-inapp">Enable In-App Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show notifications within the application
                  </p>
                </div>
                <Button variant="outline">
                  Test Notification
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Events</h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>New Booking</Label>
                      <p className="text-xs text-muted-foreground">When a new booking is created</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>Booking Status Changes</Label>
                      <p className="text-xs text-muted-foreground">When a booking status is updated</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>New Messages</Label>
                      <p className="text-xs text-muted-foreground">When a new message is received</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>Payments</Label>
                      <p className="text-xs text-muted-foreground">Payment received or processed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>Reviews & Ratings</Label>
                      <p className="text-xs text-muted-foreground">New reviews or rating changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <Label>System Announcements</Label>
                      <p className="text-xs text-muted-foreground">Platform updates and announcements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button>
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Bell, Mail, MessageSquare, Send, Settings, Smartphone, Edit, ExternalLink, 
  Plus, Save, AlertTriangle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Notifications() {
  // Mock data - in a real app, this would come from API
  const [notificationTypes, setNotificationTypes] = useState([
    { 
      id: 1, 
      name: "New Booking", 
      description: "When a customer creates a new booking", 
      email: true,
      push: true,
      sms: false,
      inApp: true
    },
    { 
      id: 2, 
      name: "Booking Confirmation", 
      description: "When a provider confirms a booking", 
      email: true,
      push: true,
      sms: true,
      inApp: true
    },
    { 
      id: 3, 
      name: "Booking Cancellation", 
      description: "When a booking is cancelled", 
      email: true,
      push: true,
      sms: true,
      inApp: true
    },
    { 
      id: 4, 
      name: "Booking Reminder", 
      description: "Reminder before a scheduled booking", 
      email: true,
      push: true,
      sms: true,
      inApp: true
    },
    { 
      id: 5, 
      name: "New Message", 
      description: "When a new message is received", 
      email: false,
      push: true,
      sms: false,
      inApp: true
    },
    { 
      id: 6, 
      name: "Payment Received", 
      description: "When a payment is processed successfully", 
      email: true,
      push: true,
      sms: false,
      inApp: true
    },
    { 
      id: 7, 
      name: "New Review", 
      description: "When a customer leaves a review", 
      email: true,
      push: true,
      sms: false,
      inApp: true
    },
  ]);
  
  const [emailTemplates, setEmailTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to our platform!", lastUpdated: "2023-07-15" },
    { id: 2, name: "Booking Confirmation", subject: "Your booking has been confirmed", lastUpdated: "2023-07-20" },
    { id: 3, name: "Booking Reminder", subject: "Reminder: Upcoming service booking", lastUpdated: "2023-07-18" },
    { id: 4, name: "Password Reset", subject: "Reset your password", lastUpdated: "2023-06-30" },
    { id: 5, name: "Account Verification", subject: "Verify your account", lastUpdated: "2023-06-25" },
    { id: 6, name: "Payment Receipt", subject: "Payment receipt for your booking", lastUpdated: "2023-07-10" },
  ]);
  
  const toggleNotification = (id, channel) => {
    setNotificationTypes(notificationTypes.map(type => 
      type.id === id ? { ...type, [channel]: !type[channel] } : type
    ));
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
          <TabsTrigger value="sms">SMS Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Types
              </CardTitle>
              <CardDescription>
                Configure which notifications are sent through each channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Notification Type</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <Mail className="h-4 w-4 mb-1" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <Bell className="h-4 w-4 mb-1" />
                          <span>Push</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <Smartphone className="h-4 w-4 mb-1" />
                          <span>SMS</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div className="flex flex-col items-center">
                          <MessageSquare className="h-4 w-4 mb-1" />
                          <span>In-App</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {notificationTypes.map((type) => (
                      <tr key={type.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            <Switch 
                              checked={type.email} 
                              onCheckedChange={() => toggleNotification(type.id, 'email')}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            <Switch 
                              checked={type.push} 
                              onCheckedChange={() => toggleNotification(type.id, 'push')}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            <Switch 
                              checked={type.sms} 
                              onCheckedChange={() => toggleNotification(type.id, 'sms')}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            <Switch 
                              checked={type.inApp} 
                              onCheckedChange={() => toggleNotification(type.id, 'inApp')}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Global Notification Settings</CardTitle>
              <CardDescription>
                Configure system-wide notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Enable or disable all email notifications</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Enable or disable all push notifications</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Enable or disable all SMS notifications</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">In-App Notifications</h4>
                  <p className="text-sm text-muted-foreground">Enable or disable all in-app notifications</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Batching</h4>
                  <p className="text-sm text-muted-foreground">Group multiple notifications into a single email</p>
                </div>
                <Select defaultValue="none">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Don't batch</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Templates
              </CardTitle>
              <CardDescription>
                Manage email notification templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Template Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {emailTemplates.map((template) => (
                      <tr key={template.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{template.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{template.subject}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{template.lastUpdated}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input id="sender-name" defaultValue="Iziko Services" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sender-email">Sender Email</Label>
                <Input id="sender-email" defaultValue="notifications@izikoservices.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply-to">Reply-To Email</Label>
                <Input id="reply-to" defaultValue="support@izikoservices.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Email Footer</Label>
                <Textarea 
                  rows={4}
                  defaultValue="© 2023 Iziko Services | Windhoek, Namibia | Terms of Service | Privacy Policy"
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Test Email</Button>
                <Button>Save Settings</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="push" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Push Notification Settings
              </CardTitle>
              <CardDescription>
                Configure push notification delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 border rounded-md bg-yellow-50 text-yellow-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p className="text-sm">
                  Push notifications require Firebase Cloud Messaging to be configured
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Firebase Server Key</Label>
                  <Input type="password" defaultValue="****************************************" />
                </div>
                
                <div className="space-y-2">
                  <Label>Firebase Project ID</Label>
                  <Input defaultValue="iziko-services-app" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Android Push</h4>
                    <p className="text-sm text-muted-foreground">Send push notifications to Android devices</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable iOS Push</h4>
                    <p className="text-sm text-muted-foreground">Send push notifications to iOS devices</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Web Push</h4>
                    <p className="text-sm text-muted-foreground">Send push notifications to web browsers</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Test Push</Button>
                <Button>Save Settings</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sms" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                SMS Notification Settings
              </CardTitle>
              <CardDescription>
                Configure SMS notification delivery and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SMS Provider</Label>
                <Select defaultValue="twilio">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="mtc">MTC API</SelectItem>
                    <SelectItem value="telecom">Telecom Namibia API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>API Key/SID</Label>
                <Input type="password" defaultValue="****************************************" />
              </div>
              
              <div className="space-y-2">
                <Label>API Secret</Label>
                <Input type="password" defaultValue="****************************************" />
              </div>
              
              <div className="space-y-2">
                <Label>Sender ID/Phone</Label>
                <Input defaultValue="IZIKO" />
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">SMS Templates</h3>
                
                <div className="space-y-2">
                  <Label>Booking Confirmation</Label>
                  <Textarea 
                    rows={2}
                    defaultValue="Your booking with {{provider_name}} on {{date}} at {{time}} has been confirmed. Ref: {{booking_id}}"
                  />
                  <p className="text-sm text-muted-foreground">
                    Available variables: {{provider_name}}, {{booking_id}}, {{date}}, {{time}}, {{service_name}}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Booking Reminder</Label>
                  <Textarea 
                    rows={2}
                    defaultValue="Reminder: Your appointment with {{provider_name}} is scheduled for tomorrow at {{time}}. Need to reschedule? Login to your account."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>OTP Verification</Label>
                  <Textarea 
                    rows={2}
                    defaultValue="Your verification code for Iziko Services is {{otp}}. This code will expire in 10 minutes."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Test SMS</Button>
                <Button>Save Settings</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
