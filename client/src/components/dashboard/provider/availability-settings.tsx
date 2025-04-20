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