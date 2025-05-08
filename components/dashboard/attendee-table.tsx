"use client";

import { format } from "date-fns";
import { Attendee } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCheck, MoreHorizontal, UserCheck } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AttendeeTableProps {
  attendees: Attendee[];
}

export function AttendeeTable({ attendees: initialAttendees }: AttendeeTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
  const { toast } = useToast();
  
  const filteredAttendees = attendees.filter(
    attendee => 
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCheckIn = (id: string) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === id 
        ? { 
            ...attendee, 
            checkedIn: true, 
            checkedInAt: new Date().toISOString() 
          } 
        : attendee
    ));
    
    toast({
      title: "Attendee checked in",
      description: "The attendee has been successfully checked in.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search attendees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No attendees found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell className="font-medium">{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>
                    {format(new Date(attendee.registeredAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {attendee.checkedIn ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCheck className="mr-1 h-3 w-3" />
                        Checked In
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Checked In</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleCheckIn(attendee.id)}
                          disabled={attendee.checkedIn}
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Check In
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Send Reminder
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}