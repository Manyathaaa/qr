"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { AttendeeTable } from "@/components/dashboard/attendee-table";

const DashboardPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the list of events when the page loads
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventId = event.target.value;
    setSelectedEvent(selectedEventId);

    // Fetch event details
    const selectedEventData = events.find((event) => event.id === selectedEventId);
    setEventDetails(selectedEventData);

    // Fetch attendees for the selected event
    try {
      const response = await axios.get(`http://localhost:5000/api/attendees/${selectedEventId}`);
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Event Dashboard</h1>
        <p className="text-muted-foreground">
          Manage event attendees and track check-ins
        </p>
      </div>

      {/* Event Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="event-select" className="block text-sm font-medium">Select Event</label>
        <select
          id="event-select"
          onChange={handleEventChange}
          className="w-full p-2 mt-2 border rounded-md"
        >
          <option value="">--Select an Event--</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Event Details */}
      {eventDetails && (
        <div className="event-details mb-6">
          <h3 className="text-xl font-semibold">{eventDetails.name}</h3>
          <p><strong>Date:</strong> {eventDetails.date}</p>
          <p><strong>Location:</strong> {eventDetails.location}</p>
          <p><strong>Description:</strong> {eventDetails.description}</p>
        </div>
      )}

      {/* Stats Cards, Attendance Chart, and Attendee Table Components */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <StatsCards attendees={attendees} />
        <AttendanceChart attendees={attendees} />
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Attendees</h2>
        <AttendeeTable attendees={attendees} />
      </div>

      {/* Event Registration Button */}
      <div className="mt-6">
        <Button onClick={() => alert("You have registered for the event!")}>
          Register for Event
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
