<script>
  /**
   * The root layout component for the application.
   *
   * This component subscribes to Supabase authentication state changes and
   * invalidates the session when a change is detected, ensuring the UI is
   * always in sync with the user's authentication status.
   *
   * @property {import('./$types').LayoutData} data - The data for the layout, including the session.
   */
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabaseClient'
  import { invalidateAll } from '$app/navigation'

  export let data

  $: ({ session } = data)

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidateAll()
      }
    })

    return () => subscription.unsubscribe()
  })
</script>

<slot />
