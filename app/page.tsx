'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Registration
          </h1>
          <p className="text-gray-600 mb-8">
            Register for the event or scan QR codes
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/register"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register for Event
          </Link>

          <Link
            href="/scanner"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Scan QR Code
          </Link>
        </div>
      </div>
    </div>
  );
}