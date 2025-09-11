import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase } }) {
  try {
    const { data: contacts, error: dbError } = await supabase
      .from('contacts')
      .select('*');

    if (dbError) {
      throw error(500, {
        message: 'Database Error: Could not fetch contacts.',
        devHelper: dbError.message,
      });
    }

    return {
      contacts: contacts ?? [],
    };
  } catch (err) {
    if (err instanceof Error) {
      throw error(500, {
        message: 'An unexpected error occurred.',
        devHelper: err.message,
      });
    }
    throw error(500, { message: 'An unexpected error occurred.' });
  }
}
