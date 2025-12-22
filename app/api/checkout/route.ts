import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15' as any,
});

export async function POST(req: Request) {
  try {
    const { message, tiles, sceneId } = await req.json();
    const id = uuidv4();

    // 1. Save to database FIRST
    try {
      await sql`
        INSERT INTO vibes (id, message, tiles, scene_id, paid)
        VALUES (${id}, ${message}, ${JSON.stringify(tiles)}, ${sceneId}, false)
      `;
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return NextResponse.json({ error: "Database failed to save vibe." }, { status: 500 });
    }

    // 2. Create Stripe Session SECOND
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1SgwZAJjJj9v8YFVKRZ9yWlx', // Verified ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Explicitly hardcoded to avoid "Processing Error"
      success_url: `https://vibe-letter-final-clean.vercel.app/success?id=${id}`,
      cancel_url: `https://vibe-letter-final-clean.vercel.app`,
      metadata: { vibeId: id },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
