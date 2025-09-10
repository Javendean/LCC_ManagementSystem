<!-- src/routes/auth/update-password/+page.svelte -->
<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let successMessage = '';
  let loading = false;

  async function handleUpdatePassword() {
    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match.';
      return;
    }
    if (password.length < 6) {
        errorMessage = 'Password must be at least 6 characters.';
        return;
    }

    loading = true;
    errorMessage = '';
    successMessage = '';

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      successMessage = 'Password updated successfully! You will be redirected to the login page shortly.';
      
      setTimeout(() => {
        goto('/login');
      }, 3000);

    } catch (error) {
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }
</script>

<main style="font-family: sans-serif; max-width: 400px; margin: 4rem auto;">
  <h1>Update Password</h1>
  <p>Enter your new password below.</p>

  <form on:submit|preventDefault={handleUpdatePassword}>
    <div style="margin-bottom: 1rem;">
      <label for="password" style="display: block; margin-bottom: 0.25rem;">New Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    <div style="margin-bottom: 1rem;">
      <label for="confirmPassword" style="display: block; margin-bottom: 0.25rem;">Confirm New Password</label>
      <input
        id="confirmPassword"
        type="password"
        bind:value={confirmPassword}
        required
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
      />
    </div>

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p style="color: green;">{successMessage}</p>
    {/if}

    <button
      type="submit"
      disabled={loading}
      style="width: 100%; padding: 0.75rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      {loading ? 'Updating...' : 'Update Password'}
    </button>
  </form>
</main>
