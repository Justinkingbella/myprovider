
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookingCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
        <CardDescription>
          View and manage your upcoming and past bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Booking calendar interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
