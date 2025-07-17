import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const session = await event.locals.getSession();

  if (!session && event.url.pathname !== '/login') {
    throw redirect(303, '/login');
  }

  if (session && event.url.pathname === '/login') {
    throw redirect(303, '/');
  }

  return resolve(event);
};