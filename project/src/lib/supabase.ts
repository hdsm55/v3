/**
 * Public Supabase client for use in React components
 * This client uses the anon key and is safe to use in browser environments
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/$/, '');
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

let supabase: any;

// Create a mock client if Supabase is not configured
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase not configured. Using mock client for development.');
  
  // Create a mock Supabase client that won't break the app
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
  
  // Debug info in development
  if (import.meta.env.DEV) {
    console.log('✅ Supabase URL:', supabaseUrl);
    console.log('✅ Supabase KEY (first 12):', supabaseKey.slice(0, 12) + '…');
  }
}

export { supabase };