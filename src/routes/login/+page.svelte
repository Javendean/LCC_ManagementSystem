<!-- src/routes/login/+page.svelte -->
<script>
  /**
   * @component LoginPage
   * @description The Svelte component for the login page.
   * It provides a form for users to sign in.
   */
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let errorMessage = '';
  let loading = false;

  /**
   * Handles the user login process.
   * It calls the Supabase `signInWithPassword` method and handles success and error cases.
   */
  async function handleLogin() {
    loading = true;
    errorMessage = '';
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // On successful login, SvelteKit's hooks will handle the redirect.
      goto('/contacts');
    } catch (error) {
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }
</script>

<main style="font-family: sans-serif; max-width: 400px; margin: 4rem auto;">
  <h1>Login</h1>
  <p>Please sign in to continue.</p>

  <form on:submit|preventDefault={handleLogin}>
    <div style="margin-bottom: 1rem;">
      <label for="email" style="display: block; margin-bottom: 0.25rem;"
        >Email</label
      >
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    <div style="margin-bottom: 1rem;">
      <label for="password" style="display: block; margin-bottom: 0.25rem;"
        >Password</label
      >
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    <button
      type="submit"
      disabled={loading}
      style="width: 100%; padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      {loading ? 'Loading...' : 'Log In'}
    </button>
    <div style="text-align: center; margin-top: 1rem;">
      <a
        href="/auth/forgot-password"
        style="color: #007bff; text-decoration: none;">Forgot Password?</a
      >
    </div>
  </form>
</main>
