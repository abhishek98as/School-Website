
import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content-loader';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('API Error fetching content:', error);
    return NextResponse.json({ message: 'Failed to load content' }, { status: 500 });
  }
}
