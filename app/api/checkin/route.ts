import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { qrCodeId, name, email } = await req.json();

    if (!qrCodeId || !name || !email) {
      return NextResponse.json(
        { error: 'QR code ID, name, and email are required' },
        { status: 400 }
      );
    }

    // Find the QR code
    const qrCode = await prisma.qrCode.findUnique({
      where: { id: qrCodeId },
    });

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code not found' },
        { status: 404 }
      );
    }

    if (qrCode.checkedIn) {
      return NextResponse.json(
        { error: 'QR code already checked in' },
        { status: 400 }
      );
    }

    // Create check-in record and update QR code in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const checkIn = await tx.checkIn.create({
        data: {
          name,
          email,
          qrCodeId,
        },
      });

      const updatedQrCode = await tx.qrCode.update({
        where: { id: qrCodeId },
        data: {
          checkedIn: true,
          checkedInAt: new Date(),
        },
      });

      return { checkIn, qrCode: updatedQrCode };
    });

    return NextResponse.json({
      success: true,
      checkIn: result.checkIn,
      qrCode: result.qrCode,
    });
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Check-in failed' },
      { status: 500 }
    );
  }
} 