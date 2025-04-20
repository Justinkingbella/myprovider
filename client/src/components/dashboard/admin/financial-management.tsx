
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancialManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Management</CardTitle>
        <CardDescription>
          Manage platform commissions, pricing models, and promotions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          Financial management interface will be implemented here.
        </div>
      </CardContent>
    </Card>
  );
}
