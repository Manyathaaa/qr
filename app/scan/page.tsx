import { QrScanner } from "@/components/qr-scanner";

export default function ScanPage() {
  return (
    <div className="container max-w-md py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Check-In</h1>
          <p className="text-muted-foreground mt-2">
            Scan attendee QR codes to check them in to the event
          </p>
        </div>
        <QrScanner />
      </div>
    </div>
  );
}