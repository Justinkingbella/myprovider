
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
