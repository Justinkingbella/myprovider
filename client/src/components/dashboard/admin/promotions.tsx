
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Percent, Plus, Tag, Calendar, MoreHorizontal, Edit, Eye, Trash } from "lucide-react";

export default function Promotions() {
  const [activeTab, setActiveTab] = useState("discounts");
  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  // Mock data for promotions
  const promotions = [
    { 
      id: 1, 
      name: "New User Discount", 
      type: "discount", 
      value: 15, 
      isPercentage: true, 
      code: "NEWUSER15",
      startDate: "2023-07-01", 
      endDate: "2023-12-31", 
      status: "active", 
      usageLimit: 1,
      usageCount: 87,
      description: "15% off for new users on their first booking"
    },
    { 
      id: 2, 
      name: "Holiday Season", 
      type: "discount", 
      value: 10, 
      isPercentage: true, 
      code: "HOLIDAY10",
      startDate: "2023-12-01", 
      endDate: "2023-12-31", 
      status: "active", 
      usageLimit: 0,
      usageCount: 45,
      description: "10% off for all services during holiday season"
    },
    { 
      id: 3, 
      name: "Refer a Friend", 
      type: "referral", 
      value: 50, 
      isPercentage: false, 
      code: null,
      startDate: "2023-01-01", 
      endDate: null, 
      status: "active", 
      usageLimit: 0,
      usageCount: 156,
      description: "Earn N$50 when you refer a friend"
    },
    { 
      id: 4, 
      name: "Loyalty Program", 
      type: "loyalty", 
      value: 5, 
      isPercentage: true, 
      code: null,
      startDate: "2023-01-01", 
      endDate: null, 
      status: "active", 
      usageLimit: 0,
      usageCount: 320,
      description: "5% off for customers with 5+ completed bookings"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>;
      case "paused":
        return <Badge className="bg-yellow-500">Paused</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAddPromotion = () => {
    setIsEditing(false);
    setSelectedPromotion(null);
    setOpenPromotionDialog(true);
  };

  const handleEditPromotion = (promotion: any) => {
    setIsEditing(true);
    setSelectedPromotion(promotion);
    setOpenPromotionDialog(true);
  };

  const filteredPromotions = promotions.filter(promotion => {
    if (activeTab === "all") return true;
    if (activeTab === "discounts") return promotion.type === "discount";
    if (activeTab === "referrals") return promotion.type === "referral";
    if (activeTab === "loyalty") return promotion.type === "loyalty";
    return true;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Promotions & Discounts</CardTitle>
          <CardDescription>
            Manage promotional offers, discount codes, referral programs, and loyalty rewards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Tabs
                defaultValue="discounts"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="discounts">Discounts</TabsTrigger>
                  <TabsTrigger value="referrals">Referrals</TabsTrigger>
                  <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleAddPromotion}>
                <Plus className="mr-2 h-4 w-4" /> Add Promotion
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromotions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No promotions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPromotions.map((promotion) => (
                      <TableRow key={promotion.id}>
                        <TableCell className="font-medium">{promotion.name}</TableCell>
                        <TableCell className="capitalize">{promotion.type}</TableCell>
                        <TableCell>
                          {promotion.isPercentage ? `${promotion.value}%` : `N$${promotion.value}`}
                        </TableCell>
                        <TableCell>{promotion.code || "-"}</TableCell>
                        <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                        <TableCell>{promotion.usageCount}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditPromotion(promotion)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View Analytics
                              </DropdownMenuItem>
                              {promotion.status === "active" ? (
                                <DropdownMenuItem>
                                  <Trash className="mr-2 h-4 w-4" /> Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Trash className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotion dialog */}
      <Dialog open={openPromotionDialog} onOpenChange={setOpenPromotionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Promotion" : "Add New Promotion"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update an existing promotion" : "Create a new promotion for your platform"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-name" className="text-right">
                Name
              </Label>
              <Input
                id="promotion-name"
                defaultValue={selectedPromotion?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-type" className="text-right">
                Type
              </Label>
              <Select defaultValue={selectedPromotion?.type || "discount"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select promotion type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="referral">Referral Program</SelectItem>
                  <SelectItem value="loyalty">Loyalty Reward</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-value" className="text-right">
                Value
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="promotion-value"
                  type="number"
                  defaultValue={selectedPromotion?.value || "10"}
                  className="flex-1"
                />
                <Select defaultValue={selectedPromotion?.isPercentage ? "percentage" : "fixed"}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-code" className="text-right">
                Code
              </Label>
              <Input
                id="promotion-code"
                defaultValue={selectedPromotion?.code || ""}
                className="col-span-3"
                placeholder="Leave empty for auto-applied promotions"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-startdate" className="text-right">
                Start Date
              </Label>
              <Input
                id="promotion-startdate"
                type="date"
                defaultValue={selectedPromotion?.startDate || new Date().toISOString().split('T')[0]}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-enddate" className="text-right">
                End Date
              </Label>
              <Input
                id="promotion-enddate"
                type="date"
                defaultValue={selectedPromotion?.endDate || ""}
                className="col-span-3"
                placeholder="No end date"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-limit" className="text-right">
                Usage Limit
              </Label>
              <Input
                id="promotion-limit"
                type="number"
                defaultValue={selectedPromotion?.usageLimit || "0"}
                className="col-span-3"
                placeholder="0 for unlimited"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="promotion-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="promotion-description"
                defaultValue={selectedPromotion?.description || ""}
                className="col-span-3"
                placeholder="Describe the promotion details"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promotion-active" className="text-right">
                Active
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="promotion-active" defaultChecked={!selectedPromotion || selectedPromotion?.status === "active"} />
                <Label htmlFor="promotion-active">
                  {!selectedPromotion || selectedPromotion?.status === "active" ? "Promotion is active" : "Promotion is inactive"}
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpenPromotionDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setOpenPromotionDialog(false)}>
              {isEditing ? "Update Promotion" : "Create Promotion"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
