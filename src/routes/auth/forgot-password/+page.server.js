import { supabase } from '$lib/supabaseClient.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, url }) => {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return { error: 'Email is required.' };
    }

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/auth/update-password`,
    });

    if (authError) {
      return { error: authError.message };
    }

    return { success: true };
  },
};