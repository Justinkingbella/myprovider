import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { User, Appointment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { PaginationState } from "@tanstack/react-table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, BarChart2, Clock } from "lucide-react";
import { format } from "date-fns";

export default function ProviderDashboard() {
  const { toast } = useToast();
  const { user } = useUser();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  // Fetch current user info
  const { data: currentUser, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ["/api/users/me"],
  });

  // Fetch appointments for the provider
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments/me"],
    enabled: !!currentUser?.id,
  });

  // Calculate appointment statistics
  const appointmentStats = {
    totalClients: appointments ? new Set(appointments.map(a => a.customerId)).size : 0,
    completedServices: appointments?.filter(a => a.status === "completed").length || 0,
    pendingRequests: appointments?.filter(a => a.status === "pending").length || 0,
  };

  // Define columns for the appointment table
  const appointmentColumns = [
    {
      accessorKey: "customerName",
      header: "Client",
      cell: ({ row }: any) => "Client #" + row.original.customerId,
    },
    {
      accessorKey: "dateTime",
      header: "Date & Time",
      cell: ({ row }: any) => {
        const date = new Date(row.original.dateTime);
        return format(date, "MMM d, yyyy - h:mm a");
      },
    },
    {
      accessorKey: "serviceType",
      header: "Service Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        let bgColor = "";
        let textColor = "";
        
        switch (status) {
          case "confirmed":
            bgColor = "bg-green-100";
            textColor = "text-green-800";
            break;
          case "pending":
            bgColor = "bg-yellow-100";
            textColor = "text-yellow-800";
            break;
          case "cancelled":
            bgColor = "bg-red-100";
            textColor = "text-red-800";
            break;
          case "completed":
            bgColor = "bg-blue-100";
            textColor = "text-blue-800";
            break;
          default:
            bgColor = "bg-gray-100";
            textColor = "text-gray-800";
        }
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
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
              title: "View appointment",
              description: `You clicked to view appointment #${row.original.id}`,
            });
          }}
        >
          View
        </Button>
      ),
    },
  ];

  if (isLoadingUser || isLoadingAppointments) {
    return (
      <div className="flex items-center justify-center h-full py-16">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Clients"
          value={appointmentStats.totalClients}
          icon={<Users className="h-6 w-6 text-white" />}
          linkText="View all clients"
          linkHref="#clients"
          color="secondary"
        />
        
        <StatsCard
          title="Completed Services"
          value={appointmentStats.completedServices}
          icon={<BarChart2 className="h-6 w-6 text-white" />}
          linkText="View service history"
          linkHref="#history"
          color="green"
        />
        
        <StatsCard
          title="Pending Requests"
          value={appointmentStats.pendingRequests}
          icon={<Clock className="h-6 w-6 text-white" />}
          linkText="View pending requests"
          linkHref="#pending"
          color="yellow"
        />
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden" id="appointments">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
        </div>
        
        {appointments && appointments.length > 0 ? (
          <DataTable 
            columns={appointmentColumns} 
            data={appointments.filter(a => a.status !== "completed" && a.status !== "cancelled")} 
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">No upcoming appointments found</div>
        )}
      </div>
    </div>
  );
}
