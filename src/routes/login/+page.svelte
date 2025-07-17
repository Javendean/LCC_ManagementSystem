<script>
  import { Auth } from '@supabase/auth-ui-svelte';
  import { supabaseClient } from '$lib/supabaseClient';
</script>

<div class="flex justify-center items-center h-screen">
  <div class="w-full max-w-md">
    <Auth
      supabaseClient={supabaseClient}
      view="sign_in"
      appearance={{
        theme: 'dark'
      }}
    />
  </div>
</div>