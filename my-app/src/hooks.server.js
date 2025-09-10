import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' })
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' })
        },
      }
    }
  )

  // securely get the user session
  const { data: { user } } = await event.locals.supabase.auth.getUser()
  const { data: { session } } = await event.locals.supabase.auth.getSession()

  event.locals.user = user
  event.locals.session = session

  const { pathname } = event.url

  const unauthenticatedPaths = ['/', '/login', '/signup', '/auth/callback'];

  // Protect routes
  if (!event.locals.user && !unauthenticatedPaths.includes(pathname)) {
    throw redirect(303, '/login');
  }

  if (event.locals.user && (pathname === '/login' || pathname === '/' || pathname === '/signup')) {
    throw redirect(303, '/contacts');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
