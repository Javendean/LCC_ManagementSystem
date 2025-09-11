````
# Gemini Task: Refactor to Use Private Server-Side Environment Variables

**Task ID:** `ARCH-REFACTOR-01`
**Selected Reasoning Mode:** Chain-of-Thought (CoT)

This file instructs the Gemini Coding Assistant to perform a security-enhancing refactor of the environment variable handling. This will resolve the persistent "Supabase URL and Key are missing" error by adopting SvelteKit's state-of-the-art pattern for private, server-only credentials.

---

### CoT Implementation Plan: Private Environment Variable Refactor

**Objective:** To ensure the Supabase client in `hooks.server.js` is reliably initialized by using SvelteKit's secure mechanism for private, server-side environment variables.

#### **Key Considerations**

* **Security Model:** The core of this refactor is to treat the Supabase credentials as private on the server. We will create new, unprefixed variables in the `.env` file for this purpose. The public variables (`VITE_PUBLIC_...`) will be retained for the browser client.
* **SvelteKit Modules:** We will change the import path in `hooks.server.js` from `$env/static/public` to `$env/static/private`. This is a critical change that tells SvelteKit to load the private, unprefixed variables.
* **Separation of Concerns:** This change creates a clear separation. The server hook uses private, more privileged credentials, while the browser client continues to use the public-safe `anon` key.

#### **Execution Steps**

1.  **Action:** Modify the `.env` file to add new, private (unprefixed) variables for server-side use, while retaining the existing public variables for the client.
    * **Tool/Library:** File System.
    * **Expected Result:** The `.env` file will contain both `SUPABASE_URL` and `VITE_PUBLIC_SUPABASE_URL` (and their corresponding keys), correctly separating public and private credentials.

2.  **Action:** Update the server hooks file (`src/hooks.server.js`) to import its credentials from the secure `$env/static/private` module.
    * **Tool/Library:** File System.
    * **Expected Result:** `src/hooks.server.js` will now be completely independent of the public environment variables, reliably initializing the Supabase client with the private credentials on every server request.

3.  **Action:** Verify that the client-side Supabase helper (`src/lib/supabaseClient.js`) remains unchanged, as it correctly uses the public variables.
    * **Tool/Library:** File System (Read-only).
    * **Expected Result:** No changes are made to `src/lib/supabaseClient.js`.

---

### Implementation

**Action:** Execute the plan by updating the following files.

#### **Step 1: Update `.env` File**

**File Path:** `.env`
**Content:**
```env
# Private variables for server-side use (hooks.server.js)
# No prefix is needed.
SUPABASE_URL="[https://vymwitowzlcpywlfhmdl.supabase.co](https://vymwitowzlcpywlfhmdl.supabase.co)"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bXdpdG93emxjcHl3bGZobWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjQyNjMsImV4cCI6MjA2ODEwMDI2M30.NicQOOIckf_JOEK-sVLfqEH32Nlrk2pM9_wtAy7BYyw"

# Public variables for client-side use (supabaseClient.js)
# Must be prefixed with VITE_PUBLIC_
VITE_PUBLIC_SUPABASE_URL="[https://vymwitowzlcpywlfhmdl.supabase.co](https://vymwitowzlcpywlfhmdl.supabase.co)"
VITE_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bXdpdG93emxjcHl3bGZobWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjQyNjMsImV4cCI6MjA2ODEwMDI2M30.NicQOOIckf_JOEK-sVLfqEH32Nlrk2pM9_wtAy7BYyw"

````

#### Step 2: Update Server Hooks

File Path: src/hooks.server.js

Content:

```
import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
// IMPORTANT: Import from the 'private' module now
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
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
  const { pathname } = event.url

  if (!session && pathname !== '/login') {
    throw redirect(303, '/login');
  }

  if (session && (pathname === '/login' || pathname === '/')) {
    throw redirect(303, '/contacts');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

```
