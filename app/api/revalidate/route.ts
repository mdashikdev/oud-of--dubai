import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const topic = body.topic || '';

    if (topic.includes('PRODUCT')) {
      revalidatePath('/shop', 'layout');
      revalidatePath('/product/[handle]', 'layout');
    }
    if (topic.includes('COLLECTION')) {
      revalidatePath('/shop', 'layout');
      revalidatePath('/shop/[category]', 'layout');
    }

    return NextResponse.json({ revalidated: true, topic });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}