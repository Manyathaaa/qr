import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, UserPlus, Users } from "lucide-react";
import { Attendee } from "@/lib/types";

interface StatsCardsProps {
  attendees: Attendee[];
}

export function StatsCards({ attendees }: StatsCardsProps) {
  const totalRegistered = attendees.length;
  const checkedIn = attendees.filter(a => a.checkedIn).length;
  const notCheckedIn = totalRegistered - checkedIn;
  const checkedInPercentage = totalRegistered > 0 
    ? Math.round((checkedIn / totalRegistered) * 100) 
    : 0;
    
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRegistered}</div>
          <p className="text-xs text-muted-foreground">Registered attendees</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Checked In</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{checkedIn}</div>
          <p className="text-xs text-muted-foreground">
            {checkedInPercentage}% of total attendees
          </p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Not Checked In</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notCheckedIn}</div>
          <p className="text-xs text-muted-foreground">
            {totalRegistered - checkedIn} remaining attendees
          </p>
        </CardContent>
      </Card>
    </div>
  );
}