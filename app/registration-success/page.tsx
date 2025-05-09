'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCode } from '@/components/qr-code';
import Link from 'next/link';
import jsPDF from 'jspdf';
import QRCodeLib from 'qrcode';

interface RegistrationData {
  name: string;
  email: string;
  qrCodeId: string;
}

export default function RegistrationSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const qrCodeId = searchParams.get('qrCodeId');

    if (name && email && qrCodeId) {
      setRegistrationData({ name, email, qrCodeId });
    }
    setIsLoading(false);
  }, [searchParams]);

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qr-code-${registrationData?.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleDownloadPDF = async () => {
    if (!registrationData) return;

    try {
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Add title
      pdf.setFontSize(24);
      pdf.setTextColor(26, 26, 26);
      pdf.text('Registration Confirmation', pdf.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

      // Add subtitle
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text('Thank you for registering!', pdf.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

      // Add registration details
      pdf.setFontSize(16);
      pdf.setTextColor(26, 26, 26);
      pdf.text('Registration Details', 20, 60);

      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(`Name: ${registrationData.name}`, 20, 70);
      pdf.text(`Email: ${registrationData.email}`, 20, 80);

      // Add QR code section title
      pdf.setFontSize(16);
      pdf.setTextColor(26, 26, 26);
      pdf.text('Your QR Code', pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

      // Generate QR code
      const qrData = JSON.stringify({
        qrCodeId: registrationData.qrCodeId,
        name: registrationData.name,
        email: registrationData.email,
      });

      const qrImage = await QRCodeLib.toDataURL(qrData, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      // Add QR code to PDF
      const qrWidth = 50; // mm
      const qrHeight = 50; // mm
      const qrX = (pdf.internal.pageSize.getWidth() - qrWidth) / 2;
      const qrY = 110;
      pdf.addImage(qrImage, 'PNG', qrX, qrY, qrWidth, qrHeight);

      // Add instruction text
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text('Show this QR code at the event for check-in', pdf.internal.pageSize.getWidth() / 2, qrY + qrHeight + 10, { align: 'center' });

      // Save PDF
      pdf.save(`registration-${registrationData.name}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Data Not Found</h1>
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Return to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div ref={contentRef} className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for registering. Please save your QR code for check-in.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {registrationData.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {registrationData.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your QR Code</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <QRCode
                value={JSON.stringify({
                  qrCodeId: registrationData.qrCodeId,
                  name: registrationData.name,
                  email: registrationData.email,
                })}
                size={200}
              />
            </div>
            <button
              onClick={handleDownloadPDF}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Download Registration Details
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Show this QR code at the event for check-in
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Home
            </Link>
            <button
              onClick={() => router.push('/scanner')}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Scanner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 