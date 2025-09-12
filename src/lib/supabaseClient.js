import { createBrowserClient } from '@supabase/ssr';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

/**
 * Supabase client instance for browser-side interactions.
 * It is initialized with the public Supabase URL and anonymous key.
 *
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createBrowserClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
);
