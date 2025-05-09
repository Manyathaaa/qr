'use client';

import { useEffect, useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      try {
        const data = JSON.parse(detectedCodes[0].rawValue);
        if (!data.id) {
          setError('Invalid QR code format');
          return;
        }

        const response = await fetch('/api/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            qrCodeId: data.id,
            name: data.name,
            email: data.email
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.error || 'Check-in failed');
          return;
        }

        setSuccess(`Successfully checked in ${data.name}`);
        setScanResult(detectedCodes[0].rawValue);
      } catch (err) {
        setError('Failed to process QR code');
      }
    }
  };

  const handleError = (error: unknown) => {
    setError(error instanceof Error ? error.message : 'An error occurred');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                QR Code Scanner
              </h1>
              <p className="text-gray-600">
                Scan a QR code to check in a participant
              </p>
            </div>

            <div className="aspect-square max-w-md mx-auto mb-8">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{ facingMode: 'environment' }}
                classNames={{ container: 'w-full h-full' }}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-4">
                {success}
              </div>
            )}

            {scanResult && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Scan Result
                </h2>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(JSON.parse(scanResult), null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 