```
# Gemini Task: Implement Production-Grade SvelteKit SSR Authentication

**Task ID:** `5.3_RLS_Policies`
**Selected Reasoning Mode:** Chain-of-Thought (CoT)

This file instructs the Gemini Coding Assistant to implement the definitive, officially recommended Supabase Server-Side Rendering (SSR) authentication flow. This is a procedural task to establish a secure and robust architectural pattern.

---

### CoT Implementation Plan: Supabase SSR Integration

**Objective:** To correctly implement the `@supabase/ssr` library, ensuring secure, cookie-based session management across both the server and client, thereby fixing all previous authentication-related errors.

#### **Key Considerations**

* **Security:** This implementation is security-critical. The use of `createServerClient` in `hooks.server.js` with cookie helpers is the designated method for securely managing auth tokens in a server-rendered context.
* **Data Flow & UI Consistency:** The creation of `+layout.server.js` is essential. It ensures the user's session is fetched on the server and passed down as data. The `+layout.svelte` file receives this data, preventing any "flicker" where a logged-in user might briefly see a logged-out state.
* **Error Handling:** The server hook will correctly throw a `redirect` for unauthenticated users, which is the proper SvelteKit way to handle route protection. The login page will handle and display any errors from the Supabase client.

#### **Execution Steps**

1.  **Action:** Install the required Supabase SSR dependency.
    * **Tool/Library:** `npm`
    * **Expected Result:** The `@supabase/ssr` package is added to `package.json`.

2.  **Action:** Refactor the Supabase client (`src/lib/supabaseClient.js`) to create a singleton browser client.
    * **Tool/Library:** `@supabase/ssr`'s `createBrowserClient`.
    * **Expected Result:** A simplified client is exported for use exclusively in browser-side Svelte components.

3.  **Action:** Overhaul the server hooks (`src/hooks.server.js`) to manage server-side requests.
    * **Tool/Library:** `@supabase/ssr`'s `createServerClient`.
    * **Expected Result:** Every server request gets its own Supabase instance. `event.locals.supabase` and `event.locals.getSession` are correctly populated. Route protection logic is enforced.

4.  **Action:** Create the server-side layout loader (`src/routes/+layout.server.js`).
    * **Tool/Library:** SvelteKit `load` function.
    * **Expected Result:** The initial session state is loaded on the server and made available to the universal layout.

5.  **Action:** Update the universal layout (`src/routes/+layout.svelte`) to synchronize the session between server and client.
    * **Tool/Library:** SvelteKit `export let data`, Supabase `onAuthStateChange`.
    * **Expected Result:** The layout receives the initial server session and subscribes to any subsequent auth changes on the client, ensuring the UI is always in sync.

---

### Implementation

**Action:** Execute the plan by installing the dependency and creating/updating the following files.

#### **Step 1: Install Dependency**

```bash
npm install @supabase/ssr

```

#### Step 2: Update Supabase Client

File Path: src/lib/supabaseClient.js

Content:

```
import { createBrowserClient } from '@supabase/ssr'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createBrowserClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

```

#### Step 3: Update Server Hooks

File Path: src/hooks.server.js

Content:

```
import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: '/' })
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: '/' })
        },
      },
    }
  )

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  const session = await event.locals.getSession()

  if (!session && event.url.pathname !== '/login') {
    throw redirect(303, '/login');
  }

  if (session && event.url.pathname === '/login') {
    throw redirect(303, '/contacts');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

```

#### Step 4: Create Server Layout

File Path: src/routes/+layout.server.js

Content:

```
export const load = async ({ locals: { getSession } }) => {
  return {
    session: await getSession(),
  }
}

```

#### Step 5: Update Universal Layout

File Path: src/routes/+layout.svelte

Content:

```
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

```