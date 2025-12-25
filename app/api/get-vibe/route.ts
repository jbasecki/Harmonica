import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    // Pulls the real data from your Postgres table
    const result = await sql`
      SELECT message, tiles, scene_id 
      FROM vibes 
      WHERE id = ${id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Vibe not found' }, { status: 404 });
    }

    const vibe = result.rows[0];
    
    return NextResponse.json({
      message: vibe.message,
      // Parse the tiles back into an array
      tiles: typeof vibe.tiles === 'string' ? JSON.parse(vibe.tiles) : vibe.tiles,
      scene_id: vibe.scene_id
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
