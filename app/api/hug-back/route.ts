import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Updates the database to record the "Hug Back"
    await sql`
      UPDATE vibes 
      SET message = message || ' (They sent a hug back! ❤️)' 
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
