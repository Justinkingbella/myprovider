
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, MapPin } from "lucide-react";

export default function AnalyticsReports() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [timePeriod, setTimePeriod] = useState("month");

  // Mock data for analytics
  const revenueData = [
    { name: 'Jan', total: 12400 },
    { name: 'Feb', total: 15600 },
    { name: 'Mar', total: 18900 },
    { name: 'Apr', total: 17500 },
    { name: 'May', total: 21000 },
    { name: 'Jun', total: 24600 },
    { name: 'Jul', total: 27300 },
    { name: 'Aug', total: 28100 },
  ];

  const bookingsData = [
    { name: 'Jan', bookings: 145 },
    { name: 'Feb', bookings: 168 },
    { name: 'Mar', bookings: 195 },
    { name: 'Apr', bookings: 187 },
    { name: 'May', bookings: 210 },
    { name: 'Jun', bookings: 235 },
    { name: 'Jul', bookings: 245 },
    { name: 'Aug', bookings: 260 },
  ];

  const categoryData = [
    { name: 'Plumbing', value: 320 },
    { name: 'Electrical', value: 280 },
    { name: 'Cleaning', value: 450 },
    { name: 'Gardening', value: 180 },
    { name: 'Errands', value: 310 },
    { name: 'Beauty', value: 220 },
  ];

  const regionData = [
    { name: 'Windhoek', value: 850 },
    { name: 'Swakopmund', value: 320 },
    { name: 'Walvis Bay', value: 290 },
    { name: 'Oshakati', value: 210 },
    { name: 'Rundu', value: 150 },
    { name: 'Other', value: 180 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB', '#8884D8'];

  const providerPerformanceData = [
    { name: 'Quick Plumbing', bookings: 120, revenue: 18500, rating: 4.8 },
    { name: 'Clean Home', bookings: 150, revenue: 24500, rating: 4.9 },
    { name: 'ElectroPro', bookings: 95, revenue: 19200, rating: 4.7 },
    { name: 'GreenThumb', bookings: 75, revenue: 12800, rating: 4.5 },
    { name: 'Beauty Hub', bookings: 110, revenue: 16500, rating: 4.6 },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Analytics & Reports</CardTitle>
            <CardDescription>
              View detailed platform analytics and generate reports.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select 
              defaultValue="month" 
              value={timePeriod}
              onValueChange={setTimePeriod}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="revenue">
                <LineChartIcon className="mr-2 h-4 w-4" /> 
                Revenue
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <BarChart2 className="mr-2 h-4 w-4" /> 
                Bookings
              </TabsTrigger>
              <TabsTrigger value="categories">
                <PieChartIcon className="mr-2 h-4 w-4" /> 
                Categories
              </TabsTrigger>
              <TabsTrigger value="regions">
                <MapPin className="mr-2 h-4 w-4" /> 
                Regions
              </TabsTrigger>
              <TabsTrigger value="providers">
                <BarChart2 className="mr-2 h-4 w-4" /> 
                Providers
              </TabsTrigger>
              <TabsTrigger value="overview">
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-4">
              <div className="h-[400px]">
                <h3 className="text-lg font-medium mb-2">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`N$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Revenue (N$)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">N$165,400</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Platform Fees</p>
                      <p className="text-2xl font-bold">N$16,540</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Provider Payouts</p>
                      <p className="text-2xl font-bold">N$148,860</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Order Value</p>
                      <p className="text-2xl font-bold">N$640</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <div className="h-[400px]">
                <h3 className="text-lg font-medium mb-2">Booking Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" fill="#82ca9d" name="Number of Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">1,445</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">1,258</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                      <p className="text-2xl font-bold">87</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Disputed</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="h-[400px]">
                <h3 className="text-lg font-medium mb-2">Service Categories</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} bookings`]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="h-4 w-4 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{category.value} bookings</span>
                          <span>{((category.value / categoryData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regions" className="space-y-4">
              <div className="h-[400px]">
                <h3 className="text-lg font-medium mb-2">Regional Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} bookings`]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="h-4 w-4 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{region.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{region.value} bookings</span>
                          <span>{((region.value / regionData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="providers" className="space-y-4">
              <div className="h-[400px]">
                <h3 className="text-lg font-medium mb-2">Top Service Providers</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={providerPerformanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (N$)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Provider Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerPerformanceData.map((provider, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{provider.name}</TableCell>
                          <TableCell>{provider.bookings}</TableCell>
                          <TableCell>N${provider.revenue.toLocaleString()}</TableCell>
                          <TableCell>{provider.rating}/5.0</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold">245</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Service Providers</p>
                          <p className="text-2xl font-bold">78</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                          <p className="text-2xl font-bold">1,445</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold">N$165,400</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">New Users (30d)</p>
                          <p className="text-2xl font-bold">37</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">New Bookings (30d)</p>
                          <p className="text-2xl font-bold">260</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Revenue (30d)</p>
                          <p className="text-2xl font-bold">N$28,100</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active Disputes</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={revenueData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="total" stroke="#8884d8" name="Revenue (N$)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
