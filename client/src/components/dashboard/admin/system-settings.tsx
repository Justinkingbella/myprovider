
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Shield, Database, Laptop, Server, HardDrive, Upload, Download, RefreshCw
} from "lucide-react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Configure system-wide technical settings and infrastructure options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">
                <Settings className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="database">
                <Database className="mr-2 h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="apis">
                <Server className="mr-2 h-4 w-4" />
                APIs & Integrations
              </TabsTrigger>
              <TabsTrigger value="backup">
                <HardDrive className="mr-2 h-4 w-4" />
                Backup & Recovery
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">System Version</p>
                    <p>1.0.4 (Released: June 15, 2023)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Environment</p>
                    <p>Production</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Server Status</p>
                    <p className="flex items-center text-green-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></span>
                      Operational
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Maintenance</p>
                    <p>August 5, 2023</p>
                  </div>
                </div>

                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium">Performance Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Laptop className="h-4 w-4" />
                      <Label htmlFor="cache-enable">Enable System Caching</Label>
                    </div>
                    <Switch id="cache-enable" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                    <Input
                      id="cache-duration"
                      type="number"
                      defaultValue="60"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end space-x-2">
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" /> Restart Services
                  </Button>
                  <Button>
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="force-ssl">Force SSL</Label>
                    </div>
                    <Switch id="force-ssl" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="rate-limit">Enable API Rate Limiting</Label>
                    </div>
                    <Switch id="rate-limit" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-value">Max Requests per Minute</Label>
                    <Input
                      id="rate-limit-value"
                      type="number"
                      defaultValue="100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cors-origins">Allowed CORS Origins</Label>
                    <Textarea
                      id="cors-origins"
                      defaultValue="https://serviceconnect.na&#10;https://admin.serviceconnect.na"
                      placeholder="One origin per line"
                    />
                    <p className="text-xs text-muted-foreground">Enter one origin per line</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end">
                  <Button>
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Database Configuration</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input
                      id="db-host"
                      defaultValue="127.0.0.1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Database Port</Label>
                    <Input
                      id="db-port"
                      defaultValue="5432"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input
                      id="db-name"
                      defaultValue="serviceconnect_prod"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-username">Database Username</Label>
                    <Input
                      id="db-username"
                      defaultValue="dbuser"
                      type="password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-password">Database Password</Label>
                    <Input
                      id="db-password"
                      defaultValue="********"
                      type="password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="connection-pool">Connection Pool Size</Label>
                    <Input
                      id="connection-pool"
                      type="number"
                      defaultValue="10"
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Test Connection
                  </Button>
                  <Button>
                    Save Database Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="apis" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Integrations</h3>
                <div className="space-y-6">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">PayToday API</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paytoday-key">API Key</Label>
                        <Input
                          id="paytoday-key"
                          type="password"
                          defaultValue="pt_live_***********************"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paytoday-account">Merchant Account ID</Label>
                        <Input
                          id="paytoday-account"
                          defaultValue="PTM12345678"
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="paytoday-active">Active</Label>
                        </div>
                        <Switch id="paytoday-active" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">SMS Gateway</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sms-provider">Provider</Label>
                        <Select defaultValue="mtc">
                          <SelectTrigger id="sms-provider">
                            <SelectValue placeholder="Select SMS provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mtc">MTC Business</SelectItem>
                            <SelectItem value="telecom">Telecom Namibia</SelectItem>
                            <SelectItem value="twilio">Twilio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sms-api-key">API Key</Label>
                        <Input
                          id="sms-api-key"
                          type="password"
                          defaultValue="sms_***********************"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sms-sender-id">Sender ID</Label>
                        <Input
                          id="sms-sender-id"
                          defaultValue="ServiceConnect"
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="sms-active">Active</Label>
                        </div>
                        <Switch id="sms-active" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">Email Service</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-provider">Provider</Label>
                        <Select defaultValue="sendgrid">
                          <SelectTrigger id="email-provider">
                            <SelectValue placeholder="Select email provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sendgrid">SendGrid</SelectItem>
                            <SelectItem value="mailgun">Mailgun</SelectItem>
                            <SelectItem value="smtp">Custom SMTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-api-key">API Key</Label>
                        <Input
                          id="email-api-key"
                          type="password"
                          defaultValue="SG.***********************"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-from">From Address</Label>
                        <Input
                          id="email-from"
                          defaultValue="noreply@serviceconnect.na"
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="email-active">Active</Label>
                        </div>
                        <Switch id="email-active" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    Save API Settings
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Backup Configuration</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4" />
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input
                      id="backup-retention"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-storage">Backup Storage Location</Label>
                    <Select defaultValue="s3">
                      <SelectTrigger id="backup-storage">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="google">Google Cloud Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-path">Backup Path/Bucket</Label>
                    <Input
                      id="backup-path"
                      defaultValue="serviceconnect-backups"
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manual Backup & Restore</h3>
                  <div className="flex space-x-2">
                    <Button>
                      <Download className="mr-2 h-4 w-4" /> Create Manual Backup
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" /> Restore from Backup
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Backup History</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>backup_2023-08-15_00-00-01.zip</span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Download</Button>
                            <Button variant="outline" size="sm">Restore</Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>backup_2023-08-14_00-00-01.zip</span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Download</Button>
                            <Button variant="outline" size="sm">Restore</Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>backup_2023-08-13_00-00-01.zip</span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Download</Button>
                            <Button variant="outline" size="sm">Restore</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    Save Backup Settings
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
