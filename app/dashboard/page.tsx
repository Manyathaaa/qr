import { attendees } from "@/lib/data";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { AttendeeTable } from "@/components/dashboard/attendee-table";

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Event Dashboard</h1>
        <p className="text-muted-foreground">
          Manage event attendees and track check-ins
        </p>
      </div>
      
      <StatsCards attendees={attendees} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <AttendanceChart attendees={attendees} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Attendees</h2>
        <AttendeeTable attendees={attendees} />
      </div>
    </div>
  );
}