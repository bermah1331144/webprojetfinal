import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'bd.json');
    // adapte si ton fichier est ailleurs
  const fileData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileData);

  const shuffled = data.items.sort(() => 0.5 - Math.random()).slice(0, 10);
  return NextResponse.json(shuffled);
}