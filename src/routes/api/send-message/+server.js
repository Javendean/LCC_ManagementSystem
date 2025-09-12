import { json, error } from '@sveltejs/kit';
import twilio from 'twilio';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from '$env/static/private';

/**
 * The Twilio client instance.
 * @type {import('twilio').Twilio}
 */
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Handles POST requests to send SMS messages.
 *
 * @param {object} params
 * @param {import('@sveltejs/kit').RequestEvent['request']} params.request - The request object.
 * @param {import('@sveltejs/kit').RequestEvent['locals']} params.locals - The locals object.
 * @returns {Promise<Response>} A JSON response indicating success or an error.
 */
export async function POST({ request, locals: { user } }) {
  if (!user) {
    throw error(401, { message: 'Unauthorized' });
  }

  const { message, contacts } = await request.json();

  if (!message || !contacts || contacts.length === 0) {
    throw error(400, { message: 'Invalid request' });
  }

  try {
    const promises = contacts.map((contact) => {
      return client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: contact.phone_number,
      });
    });

    await Promise.all(promises);

    return json({ success: true });
  } catch (err) {
    console.error(err);
    throw error(500, { message: 'Failed to send message' });
  }
}
