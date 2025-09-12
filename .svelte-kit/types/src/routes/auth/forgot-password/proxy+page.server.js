// @ts-nocheck
/** */
export const actions = {
  default:/** @param {import('./$types').RequestEvent} event */  async ({ request, url, locals: { supabase } }) => {
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
