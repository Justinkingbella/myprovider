import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Shield, CreditCard, Globe, Layers, FileText, 
  RefreshCw, UploadCloud, Save, Code
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlatformSettings() {
  // Mock data - in a real app, this would come from API
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Iziko Services",
    supportEmail: "support@izikoservices.com",
    supportPhone: "+264 61 123 4567",
    defaultCurrency: "NAD",
    timeZone: "Africa/Windhoek",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    maintenanceMode: false
  });

  const [integrations, setIntegrations] = useState([
    { id: 1, name: "PayToday", type: "payment", status: "active", lastSync: "2023-07-15 14:30" },
    { id: 2, name: "PayFast", type: "payment", status: "inactive", lastSync: "-" },
    { id: 3, name: "EWallet", type: "payment", status: "active", lastSync: "2023-07-20 09:45" },
    { id: 4, name: "Google Maps", type: "maps", status: "active", lastSync: "2023-07-21 16:20" },
    { id: 5, name: "SMS Gateway", type: "notification", status: "active", lastSync: "2023-07-21 11:10" },
    { id: 6, name: "Firebase", type: "notification", status: "inactive", lastSync: "-" },
  ]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="terms">Legal</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input 
                    id="platform-name" 
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input 
                    id="support-email" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input 
                    id="support-phone" 
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select 
                    value={generalSettings.defaultCurrency}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultCurrency: value})}
                  >
                    <SelectTrigger id="default-currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NAD">Namibian Dollar (N$)</SelectItem>
                      <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-zone">Time Zone</Label>
                  <Select 
                    value={generalSettings.timeZone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timeZone: value})}
                  >
                    <SelectTrigger id="time-zone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Windhoek">Windhoek (GMT+2)</SelectItem>
                      <SelectItem value="Africa/Johannesburg">Johannesburg (GMT+2)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select 
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, dateFormat: value})}
                  >
                    <SelectTrigger id="date-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select 
                    value={generalSettings.timeFormat}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timeFormat: value})}
                  >
                    <SelectTrigger id="time-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <h4 className="font-medium">Maintenance Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    When enabled, only admins can access the platform
                  </p>
                </div>
                <Switch 
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure platform security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Password Requirements</h4>
                    <p className="text-sm text-muted-foreground">
                      Enforce strong password policy
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically log users out after inactivity
                    </p>
                  </div>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Lockout</h4>
                    <p className="text-sm text-muted-foreground">
                      Lock accounts after failed login attempts
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">After</span>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">attempts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Rate Limiting</h4>
                    <p className="text-sm text-muted-foreground">
                      Limit API requests per IP
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="100" className="w-20 h-8" />
                    <span className="text-sm text-muted-foreground">req/min</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Integrations
              </CardTitle>
              <CardDescription>
                Manage third-party service integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Integration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Sync</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {integrations.map((integration) => (
                      <tr key={integration.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{integration.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground capitalize">{integration.type}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            integration.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {integration.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{integration.lastSync}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                          {integration.status === 'active' ? (
                            <Button variant="outline" size="sm" className="mr-2">Configure</Button>
                          ) : (
                            <Button variant="outline" size="sm" className="mr-2">Activate</Button>
                          )}
                          {integration.status === 'active' && (
                            <Button size="sm" variant="ghost" className="text-muted-foreground">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline">Add New Integration</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>
                Configure payment processing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">PayToday</h3>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paytoday-merchant-id">Merchant ID</Label>
                  <Input id="paytoday-merchant-id" type="password" defaultValue="************" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paytoday-api-key">API Key</Label>
                  <Input id="paytoday-api-key" type="password" defaultValue="************" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Test Mode</h4>
                    <p className="text-xs text-muted-foreground">Process test transactions only</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Mobile Wallets</h3>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ewallet" defaultChecked />
                    <Label htmlFor="ewallet">EWallet</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="bluewallet" defaultChecked />
                    <Label htmlFor="bluewallet">Blue Wallet</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="easywallet" />
                    <Label htmlFor="easywallet">Easy Wallet</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Payment Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Branding & Appearance
              </CardTitle>
              <CardDescription>
                Customize the platform appearance and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Logo & Icons</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Main Logo</Label>
                    <div className="border rounded-md p-6 text-center">
                      <div className="w-40 h-40 bg-gray-100 mx-auto flex items-center justify-center rounded-md mb-4">
                        <span className="text-muted-foreground">Logo Preview</span>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload Logo</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 200x200px. PNG or SVG format.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border rounded-md p-6 text-center">
                      <div className="w-20 h-20 bg-gray-100 mx-auto flex items-center justify-center rounded-md mb-4">
                        <span className="text-muted-foreground">Icon</span>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload Favicon</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 32x32px. PNG or ICO format.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Colors</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-blue-600 mr-2"></div>
                      <Input id="primary-color" defaultValue="#2563EB" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-green-600 mr-2"></div>
                      <Input id="secondary-color" defaultValue="#16A34A" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-purple-600 mr-2"></div>
                      <Input id="accent-color" defaultValue="#9333EA" />
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">Reset to Default Colors</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Font Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading-font">Heading Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger id="heading-font">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body-font">Body Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger id="body-font">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="sourcesanspro">Source Sans Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Preview</Button>
                <Button>Save Branding</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Legal Documents
              </CardTitle>
              <CardDescription>
                Manage terms of service and privacy policy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Terms of Service</h3>
                <Textarea 
                  rows={10}
                  defaultValue="[Insert your terms of service here]

1. Acceptance of Terms
By accessing and using this platform, you agree to be bound by these Terms of Service.

2. Description of Service
Iziko Services provides a platform connecting customers with service providers in Namibia.

3. User Accounts
All users must register and maintain accurate account information.

4. Fees and Payments
Service providers will be charged a commission on completed bookings.

5. Prohibited Activities
Users must not engage in any illegal or unauthorized activities.

6. Termination
We reserve the right to terminate access for violations of these terms."
                />
                <div className="flex justify-end">
                  <Button variant="outline">Save Terms</Button>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <h3 className="text-lg font-medium">Privacy Policy</h3>
                <Textarea 
                  rows={10}
                  defaultValue="[Insert your privacy policy here]

1. Information We Collect
We collect personal information including name, contact details, and payment information.

2. How We Use Your Information
Your information is used to provide and improve our services.

3. Data Sharing
We may share data with service providers and as required by law.

4. Security
We implement reasonable security measures to protect your information.

5. Your Rights
You have the right to access, correct, and delete your personal data.

6. Updates to This Policy
We may update this policy and will notify users of significant changes."
                />
                <div className="flex justify-end">
                  <Button variant="outline">Save Policy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure system-level settings (for advanced users only)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Caching</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable System Cache</h4>
                    <p className="text-sm text-muted-foreground">
                      Improve performance by caching frequently accessed data
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Clear Cache</Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Database</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" size="sm">Backup Database</Button>
                  <Button variant="outline" size="sm">Restore from Backup</Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Logging</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Debug Logging</h4>
                    <p className="text-sm text-muted-foreground">
                      Record detailed application logs for troubleshooting
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Log Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      How long to keep system logs
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">System Maintenance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" size="sm">Clean Temporary Files</Button>
                  <Button variant="outline" size="sm">Optimize Database</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// This is a needed component for the checkboxes in the Mobile Wallets section
const Checkbox = ({ id, defaultChecked, ...props }) => {
  return (
    <input
      type="checkbox"
      id={id}
      defaultChecked={defaultChecked}
      className="rounded h-4 w-4 text-primary"
      {...props}
    />
  );
};