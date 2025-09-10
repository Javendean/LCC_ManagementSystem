<!-- my-app/src/routes/signup/+page.svelte -->
<script>
  import { supabase } from '$lib/supabaseClient';

  let email = '';
  let password = '';
  let errorMessage = '';
  let successMessage = '';
  let loading = false;

  async function handleSignUp() {
    loading = true;
    errorMessage = '';
    successMessage = '';

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      successMessage = 'Success! Please check your email for a confirmation link.';

    } catch (error) {
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }
</script>

<main style="font-family: sans-serif; max-width: 400px; margin: 4rem auto;">
  <h1>Create Account</h1>
  <p>Sign up for a new account.</p>

  <form on:submit|preventDefault={handleSignUp}>
    <div style="margin-bottom: 1rem;">
      <label for="email" style="display: block; margin-bottom: 0.25rem;">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    <div style="margin-bottom: 1rem;">
      <label for="password" style="display: block; margin-bottom: 0.25rem;">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    {#if successMessage}
      <p style="color: green;">{successMessage}</p>
    {/if}

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    <button
      type="submit"
      disabled={loading}
      style="width: 100%; padding: 0.75rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      {loading ? 'Signing Up...' : 'Sign Up'}
    </button>
  </form>

  <p style="text-align: center; margin-top: 1rem;">
    Already have an account? <a href="/login">Log In</a>
  </p>
</main>
