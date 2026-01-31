import { createClient } from './supabase';

const SESSION_STORAGE_KEY = 'biokids_session';

export const SESSION_KICKED_MESSAGE =
  "Your session ended because your account was accessed from another device. If this wasn't you, please change your password.";

export function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server';

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 'unknown',
  ].join('|');

  // Simple hash
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function getStoredSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_STORAGE_KEY);
}

export function storeSessionToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_STORAGE_KEY, token);
  }
}

export function clearSessionToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export async function createSession(userId: string): Promise<string> {
  const supabase = createClient();
  const sessionToken = crypto.randomUUID();
  const fingerprint = generateDeviceFingerprint();

  // Insert new session
  await supabase.from('user_sessions').insert({
    user_id: userId,
    session_token: sessionToken,
    device_fingerprint: fingerprint,
    user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
    is_active: true,
  });

  // Invalidate other sessions
  await supabase.rpc('invalidate_other_sessions', {
    p_user_id: userId,
    p_new_token: sessionToken,
  });

  storeSessionToken(sessionToken);

  return sessionToken;
}

export async function validateSession(): Promise<{ valid: boolean; kicked: boolean }> {
  const storedToken = getStoredSessionToken();

  if (!storedToken) {
    return { valid: false, kicked: false };
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_sessions')
    .select('is_active')
    .eq('session_token', storedToken)
    .single();

  if (error || !data) {
    clearSessionToken();
    return { valid: false, kicked: false };
  }

  if (!data.is_active) {
    clearSessionToken();
    return { valid: false, kicked: true };
  }

  // Update last_active_at
  await supabase
    .from('user_sessions')
    .update({ last_active_at: new Date().toISOString() })
    .eq('session_token', storedToken);

  return { valid: true, kicked: false };
}

export async function invalidateSession(): Promise<void> {
  const storedToken = getStoredSessionToken();

  if (storedToken) {
    const supabase = createClient();
    await supabase
      .from('user_sessions')
      .update({ is_active: false })
      .eq('session_token', storedToken);
  }

  clearSessionToken();
}
