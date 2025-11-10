import { NextResponse } from 'next/server';
import { generateNextPoint } from '../../../lib/dataGenerator';

export async function GET() {
  const next = generateNextPoint(Date.now());
  return NextResponse.json(next);
}
