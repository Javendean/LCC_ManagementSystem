import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
import { VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    VITE_PUBLIC_SUPABASE_URL,
    VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' })
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' })
        },
      },
    }
  )

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  const session = await event.locals.getSession()
  const { pathname } = event.url

  if (!session && pathname !== '/login') {
    throw redirect(303, '/login');
  }

  if (session && (pathname === '/login' || pathname === '/')) {
    throw redirect(303, '/contacts');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
