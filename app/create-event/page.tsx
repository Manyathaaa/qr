"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/events", eventData);
      alert("Event Created Successfully!");
      console.log(response.data); // Optionally log the response from the API
    } catch (error) {
      alert("Failed to create event.");
      console.error(error);
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Event Name</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Description</label>
          <input
            type="text"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Location</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <Button type="submit" className="w-full">Create Event</Button>
      </form>
    </div>
  );
};

export default CreateEventPage;
