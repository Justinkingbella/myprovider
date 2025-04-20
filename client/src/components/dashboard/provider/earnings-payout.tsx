import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Download, 
  CreditCard, 
  DollarSign, 
  AlertCircle,
  ChevronDown,
  Check,
  Clock,
  CircleDollarSign
} from "lucide-react";

export default function EarningsPayout() {
  const [activeTab, setActiveTab] = useState("earnings");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");

  // Mock earnings data
  const earningsData = [
    {
      id: 1,
      service: "Home Cleaning",
      customer: "Jane Smith",
      date: "2023-07-10",
      amount: 350,
      status: "paid",
      commission: 35
    },
    {
      id: 2,
      service: "Furniture Assembly",
      customer: "Michael Brown",
      date: "2023-07-08",
      amount: 250,
      status: "paid",
      commission: 25
    },
    {
      id: 3,
      service: "Electrical Repair",
      customer: "Sarah Johnson",
      date: "2023-07-05",
      amount: 400,
      status: "paid",
      commission: 40
    },
    {
      id: 4,
      service: "Plumbing",
      customer: "Robert Williams",
      date: "2023-07-01",
      amount: 300,
      status: "paid",
      commission: 30
    }
  ];

  // Mock withdrawal history
  const withdrawalHistory = [
    {
      id: 1,
      amount: 1000,
      date: "2023-07-01",
      method: "Bank Transfer",
      status: "completed"
    },
    {
      id: 2,
      amount: 800,
      date: "2023-06-15",
      method: "EWallet",
      status: "completed"
    },
    {
      id: 3,
      amount: 500,
      date: "2023-06-01",
      method: "PayToday",
      status: "completed"
    },
    {
      id: 4,
      amount: 700,
      date: "2023-05-15",
      method: "Bank Transfer",
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case "processing":
        return <Badge className="bg-purple-100 text-purple-800">Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate total earnings
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.amount - item.commission, 0);
  const totalCommission = earningsData.reduce((sum, item) => sum + item.commission, 0);

  // Calculate available balance (total earnings minus total withdrawals)
  const totalWithdrawals = withdrawalHistory.reduce((sum, item) => sum + item.amount, 0);
  const availableBalance = totalEarnings - totalWithdrawals;

  const handleWithdrawalRequest = () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amount > availableBalance) {
      alert("Withdrawal amount exceeds available balance");
      return;
    }

    alert(`Withdrawal request for N$${amount} via ${withdrawalMethod === 'bank' ? 'Bank Transfer' : withdrawalMethod === 'ewallet' ? 'EWallet' : 'PayToday'} submitted`);
    // In a real implementation, this would submit the withdrawal request to the backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings & Payouts</CardTitle>
        <CardDescription>
          Track your earnings and request payouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <DollarSign className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <h3 className="text-2xl font-bold">N${availableBalance.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <DollarSign className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <h3 className="text-2xl font-bold">N${totalEarnings.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <CreditCard className="h-8 w-8 text-purple-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Platform Commission</p>
                  <h3 className="text-2xl font-bold">N${totalCommission.toFixed(2)}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="earnings" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="earnings">Earnings History</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawal History</TabsTrigger>
              <TabsTrigger value="payout">Request Payout</TabsTrigger>
            </TabsList>

            <TabsContent value="earnings" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Net Earnings</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earningsData.map(earning => (
                      <TableRow key={earning.id}>
                        <TableCell className="font-medium">{earning.service}</TableCell>
                        <TableCell>{earning.customer}</TableCell>
                        <TableCell>{earning.date}</TableCell>
                        <TableCell>N${earning.amount.toFixed(2)}</TableCell>
                        <TableCell>N${earning.commission.toFixed(2)}</TableCell>
                        <TableCell>N${(earning.amount - earning.commission).toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(earning.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Earnings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map(withdrawal => (
                      <TableRow key={withdrawal.id}>
                        <TableCell className="font-medium">N${withdrawal.amount.toFixed(2)}</TableCell>
                        <TableCell>{withdrawal.date}</TableCell>
                        <TableCell>{withdrawal.method}</TableCell>
                        <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="payout" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Withdrawal Information</p>
                        <p className="text-sm">
                          Withdrawals are processed within 1-3 business days.
                          Minimum withdrawal amount is N$100.
                          Your current available balance is N${availableBalance.toFixed(2)}.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Withdrawal Amount (N$)</Label>
                      <div className="flex items-center">
                        <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input 
                          id="amount" 
                          placeholder="0.00" 
                          type="number"
                          min="100"
                          max={availableBalance}
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="ewallet">EWallet</SelectItem>
                          <SelectItem value="paytoday">PayToday</SelectItem>
                          <SelectItem value="dop">DoP Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {withdrawalMethod === 'bank' && (
                      <div className="space-y-2 p-3 border rounded-md bg-slate-50">
                        <p className="text-sm font-medium">Your Bank Account Details</p>
                        <div className="text-sm">
                          <p>First National Bank</p>
                          <p>Account: 62123456789</p>
                          <p>Branch: 280172</p>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      onClick={handleWithdrawalRequest}
                      disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > availableBalance}
                    >
                      Request Withdrawal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}