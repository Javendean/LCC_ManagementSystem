import { createBrowserClient } from '@supabase/ssr'
import { VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createBrowserClient(VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY)
