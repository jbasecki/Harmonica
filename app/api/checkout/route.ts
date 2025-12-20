import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { message, tiles, sceneId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { 
            name: 'Digital Vibe Gift',
            description: 'A custom symmetrical alphabet greeting' 
          },
          unit_amount: 99, 
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?msg=${encodeURIComponent(message)}&tiles=${encodeURIComponent(tiles)}&scene=${sceneId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe Backend Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
