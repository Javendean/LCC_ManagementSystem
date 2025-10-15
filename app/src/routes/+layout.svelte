<script>
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
