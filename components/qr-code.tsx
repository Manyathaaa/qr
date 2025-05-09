"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  const [qrCodeSrc, setQrCodeSrc] = useState<string>("");

  useEffect(() => {
    // On the client, we'll load the QR code library dynamically
    const loadQRCode = async () => {
      try {
        const QRCodeStyling = (await import("qr-code-styling")).default;

        const qrCode = new QRCodeStyling({
          width: size,
          height: size,
          type: "svg",
          data: value,
          dotsOptions: {
            color: "currentColor",
            type: "rounded",
          },
          cornersSquareOptions: {
            type: "extra-rounded",
          },
          backgroundOptions: {
            color: "transparent",
          },
        });

        const rawData = await qrCode.getRawData("svg");
        if (rawData) {
          const blob =
            rawData instanceof Blob
              ? rawData
              : new Blob([rawData], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          setQrCodeSrc(url);

          // Clean up URL object when component unmounts
          return () => URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Failed to generate QR code:", error);
        // Fallback to a simple API-generated QR code
        setQrCodeSrc(
          `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
            value
          )}`
        );
      }
    };

    if (value) {
      loadQRCode();
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