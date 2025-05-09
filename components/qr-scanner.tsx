"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, QrCode, RefreshCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Attendee } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import jsQR from "jsqr";

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
    if (!videoRef.current || !canvasRef.current || !scanning) {
      console.log('Scanning conditions not met:', {
        hasVideo: !!videoRef.current,
        hasCanvas: !!canvasRef.current,
        isScanning: scanning
      });
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.log('No canvas context available');
      return;
    }
    
    // Wait until video is loaded
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.log('Video not ready:', video.readyState);
      animationRef.current = requestAnimationFrame(scanQRCode);
      return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      console.log('Attempting to scan QR code...');
      // Get image data from canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Scan for QR code
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        console.log('QR code found:', code.data);
        // Found a QR code
        handleScanResult(code.data);
        return;
      } else {
        console.log('No QR code found in frame');
      }
      
      // Continue scanning if no QR code found
      if (scanning) {
        animationRef.current = requestAnimationFrame(scanQRCode);
      }
    } catch (error) {
      console.error("Error scanning QR code:", error);
      if (scanning) {
        animationRef.current = requestAnimationFrame(scanQRCode);
      }
    }
  };
  
  const handleScanResult = async (data: string) => {
    try {
      console.log('Raw QR code data:', data);
      
      let scannedData;
      try {
        // First try parsing as JSON
        scannedData = JSON.parse(data);
        console.log('Parsed as JSON:', scannedData);
      } catch (e) {
        // If that fails, try parsing the string directly
        console.log('Failed to parse as JSON, trying direct string');
        scannedData = data;
      }
      
      // If scannedData is a string, try parsing it as JSON again
      if (typeof scannedData === 'string') {
        try {
          scannedData = JSON.parse(scannedData);
          console.log('Parsed string as JSON:', scannedData);
        } catch (e) {
          console.log('Failed to parse string as JSON');
        }
      }
      
      console.log('Final scanned data:', scannedData);
      
      if (!scannedData.qrCodeId || !scannedData.name || !scannedData.email) {
        console.log('Missing required fields:', {
          hasQrCodeId: !!scannedData.qrCodeId,
          hasName: !!scannedData.name,
          hasEmail: !!scannedData.email,
          data: scannedData
        });
        setScanResult({
          success: false,
          message: "Invalid QR code format. Please try again."
        });
        return;
      }

      // Call the check-in API
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrCodeId: scannedData.qrCodeId,
          name: scannedData.name,
          email: scannedData.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setScanResult({
          success: true,
          message: `${scannedData.name} successfully checked in!`,
          attendee: {
            id: scannedData.qrCodeId,
            name: scannedData.name,
            email: scannedData.email,
            checkedIn: true
          }
        });
        
        toast({
          title: "Check-in successful!",
          description: `${scannedData.name} has been checked in.`,
        });
      } else {
        setScanResult({
          success: false,
          message: result.error || "Check-in failed. Please try again."
        });
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
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