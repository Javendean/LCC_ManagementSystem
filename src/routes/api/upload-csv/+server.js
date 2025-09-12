import { json, error } from '@sveltejs/kit';
import Papa from 'papaparse';

/**
 * Handles POST requests to upload a CSV file of contacts.
 * It parses the CSV, validates the data, and upserts the contacts into the database.
 *
 * @param {object} params
 * @param {import('@sveltejs/kit').RequestEvent['request']} params.request - The request object.
 * @param {import('@sveltejs/kit').RequestEvent['locals']} params.locals - The locals object.
 * @returns {Promise<Response>} A JSON response indicating success and the number of contacts added, or an error.
 */
export async function POST({ request, locals: { supabase, user } }) {
  if (!user) {
    throw error(401, { message: 'Unauthorized' });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    throw error(400, { message: 'No file uploaded' });
  }

  const csv = await file.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const contacts = results.data.map((row) => ({
            first_name: row['First Name'],
            last_name: row['Last Name'],
            phone_number: row['Phone Number'],
            user_id: user.id,
          }));

          const { error: dbError } = await supabase
            .from('contacts')
            .upsert(contacts);

          if (dbError) {
            throw error(500, { message: dbError.message });
          }

          resolve(json({ success: true, count: contacts.length }));
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => {
        reject(error(400, { message: err.message }));
      },
    });
  });
}
