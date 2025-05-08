"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, QrCode, RefreshCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { attendees } from "@/lib/data";
import { Attendee } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { success: boolean; message: string; attendee?: Attendee }>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        setScanResult(null);
        scanQRCode();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
    }
  };
  
  const stopScanner = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setScanning(false);
  };
  
  const scanQRCode = async () => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Wait until video is loaded
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationRef.current = requestAnimationFrame(scanQRCode);
      return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Include QR code detection logic here
      // For this demo, we'll simulate a successful scan after a delay
      
      // In a real app, you would use a library like jsQR:
      // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      // const code = jsQR(imageData.data, imageData.width, imageData.height);
      // if (code) { handle code.data }
      
      // Simulate scanning process
      if (scanning) {
        setTimeout(() => {
          // Simulate finding a valid QR code
          const fakeQrData = JSON.stringify({
            id: "att_3", // This ID matches one of our sample attendees
            name: "Emily Johnson",
            email: "emily.johnson@example.com"
          });
          
          handleScanResult(fakeQrData);
        }, 2000);
      }
    } catch (error) {
      console.error("Error scanning QR code:", error);
    }
  };
  
  const handleScanResult = (data: string) => {
    try {
      // Parse the QR code data
      const scannedData = JSON.parse(data);
      
      // Find the attendee in our data
      const foundAttendee = attendees.find(a => a.id === scannedData.id);
      
      if (foundAttendee) {
        if (foundAttendee.checkedIn) {
          // Already checked in
          setScanResult({
            success: true,
            message: `${foundAttendee.name} is already checked in.`,
            attendee: foundAttendee
          });
        } else {
          // Valid attendee, not checked in yet
          setScanResult({
            success: true,
            message: `${foundAttendee.name} successfully checked in!`,
            attendee: foundAttendee
          });
          
          toast({
            title: "Check-in successful!",
            description: `${foundAttendee.name} has been checked in.`,
          });
        }
      } else {
        // QR code valid but attendee not found
        setScanResult({
          success: false,
          message: "Attendee not found in the system."
        });
      }
    } catch (error) {
      // Invalid QR code
      setScanResult({
        success: false,
        message: "Invalid QR code. Please try again."
      });
    }
    
    stopScanner();
  };
  
  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      stopScanner();
    };
  }, []);
  
  if (!hasCamera) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Camera Error</AlertTitle>
        <AlertDescription>
          Unable to access the camera. Please ensure you've granted camera permissions and are using a device with a camera.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Check-In Scanner
        </CardTitle>
        <CardDescription>
          Scan attendee QR codes to check them in
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full max-w-md aspect-square bg-muted rounded-lg overflow-hidden mb-4">
          {scanning ? (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover" 
                playsInline 
              />
              <canvas 
                ref={canvasRef} 
                className="invisible absolute" 
              />
              <div className="absolute inset-0 border-4 border-primary/50 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            </>
          ) : scanResult ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              {scanResult.success ? (
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              ) : (
                <AlertCircle className="h-16 w-16 text-destructive mb-4" />
              )}
              <h3 className="text-xl font-semibold mb-2">
                {scanResult.success ? "Success!" : "Error"}
              </h3>
              <p className="text-muted-foreground">{scanResult.message}</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <QrCode className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-center">
                Press the button below to start scanning
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {scanning ? (
          <Button variant="outline" onClick={stopScanner}>
            Cancel Scan
          </Button>
        ) : scanResult ? (
          <Button onClick={() => {
            setScanResult(null);
            startScanner();
          }} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Scan Another
          </Button>
        ) : (
          <Button onClick={startScanner} className="gap-2">
            <QrCode className="h-4 w-4" />
            Start Scanning
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}