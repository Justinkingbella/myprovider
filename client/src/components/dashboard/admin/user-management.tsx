
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, UserPlus, Filter, CheckCircle, XCircle, Edit, Eye, Trash, AlertCircle } from "lucide-react";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock data for the UI
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "customer", status: "active", joined: "2023-04-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "provider", status: "active", joined: "2023-05-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "provider", status: "pending", joined: "2023-06-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "customer", status: "active", joined: "2023-06-15" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "provider", status: "suspended", joined: "2023-03-05" },
    { id: 6, name: "Eva Wilson", email: "eva@example.com", role: "customer", status: "active", joined: "2023-05-12" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "provider":
        return <Badge className="bg-blue-500">Provider</Badge>;
      case "customer":
        return <Badge className="bg-green-500">Customer</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "customers") return matchesSearch && user.role === "customer";
    if (selectedTab === "providers") return matchesSearch && user.role === "provider";
    if (selectedTab === "pending") return matchesSearch && user.status === "pending";
    if (selectedTab === "suspended") return matchesSearch && user.status === "suspended";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage your platform users, approve new service providers, and control user access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Button className="sm:w-auto">
                <UserPlus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>

            <Tabs
              defaultValue="all"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-5">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="providers">Providers</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="suspended">Suspended</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit user
                              </DropdownMenuItem>
                              {user.status === "pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                </DropdownMenuItem>
                              )}
                              {user.status === "active" && (
                                <DropdownMenuItem>
                                  <XCircle className="mr-2 h-4 w-4" /> Suspend
                                </DropdownMenuItem>
                              )}
                              {user.status === "suspended" && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Reactivate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete user
                              </DropdownMenuItem>
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

      {/* User details dialog */}
      <Dialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p>{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedUser.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Joined</p>
                  <p>{new Date(selectedUser.joined).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-start">
            <Button variant="secondary" onClick={() => setOpenUserDialog(false)}>
              Close
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" /> Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
