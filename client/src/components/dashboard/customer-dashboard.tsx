import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { User, Appointment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { PaginationState } from "@tanstack/react-table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Clock, ClipboardList, PlusCircle } from "lucide-react";
import { format } from "date-fns";

export default function CustomerDashboard() {
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

  // Fetch appointments for the customer
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments/me"],
    enabled: !!currentUser?.id,
  });

  // Calculate appointment statistics
  const appointmentStats = {
    upcoming: appointments?.filter(a => 
      a.status !== "completed" && a.status !== "cancelled" && 
      new Date(a.dateTime) > new Date()
    ).length || 0,
    history: appointments?.filter(a => 
      a.status === "completed" || a.status === "cancelled"
    ).length || 0,
  };

  // Define columns for the appointment table
  const appointmentColumns = [
    {
      accessorKey: "providerName",
      header: "Provider",
      cell: ({ row }: any) => "Provider #" + row.original.providerId,
    },
    {
      accessorKey: "serviceType",
      header: "Service",
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
              title: "View details",
              description: `You clicked to view details for appointment #${row.original.id}`,
            });
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  if (isLoadingUser || isLoadingAppointments) {
    return (
      <div className="flex items-center justify-center h-full py-16">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Upcoming Appointments"
          value={appointmentStats.upcoming}
          icon={<Clock className="h-6 w-6 text-white" />}
          linkText="View calendar"
          linkHref="#calendar"
          color="green"
        />
        
        <StatsCard
          title="Service History"
          value={appointmentStats.history}
          icon={<ClipboardList className="h-6 w-6 text-white" />}
          linkText="View history"
          linkHref="#history"
          color="indigo"
        />
        
        <StatsCard
          title="Schedule New Service"
          value="Book Now"
          valueClass="text-green-600"
          icon={<PlusCircle className="h-6 w-6 text-white" />}
          linkText="Find providers"
          linkHref="#providers"
          color="red"
        />
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden" id="appointments">
        <div className="p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Appointments</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Schedule New",
                description: "You clicked to schedule a new appointment",
              });
            }}
          >
            Schedule New
          </Button>
        </div>
        
        {appointments && appointments.length > 0 ? (
          <DataTable 
            columns={appointmentColumns} 
            data={appointments.filter(a => 
              a.status !== "cancelled" && 
              new Date(a.dateTime) > new Date().setDate(new Date().getDate() - 7) // Show recent and future appointments
            )} 
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">No appointments found</div>
        )}
      </div>
    </div>
  );
}
