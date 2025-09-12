<script>
  /**
   * @component Layout
   * @description The root layout component for the application. It handles Supabase auth state changes.
   * @props {object} data - The data object from the server.
   * @props {import('@supabase/supabase-js').Session | null} data.session - The user's session.
   */
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { invalidateAll, goto } from '$app/navigation';

  export let data;

  $: ({ session } = data);

  /**
   * onMount lifecycle function.
   * Sets up a listener for Supabase authentication state changes.
   * This listener handles session updates and password recovery redirects.
   */
  onMount(() => {
    console.log('Layout mounted, setting up onAuthStateChange listener.');

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('onAuthStateChange event:', event, newSession);

      if (event === 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY event detected, redirecting...');
        goto('/auth/update-password');
      }

      if (newSession?.expires_at !== session?.expires_at) {
        console.log('Session expired or changed, invalidating...');
        invalidateAll();
      }
    });

    return () => {
      console.log('Layout unmounted, unsubscribing from onAuthStateChange.');
      subscription.unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>LCC Management System</title>
</svelte:head>

<slot />
