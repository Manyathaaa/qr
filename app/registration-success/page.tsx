"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface RegistrationDetails {
  name: string;
  email: string;
  phone: string;
  college: string;
  address: string;
}

export default function RegistrationSuccessPage() {
  const [details, setDetails] = useState<RegistrationDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const registrationData = localStorage.getItem("registrationData");
      
      if (!registrationData) {
        router.push("/"); // Redirect to home if no data
        return;
      }

      const parsedData = JSON.parse(registrationData);
      setDetails(parsedData);
    } catch (error) {
      console.error("Error loading registration data:", error);
      router.push("/"); // Redirect to home if error
    }
  }, [router]);

  if (!details) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Registration Successful!</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Registration Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{details.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{details.email}</p>
            </div>
            <div>
              <label className="font-semibold">Phone:</label>
              <p>{details.phone}</p>
            </div>
            <div>
              <label className="font-semibold">College:</label>
              <p>{details.college}</p>
            </div>
            <div>
              <label className="font-semibold">Address:</label>
              <p>{details.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-8">
            <QRCodeSVG 
              value={JSON.stringify(details)} 
              size={256}
              level="H"
              includeMargin
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 