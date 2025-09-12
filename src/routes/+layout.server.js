/**
 * Loads the session data for the layout.
 *
 * This function is executed on the server and makes the session object available
 * to all pages in the application.
 *
 * @param {import('./$types').LayoutServerLoadEvent} event - The SvelteKit load event.
 * @returns {Promise<{session: import('@supabase/supabase-js').Session | null}>} The session data.
 */
export const load = async ({ locals: { getSession } }) => {
  return {
    session: await getSession(),
  }
}
