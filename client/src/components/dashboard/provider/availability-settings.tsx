
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Check, X } from "lucide-react";

export default function AvailabilitySettings() {
  // State for days of the week
  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ];
  
  // Initial availability data
  const [availability, setAvailability] = useState({
    Monday: { active: true, start: "08:00", end: "17:00" },
    Tuesday: { active: true, start: "08:00", end: "17:00" },
    Wednesday: { active: true, start: "08:00", end: "17:00" },
    Thursday: { active: true, start: "08:00", end: "17:00" },
    Friday: { active: true, start: "08:00", end: "17:00" },
    Saturday: { active: false, start: "09:00", end: "15:00" },
    Sunday: { active: false, start: "09:00", end: "15:00" }
  });
  
  // State for buffer time and advance booking
  const [bufferTime, setBufferTime] = useState("15");
  const [advanceBooking, setAdvanceBooking] = useState("30");
  const [maxFutureBooking, setMaxFutureBooking] = useState("90");

  // Toggle day availability
  const toggleDayAvailability = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        active: !prev[day as keyof typeof prev].active
      }
    }));
  };

  // Update time slots for a day
  const updateTimeSlot = (day: string, field: string, value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Save availability settings
  const saveAvailabilitySettings = () => {
    alert("Availability settings saved!");
    // In a real implementation, this would send the data to your backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Settings</CardTitle>
        <CardDescription>
          Set your working hours and booking preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Working Hours</h3>
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="w-24">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={availability[day as keyof typeof availability].active}
                      onCheckedChange={() => toggleDayAvailability(day)}
                      id={`${day}-active`}
                    />
                    <Label htmlFor={`${day}-active`}>{day}</Label>
                  </div>
                </div>
                
                {availability[day as keyof typeof availability].active ? (
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={availability[day as keyof typeof availability].start}
                        onValueChange={(value) => updateTimeSlot(day, 'start', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <SelectItem key={`start-${hour}`} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {`${hour.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>to</span>
                      <Select
                        value={availability[day as keyof typeof availability].end}
                        onValueChange={(value) => updateTimeSlot(day, 'end', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <SelectItem key={`end-${hour}`} value={`${hour.toString().padStart(2, '0')}:00`}>
                              {`${hour.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-muted-foreground">
                    Not Available
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="buffer-time">Buffer Time Between Bookings (minutes)</Label>
            <Select value={bufferTime} onValueChange={setBufferTime}>
              <SelectTrigger id="buffer-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No buffer</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Time needed between appointments for preparation.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="advance-booking">Minimum Advance Booking (hours)</Label>
            <Select value={advanceBooking} onValueChange={setAdvanceBooking}>
              <SelectTrigger id="advance-booking">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No minimum</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="12">12 hours</SelectItem>
                <SelectItem value="24">1 day</SelectItem>
                <SelectItem value="48">2 days</SelectItem>
                <SelectItem value="72">3 days</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How far in advance customers must book your services.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-future">Maximum Future Booking (days)</Label>
            <Select value={maxFutureBooking} onValueChange={setMaxFutureBooking}>
              <SelectTrigger id="max-future">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
                <SelectItem value="60">2 months</SelectItem>
                <SelectItem value="90">3 months</SelectItem>
                <SelectItem value="180">6 months</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How far in the future customers can book your services.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instant-booking">Instant Booking</Label>
            <div className="flex items-center space-x-2">
              <Switch id="instant-booking" defaultChecked />
              <span>Allow customers to book without approval</span>
            </div>
            <p className="text-xs text-muted-foreground">
              When disabled, you'll need to manually approve each booking.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vacation Mode</Label>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <h4 className="font-medium">Set Unavailable Period</h4>
              <p className="text-sm text-muted-foreground">
                Temporarily block all bookings during vacation or time off.
              </p>
            </div>
            <Button variant="outline">Set Vacation Dates</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={saveAvailabilitySettings}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
