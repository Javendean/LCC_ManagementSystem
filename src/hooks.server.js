import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
// IMPORTANT: Import from the 'private' module now
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

/**
 * The main SvelteKit hook for handling requests on the server.
 *
 * This hook initializes the Supabase client, manages session data, and enforces
 * authentication by redirecting users based on their session status and the
 * requested path.
 *
 * @param {import('@sveltejs/kit').Handle} event - The SvelteKit handle event.
 * @returns {Promise<Response>} The response to the request.
 */
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
