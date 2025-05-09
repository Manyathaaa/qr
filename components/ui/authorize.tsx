"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AuthorizePage = () => {
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const { eventId, userName } = router.query;

  useEffect(() => {
    if (eventId && userName) {
      setUserDetails({ name: userName });

      // Fetch event details from the backend
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
          setEventDetails(response.data);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };
      fetchEventDetails();
    }
  }, [eventId, userName]);

  const handleAuthorize = async () => {
    try {
      // Send the authorization to the backend
      await axios.post("http://localhost:5000/api/attendees", {
        name: userDetails.name,
        eventId: eventId,
      });
      setIsAuthorized(true);
    } catch (error) {
      console.error("Failed to authorize:", error);
    }
  };

  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Authorize Registration</h1>

      {/* Display Event and User Details */}
      {eventDetails && userDetails && (
        <div>
          <h2 className="text-xl font-semibold">{eventDetails.name}</h2>
          <p><strong>Date:</strong> {eventDetails.date}</p>
          <p><strong>Location:</strong> {eventDetails.location}</p>
          <p><strong>User:</strong> {userDetails.name}</p>
        </div>
      )}

      {/* Show Authorize Button */}
      <div className="mt-6">
        {isAuthorized ? (
          <p className="text-green-600">You have been successfully registered for the event!</p>
        ) : (
          <Button onClick={handleAuthorize}>Authorize</Button>
        )}
      </div>
    </div>
  );
};

export default AuthorizePage;
