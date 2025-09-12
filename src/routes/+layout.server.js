/**
 * @type {import('./$types').LayoutServerLoad}
 */
export const load = async ({ locals: { session, user } }) => {
  return {
    session,
    user,
  };
};
