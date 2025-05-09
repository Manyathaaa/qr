"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";  // Correct import for QRCodeCanvas

const EventRegistrationPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  // Fetch events from the backend
  useEffect(() => {
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

  // Handle event selection and generate the QR code URL
  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventId = e.target.value;
    setSelectedEvent(selectedEventId);

   if (selectedEventId) {
      // Hardcoded URL with a fixed name "Rakesh"
      const registrationUrl = `http://localhost:3000/authorize?eventId=${selectedEventId}&userName=${attendeeData.name}`;
      console.log("Generated URL:", registrationUrl);  // Debugging URL
      setQrCodeData(registrationUrl);  // Set QR code data to the generated URL
    }
  };

  // Handle input changes in the registration form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttendeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for registering the user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/attendees", {
        ...attendeeData,
        eventId: selectedEvent,
      });
      alert("Registration Successful!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to register.");
      console.error(error);
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Event Registration</h1>

      {/* Event Selection */}
      <div>
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

      {/* Attendee Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={attendeeData.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={attendeeData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={attendeeData.phone}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <Button type="submit" className="w-full">Register</Button>
      </form>

      {/* Display QR Code for the selected event */}
      {qrCodeData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Scan QR Code to Register</h2>
          <QRCodeCanvas value={qrCodeData} size={512} />
        </div>
      )}
    </div>
  );
};

export default EventRegistrationPage;
