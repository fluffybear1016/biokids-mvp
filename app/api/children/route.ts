import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json({ error: 'Missing accountId' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('user_id', accountId);

    if (error) {
      console.error('Fetch children error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ children: data });
  } catch (error) {
    console.error('Fetch children error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 });
    }

    const { accountId, name, birthDate } = await request.json();

    if (!accountId || !name || !birthDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert child (bypasses RLS with service role key)
    const { data, error } = await supabase
      .from('children')
      .insert({
        user_id: accountId,
        name,
        birth_date: birthDate,
      })
      .select()
      .single();

    if (error) {
      console.error('Create child error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ child: data });
  } catch (error) {
    console.error('Create child error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
