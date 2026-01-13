import { NextResponse } from 'next/server';
import { getHumeAccessToken } from '@/utils/getHumeAccessToken';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const accessToken = await getHumeAccessToken();
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Failed to generate access token' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { accessToken },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate access token' },
      { status: 500 }
    );
  }
}
