import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 });
    }

    const { userId, name, birthDate } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: 'Missing userId or name' }, { status: 400 });
    }

    // Upsert child record (one child per user for MVP)
    const { error } = await supabase
      .from('children')
      .upsert(
        {
          user_id: userId,
          name,
          birth_date: birthDate || null,
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      // If upsert fails (e.g. no unique constraint on user_id), try insert
      await supabase
        .from('children')
        .insert({ user_id: userId, name, birth_date: birthDate || null });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save child error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
