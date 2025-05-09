export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, college, address, password } = body;

    // Check if user already exists
    const existingUser = await prisma.registration.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        college,
        address,
        password: hashedPassword,
      },
    });

    // Generate QR code data
    const qrData = JSON.stringify({ name, email, phone, college, address });

    // Store QR code data in the database
    const qrCode = await prisma.qrCode.create({
      data: {
        data: qrData,
      },
    });

    // Return success response with user data (excluding password)
    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        address: user.address,
      },
      qrCodeId: qrCode.id,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
