import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load() {
  // Always redirect users from the root to the contacts page
  throw redirect(303, '/contacts');
}
