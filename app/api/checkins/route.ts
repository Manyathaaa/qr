import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const checkIns = await prisma.checkIn.findMany({
      orderBy: {
        checkedInAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      checkIns,
    });
  } catch (error) {
    console.error('Failed to fetch check-ins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch check-ins' },
      { status: 500 }
    );
  }
} 