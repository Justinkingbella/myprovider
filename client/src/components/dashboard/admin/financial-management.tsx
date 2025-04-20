
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  CreditCard, DollarSign, PercentIcon, Settings, Filter, Download, PlusCircle, Percent
} from "lucide-react";

export default function FinancialManagement() {
  const [activeTab, setActiveTab] = useState("commission");
  const [openPricingDialog, setOpenPricingDialog] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Financial Management</CardTitle>
          <CardDescription>
            Manage platform commissions, pricing models, and financial settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="commission" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="commission">
                <PercentIcon className="mr-2 h-4 w-4" />
                Commission Structure
              </TabsTrigger>
              <TabsTrigger value="pricing">
                <DollarSign className="mr-2 h-4 w-4" />
                Pricing Models
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Financial Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="commission" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Category Commission Rates</h3>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Standard Rate</TableHead>
                      <TableHead>Premium Rate</TableHead>
                      <TableHead>Business Rate</TableHead>
                      <TableHead>Minimum Fee</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Home Cleaning</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>8%</TableCell>
                      <TableCell>6%</TableCell>
                      <TableCell>N$20</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Plumbing</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>12%</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>N$25</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Electrical</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>12%</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>N$25</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beauty & Wellness</TableCell>
                      <TableCell>12%</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>8%</TableCell>
                      <TableCell>N$15</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Personal Errands</TableCell>
                      <TableCell>8%</TableCell>
                      <TableCell>7%</TableCell>
                      <TableCell>6%</TableCell>
                      <TableCell>N$10</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Default Commission Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="default-rate">Default Commission Rate</Label>
                      <div className="flex">
                        <Input
                          id="default-rate"
                          type="number"
                          defaultValue="10"
                          className="rounded-r-none"
                        />
                        <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                          %
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-commission">Minimum Commission</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="min-commission"
                          type="number"
                          defaultValue="10"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-commission">Maximum Commission</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="max-commission"
                          type="number"
                          defaultValue="500"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-end">
                    <Button>Save Commission Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Platform Pricing Models</h3>
                <Button onClick={() => setOpenPricingDialog(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Pricing Model
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Hourly Rate</TableCell>
                      <TableCell>Time-based</TableCell>
                      <TableCell>Charge per hour of service</TableCell>
                      <TableCell className="text-green-600">Active</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fixed Price</TableCell>
                      <TableCell>Project-based</TableCell>
                      <TableCell>Flat rate for entire service</TableCell>
                      <TableCell className="text-green-600">Active</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Premium Service</TableCell>
                      <TableCell>Time-based with premium</TableCell>
                      <TableCell>Higher rate for urgent/priority bookings</TableCell>
                      <TableCell className="text-green-600">Active</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Subscription</TableCell>
                      <TableCell>Recurring</TableCell>
                      <TableCell>Regular service on schedule</TableCell>
                      <TableCell className="text-yellow-600">Inactive</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="min-hourly">Minimum Hourly Rate</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="min-hourly"
                          type="number"
                          defaultValue="100"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-hourly">Maximum Hourly Rate</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="max-hourly"
                          type="number"
                          defaultValue="1500"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgent-fee">Urgent Booking Premium</Label>
                      <div className="flex">
                        <Input
                          id="urgent-fee"
                          type="number"
                          defaultValue="30"
                          className="rounded-r-none"
                        />
                        <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                          %
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="holiday-fee">Weekend/Holiday Premium</Label>
                      <div className="flex">
                        <Input
                          id="holiday-fee"
                          type="number"
                          defaultValue="15"
                          className="rounded-r-none"
                        />
                        <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-end">
                    <Button>Save Pricing Rules</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure accepted payment methods and processing options.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">PayToday</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="paytoday-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="paytoday-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Process payments through PayToday mobile payment gateway
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> 3.5%
                        </div>
                      </div>

                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">PayFast</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="payfast-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="payfast-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Process payments through PayFast gateway
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> 4.0% + N$2
                        </div>
                      </div>

                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">EWallet</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="ewallet-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="ewallet-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accept payments via MTC/TN Mobile EWallet
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> 2.0%
                        </div>
                      </div>

                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">Bank Transfer</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="bank-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="bank-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Process payments via direct bank transfer
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> N$0
                        </div>
                      </div>

                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">Credit/Debit Card</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="card-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="card-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Accept credit and debit card payments
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> 3.5% + N$1
                        </div>
                      </div>

                      <div className="rounded-md border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="cash-active" className="text-sm">Active</Label>
                            <div className="ml-auto">
                              <Switch id="cash-active" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Allow cash payments on service completion
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Processing Fee:</span> N$0
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-end">
                      <Button>Save Payment Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="default-currency">Default Currency</Label>
                      <Select defaultValue="NAD">
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
                      <Label htmlFor="tax-rate">VAT/Tax Rate</Label>
                      <div className="flex">
                        <Input
                          id="tax-rate"
                          type="number"
                          defaultValue="15"
                          className="rounded-r-none"
                        />
                        <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                          %
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payout-threshold">Minimum Payout Threshold</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="payout-threshold"
                          type="number"
                          defaultValue="250"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payout-cycle">Payout Cycle</Label>
                      <Select defaultValue="biweekly">
                        <SelectTrigger id="payout-cycle">
                          <SelectValue placeholder="Select cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-fee">Platform Booking Fee</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          N$
                        </div>
                        <Input
                          id="booking-fee"
                          type="number"
                          defaultValue="10"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cancellation-fee">Late Cancellation Fee</Label>
                      <div className="flex">
                        <Input
                          id="cancellation-fee"
                          type="number"
                          defaultValue="25"
                          className="rounded-r-none"
                        />
                        <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-end">
                    <Button>Save Financial Settings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice & Receipt Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name on Invoice</Label>
                      <Input
                        id="company-name"
                        defaultValue="ServiceConnect Namibia"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Company Address</Label>
                      <Input
                        id="company-address"
                        defaultValue="123 Independence Ave, Windhoek, Namibia"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-reg">Company Registration Number</Label>
                      <Input
                        id="company-reg"
                        defaultValue="REG12345-6789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vat-number">VAT Registration Number</Label>
                      <Input
                        id="vat-number"
                        defaultValue="VAT123456789"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                      <Input
                        id="invoice-notes"
                        defaultValue="Thank you for your business. Payment is due within 7 days."
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-end">
                    <Button>Save Invoice Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pricing Model Dialog */}
      <Dialog open={openPricingDialog} onOpenChange={setOpenPricingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Pricing Model</DialogTitle>
            <DialogDescription>
              Create a new pricing model for your platform.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model-name" className="text-right">
                Model Name
              </Label>
              <Input
                id="model-name"
                placeholder="e.g., Weekly Subscription"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model-type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger id="model-type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Time-based</SelectItem>
                  <SelectItem value="project">Project-based</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="milestone">Milestone-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model-description" className="text-right">
                Description
              </Label>
              <Input
                id="model-description"
                placeholder="Describe this pricing model"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="commission-rate" className="text-right">
                Commission Rate
              </Label>
              <div className="col-span-3 flex">
                <Input
                  id="commission-rate"
                  type="number"
                  defaultValue="10"
                  className="rounded-r-none"
                />
                <div className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-muted text-muted-foreground">
                  %
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4">
                <Separator />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-3 col-start-2 flex items-center space-x-2">
                <Switch id="model-active" defaultChecked />
                <Label htmlFor="model-active">Model is active</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpenPricingDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setOpenPricingDialog(false)}>
              Add Pricing Model
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Switch } from "@/components/ui/switch";
