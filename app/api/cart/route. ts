import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify/mutations/cart';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lines } = body;
    const cart = await createCart(lines);
    return NextResponse.json({ cart });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}