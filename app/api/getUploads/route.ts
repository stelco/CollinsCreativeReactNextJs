import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Replace the deprecated config with the new method
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const uploadsDir = path.join(process.cwd(), 'public/customers');
    const files = await fs.readdir(uploadsDir);
    const images = files.filter((file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')).map((file) => `/customers/${file}`);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading customers directory:', error);
    return NextResponse.json({ error: 'Failed to read customers directory' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const uploadsDir = path.join(process.cwd(), 'public/customers');

  try {
    await fs.mkdir(uploadsDir, { recursive: true });

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadsDir, file.name);

    await fs.writeFile(filePath, new Uint8Array(buffer));

    return NextResponse.json({ message: 'File uploaded successfully', filePath: `/customers/${file.name}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}