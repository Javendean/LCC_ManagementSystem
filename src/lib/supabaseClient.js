import { createBrowserClient } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

/**
 * The Supabase client instance for interacting with the Supabase backend.
 *
 * This client is configured to work in a browser environment and uses
 * environment variables for the Supabase URL and anonymous key.
 *
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
