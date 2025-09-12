import { supabase } from '$lib/supabaseClient.js';
import { error } from '@sveltejs/kit';

/**
 * Loads the contacts from the database for the contacts page.
 *
 * This function is executed on the server and fetches all contacts from the
 * Supabase database.
 *
 * @param {import('./$types').PageServerLoadEvent} event - The SvelteKit load event.
 * @returns {Promise<{contacts: import('$lib/types').Contact[]}>} The contacts data.
 */
export async function load() {
    try {
        const { data: contacts, error: dbError } = await supabase.from('contacts').select('*');

        if (dbError) {
            throw error(500, {
                message: 'Database Error: Could not fetch contacts.',
                devHelper: dbError.message
            });
        }

        return {
            contacts: contacts ?? []
        };
    } catch (err) {
        if (err instanceof Error) {
            throw error(500, { message: 'An unexpected error occurred.', devHelper: err.message });
        }
        throw error(500, { message: 'An unexpected error occurred.' });
    }
}