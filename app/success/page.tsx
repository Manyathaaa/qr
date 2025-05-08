"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCode } from "@/components/qr-code";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Attendee } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Save, Share2 } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  
  useEffect(() => {
    // In a real app, you would fetch this from the backend using the ID
    const stored = localStorage.getItem("eventRegistration");
    if (stored) {
      setAttendee(JSON.parse(stored));
    }
  }, []);
  
  if (!id) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Registration</h1>
        <p className="mb-6">No registration ID was provided.</p>
        <Button asChild>
          <Link href="/register">Register Now</Link>
        </Button>
      </div>
    );
  }
  
  if (!attendee) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Loading...</CardTitle>
            <CardDescription>
              Retrieving your registration details
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  const qrValue = JSON.stringify({
    id: attendee.id,
    name: attendee.name,
    email: attendee.email,
  });
  
  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Registration Successful!</CardTitle>
          <CardDescription className="text-center">
            Your event QR code is ready
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <QRCode value={qrValue} size={240} />
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">REGISTERED AS</h3>
            <p className="font-semibold text-xl">{attendee.name}</p>
            <p className="text-sm text-muted-foreground">{attendee.email}</p>
            <p className="text-sm text-muted-foreground">{attendee.phone}</p>
          </div>
          
          <Separator />
          
          <div className="bg-muted/50 p-4 rounded-lg text-sm">
            <p className="font-medium">Event Details</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>📅 April 15-16, 2025</li>
              <li>📍 Tech Conference Center, San Francisco</li>
              <li>⏰ Doors open at 8:30 AM</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}