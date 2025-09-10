<script>
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabaseClient'
  import { invalidateAll, goto } from '$app/navigation'

  export let data

  $: ({ session } = data)

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
        invalidateAll()
      }
    })

    return () => {
      console.log('Layout unmounted, unsubscribing from onAuthStateChange.');
      subscription.unsubscribe()
    }
  })
</script>

<slot />