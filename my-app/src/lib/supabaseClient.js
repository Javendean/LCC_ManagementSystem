import { createBrowserClient } from '@supabase/ssr'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createBrowserClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
