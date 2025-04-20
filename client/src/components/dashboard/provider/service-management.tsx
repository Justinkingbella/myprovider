
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Management</CardTitle>
        <CardDescription>
          Manage your service offerings and pricing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Service management interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
