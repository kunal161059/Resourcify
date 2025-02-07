import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: Request) {
  try {
    const { publicId, timestamp } = await request.json();

    // Validate inputs
    if (!publicId || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    
    if (!apiSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate signature
    const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash('sha1').update(str).digest('hex');

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 