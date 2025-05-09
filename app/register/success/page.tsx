'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { PrismaClient } from '@prisma/client';

interface UserData {
  name: string;
  email: string;
  phone: string;
  college: string;
  address: string;
}

interface QRCodeData {
  id: string;
  checkedIn: boolean;
  checkedInAt: string | null;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setUserData(parsedData.user);
        setQrCodeData(parsedData.qrCode);
      } catch (err) {
        setError('Invalid data format');
      }
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!userData || !qrCodeData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h1>
              <p className="text-gray-600 mb-8">
                Your QR code has been generated successfully.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Registration Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-gray-900">{userData.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-gray-900">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      College
                    </label>
                    <p className="mt-1 text-gray-900">{userData.college}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <p className="mt-1 text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your QR Code
                </h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <QRCodeSVG
                    value={JSON.stringify({
                      id: qrCodeData.id,
                      ...userData,
                    })}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    <span
                      className={`font-semibold ${
                        qrCodeData.checkedIn
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {qrCodeData.checkedIn ? 'Checked In' : 'Not Checked In'}
                    </span>
                  </p>
                  {qrCodeData.checkedInAt && (
                    <p className="text-sm text-gray-600 mt-1">
                      Checked in at:{' '}
                      {new Date(qrCodeData.checkedInAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 