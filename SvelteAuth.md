````
# Gemini Task: Implement SvelteKit Authentication Flow

**Task ID:** `5.1_Login_Page`
**Selected Reasoning Mode:** Chain-of-Thought (CoT)

This file instructs the Gemini Coding Assistant to implement the foundational user authentication flow. The task is procedural, involving the creation of specific files to resolve a known error, making CoT the appropriate reasoning mode.

---

### CoT Implementation Plan: SvelteKit Auth Pages

**Objective:** To resolve the "404 Not Found" error caused by the authentication hook by creating a root layout for session management and a functional login page.

#### **Key Considerations**

* **Error Handling:** The login page must gracefully handle and display authentication errors returned from Supabase (e.g., "Invalid login credentials"). The root layout must correctly subscribe and unsubscribe to auth state changes to prevent memory leaks.
* **Security:** The `+layout.svelte` file is the designated entry point for initializing the client-side Supabase session listener, making it available to all routes. The `login/+page.svelte` component will handle user credentials, sending them directly to Supabase over HTTPS. No sensitive information will be stored or processed insecurely. The existing `hooks.server.js` file already provides server-side route protection.
* **Data Integrity:** This task is focused on authentication, not data manipulation. Data integrity will be maintained by ensuring only successfully authenticated users can proceed past the login page.

#### **Execution Steps**

1.  **Action:** Create the root layout file. This component will serve as the parent for all other routes in the application.
    * **Tool/Library:** SvelteKit's file-based routing (`src/routes/+layout.svelte`), Supabase JS Client (`supabase.auth.onAuthStateChange`).
    * **Expected Result:** A new root layout is created. It initializes the Supabase client-side logic, listens for changes in the user's authentication state (login/logout), and triggers data invalidation to ensure the UI is always in sync with the session status.

2.  **Action:** Create the user login page. This component will provide the user interface for authentication.
    * **Tool/Library:** SvelteKit's file-based routing (`src/routes/login/+page.svelte`), Supabase JS Client (`supabase.auth.signInWithPassword`).
    * **Expected Result:** A new page is created at the `/login` route. It contains a form with email and password fields. Submitting the form calls the appropriate Supabase function, handles success or error states, and redirects the user upon successful login.

---

### Implementation

**Action:** Execute the plan by creating the following files with the specified content.

#### **File 1: Root Layout**

**File Path:** `src/routes/+layout.svelte`
**Content:**
```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { invalidateAll } from '$app/navigation';

  let session;

  onMount(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (session?.expires_at !== newSession?.expires_at) {
        session = newSession;
        // Invalidate all loaded data to trigger a re-run of load functions
        invalidateAll();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<!-- This slot will render the current page -->
<slot />

````

#### File 2: Login Page

File Path: src/routes/login/+page.svelte

Content:

```
<!-- src/routes/login/+page.svelte -->
<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let errorMessage = '';
  let loading = false;

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
  </form>
</main>

```
