"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Attendee } from "@/lib/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface AttendanceChartProps {
  attendees: Attendee[];
}

export function AttendanceChart({ attendees }: AttendanceChartProps) {
  // Group registrations by day
  const today = startOfDay(new Date());
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dateStr = format(date, "MMM dd");
    
    // Count registrations for this day
    const registrations = attendees.filter(a => {
      const regDate = startOfDay(new Date(a.registeredAt));
      return regDate.getTime() === date.getTime();
    }).length;
    
    // Count check-ins for this day
    const checkIns = attendees.filter(a => {
      if (!a.checkedIn || !a.checkedInAt) return false;
      const checkInDate = startOfDay(new Date(a.checkedInAt));
      return checkInDate.getTime() === date.getTime();
    }).length;
    
    return {
      name: dateStr,
      registrations,
      checkIns,
    };
  });
  
  return (
    <Card className="col-span-full border-none shadow-md">
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>
          Registration and check-in activity for the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={last7Days}>
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`} 
            />
            <Tooltip />
            <Bar dataKey="registrations" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="checkIns" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}