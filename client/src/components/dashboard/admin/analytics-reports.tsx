
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Reports</CardTitle>
        <CardDescription>
          View detailed platform analytics and generate reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Analytics dashboard and reporting tools will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
