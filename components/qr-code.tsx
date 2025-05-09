"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import QRCodeLib from "qrcode";

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        console.log('Generating QR code with value:', value);
        console.log('Value type:', typeof value);
        
        // Ensure value is a string
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        console.log('String value:', stringValue);
        
        const qrDataUrl = await QRCodeLib.toDataURL(stringValue, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        setQrCodeSrc(qrDataUrl);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    };

    if (value) {
      generateQRCode();
    }
  }, [value, size]);

  return (
    <Card className="flex items-center justify-center p-4 w-fit mx-auto">
      {qrCodeSrc ? (
        <img
          src={qrCodeSrc}
          alt="QR Code"
          className="dark:invert"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="animate-pulse bg-muted rounded-md"
          style={{ width: size, height: size }}
        />
      )}
    </Card>
  );
}