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

    // Saves the message to your new vibes table
    await sql`
      INSERT INTO vibes (id, message, tiles, scene_id, paid)
      VALUES (${id}, ${message}, ${JSON.stringify(tiles)}, ${sceneId}, false)
    `;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // MATCHED TO YOUR LIVE STRIPE ID
          price: 'price_1SgwZAJjJj9v8YFVKRZ9yWlx', 
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?id=${id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
      metadata: { vibeId: id },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
