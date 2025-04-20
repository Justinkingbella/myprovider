import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { User, Appointment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { PaginationState } from "@tanstack/react-table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, Users, Briefcase, UserCheck } from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const { user } = useUser();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  // Fetch all users
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  // Calculate user statistics
  const userStats = {
    total: users?.length || 0,
    providers: users?.filter(u => u.role === "provider").length || 0,
    customers: users?.filter(u => u.role === "customer").length || 0,
  };

  // Define columns for the user table
  const userColumns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }: any) => `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }: any) => {
        const role = row.original.role;
        let bgColor = "";
        let textColor = "";
        
        switch (role) {
          case "admin":
            bgColor = "bg-purple-100";
            textColor = "text-purple-800";
            break;
          case "provider":
            bgColor = "bg-blue-100";
            textColor = "text-blue-800";
            break;
          case "customer":
            bgColor = "bg-green-100";
            textColor = "text-green-800";
            break;
          default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-800";
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => {
            toast({
              title: "Edit user",
              description: `You clicked to edit ${row.original.firstName} ${row.original.lastName}`,
            });
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center h-full py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={userStats.total}
          icon={<Users className="h-6 w-6 text-white" />}
          linkText="View all users"
          linkHref="#users"
          color="primary"
        />
        
        <StatsCard
          title="Providers"
          value={userStats.providers}
          icon={<Briefcase className="h-6 w-6 text-white" />}
          linkText="View all providers"
          linkHref="#providers"
          color="secondary"
        />
        
        <StatsCard
          title="Customers"
          value={userStats.customers}
          icon={<UserCheck className="h-6 w-6 text-white" />}
          linkText="View all customers"
          linkHref="#customers"
          color="green"
        />
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden" id="users">
        <div className="p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Add User",
                description: "You clicked to add a new user",
              });
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        {users && users.length > 0 ? (
          <DataTable 
            columns={userColumns} 
            data={users} 
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}
