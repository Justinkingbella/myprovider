
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
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, CheckSquare, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const amPm = i < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${amPm}`;
});

export default function AvailabilitySettings() {
  const [workingDays, setWorkingDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });
  
  const [workingHours, setWorkingHours] = useState({
    Monday: { start: "9:00 AM", end: "5:00 PM" },
    Tuesday: { start: "9:00 AM", end: "5:00 PM" },
    Wednesday: { start: "9:00 AM", end: "5:00 PM" },
    Thursday: { start: "9:00 AM", end: "5:00 PM" },
    Friday: { start: "9:00 AM", end: "5:00 PM" },
    Saturday: { start: "10:00 AM", end: "2:00 PM" },
    Sunday: { start: "10:00 AM", end: "2:00 PM" },
  });
  
  const [breakTimes, setBreakTimes] = useState([
    { day: "Monday", start: "12:00 PM", end: "1:00 PM" },
    { day: "Tuesday", start: "12:00 PM", end: "1:00 PM" },
    { day: "Wednesday", start: "12:00 PM", end: "1:00 PM" },
    { day: "Thursday", start: "12:00 PM", end: "1:00 PM" },
    { day: "Friday", start: "12:00 PM", end: "1:00 PM" },
  ]);
  
  const [unavailableDates, setUnavailableDates] = useState([
    { date: "2023-07-24", reason: "Personal Leave" },
    { date: "2023-08-15", reason: "Public Holiday" },
  ]);
  
  const toggleWorkDay = (day) => {
    setWorkingDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  
  const updateWorkingHours = (day, field, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  const addBreakTime = () => {
    setBreakTimes(prev => [
      ...prev,
      { day: "Monday", start: "12:00 PM", end: "1:00 PM" }
    ]);
  };
  
  const removeBreakTime = (index) => {
    setBreakTimes(prev => prev.filter((_, i) => i !== index));
  };
  
  const updateBreakTime = (index, field, value) => {
    setBreakTimes(prev => 
      prev.map((breakTime, i) => 
        i === index ? { ...breakTime, [field]: value } : breakTime
      )
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="working-hours" className="space-y-4">
        <TabsList>
          <TabsTrigger value="working-hours">Working Hours</TabsTrigger>
          <TabsTrigger value="breaks">Break Times</TabsTrigger>
          <TabsTrigger value="unavailable">Time Off</TabsTrigger>
        </TabsList>
        
        <TabsContent value="working-hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Working Hours
              </CardTitle>
              <CardDescription>
                Set your regular working hours for each day of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={workingDays[day]} 
                        onCheckedChange={() => toggleWorkDay(day)}
                        id={`workday-${day}`}
                      />
                      <Label htmlFor={`workday-${day}`} className="min-w-[100px] font-medium">{day}</Label>
                    </div>
                    
                    {workingDays[day] ? (
                      <div className="flex items-center gap-2">
                        <Select 
                          value={workingHours[day].start} 
                          onValueChange={(value) => updateWorkingHours(day, 'start', value)}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">to</span>
                        <Select 
                          value={workingHours[day].end} 
                          onValueChange={(value) => updateWorkingHours(day, 'end', value)}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not Working</span>
                    )}
                  </div>
                ))}
                
                <Button className="mt-4" variant="outline">Apply to All Days</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="breaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Break Times
              </CardTitle>
              <CardDescription>
                Set regular break times during your working hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {breakTimes.map((breakTime, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <Select 
                      value={breakTime.day} 
                      onValueChange={(value) => updateBreakTime(index, 'day', value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map((day) => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center gap-2">
                      <Select 
                        value={breakTime.start} 
                        onValueChange={(value) => updateBreakTime(index, 'start', value)}
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-muted-foreground">to</span>
                      <Select 
                        value={breakTime.end} 
                        onValueChange={(value) => updateBreakTime(index, 'end', value)}
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeBreakTime(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addBreakTime} variant="outline" className="w-full">
                  Add Break Time
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unavailable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Unavailable Dates
              </CardTitle>
              <CardDescription>
                Mark dates when you will not be available for bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unavailableDates.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{new Date(item.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}</div>
                      <div className="text-sm text-muted-foreground">{item.reason}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Add Unavailable Date
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Booking Preferences</CardTitle>
          <CardDescription>
            Configure additional settings for how clients can book your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Advance Notice</h4>
                <p className="text-sm text-muted-foreground">Minimum time before a booking can be made</p>
              </div>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6h">6 hours</SelectItem>
                  <SelectItem value="12h">12 hours</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="48h">2 days</SelectItem>
                  <SelectItem value="72h">3 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Booking Window</h4>
                <p className="text-sm text-muted-foreground">How far in advance clients can book</p>
              </div>
              <Select defaultValue="60d">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="60d">60 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                  <SelectItem value="180d">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Booking Confirmations</h4>
                <p className="text-sm text-muted-foreground">Automatically confirm bookings</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Buffer Time</h4>
                <p className="text-sm text-muted-foreground">Time between appointments</p>
              </div>
              <Select defaultValue="30m">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0m">None</SelectItem>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="60m">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4">
              <Button className="w-full">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
