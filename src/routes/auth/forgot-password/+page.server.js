/**
 * The server-side actions for the forgot password page.
 * @type {import('./$types').Actions}
 */
export const actions = {
  /**
   * The default action for the forgot password form.
   * It sends a password reset email to the user.
   *
   * @param {object} params
   * @param {import('@sveltejs/kit').RequestEvent['request']} params.request - The request object.
   * @param {import('@sveltejs/kit').RequestEvent['url']} params.url - The URL object.
   * @param {import('@sveltejs/kit').RequestEvent['locals']} params.locals - The locals object.
   * @returns {Promise<{error: string} | {success: boolean}>} - An object with an error message or a success flag.
   */
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return { error: 'Email is required.' };
    }

    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${url.origin}/auth/update-password`,
      },
    );

    if (authError) {
      return { error: authError.message };
    }

    return { success: true };
  },
};
