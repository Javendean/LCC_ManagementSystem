```
# Gemini Task: Correct Supabase Environment Variable Handling

**Task ID:** `ENV-FIX-01`
**Selected Reasoning Mode:** Chain-of-Thought (CoT)

This file instructs the Gemini Coding Assistant to refactor the project's environment variable handling to align with SvelteKit's required conventions for public variables, thereby fixing the "Supabase URL and Anon Key are missing" error.

---

### CoT Implementation Plan: SvelteKit Public Env Var Fix

**Objective:** To ensure the Supabase URL and Anon Key are correctly loaded by the Vite server by renaming them with the `VITE_PUBLIC_` prefix and updating all references in the codebase.

#### **Key Considerations**

* **SvelteKit Convention:** The core of the fix is adhering to SvelteKit's rule that variables imported from `$env/static/public` must be prefixed with `VITE_PUBLIC_` in the `.env` file.
* **Consistency:** The variable names must be updated in every file where they are used to prevent new errors.
* **Security:** The Supabase URL and Anon Key are considered safe to be public. Application security is enforced by Supabase's Row-Level Security (RLS) policies, not by hiding these keys.

#### **Execution Steps**

1.  **Action:** Modify the `.env` file to rename the Supabase variables.
    * **Tool/Library:** File System.
    * **Expected Result:** The variables will be correctly prefixed with `VITE_PUBLIC_`.

2.  **Action:** Update the server hooks file to import and use the new, correctly prefixed environment variables. I will also remove the temporary error-checking code.
    * **Tool/Library:** File System.
    * **Expected Result:** `src/hooks.server.js` will successfully import the variables and initialize the server-side Supabase client.

3.  **Action:** Update the client-side Supabase helper to import and use the new, correctly prefixed environment variables.
    * **Tool/Library:** File System.
    * **Expected Result:** `src/lib/supabaseClient.js` will successfully import the variables and initialize the browser-side Supabase client.

---

### Implementation

**Action:** Execute the plan by updating the following files with the specified content.

#### **Step 1: Update `.env` File**

**File Path:** `.env`
**Content:**
```env
VITE_PUBLIC_SUPABASE_URL="[https://vymwitowzlcpywlfhmdl.supabase.co](https://vymwitowzlcpywlfhmdl.supabase.co)"
VITE_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bXdpdG93emxjcHl3bGZobWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjQyNjMsImV4cCI6MjA2ODEwMDI2M30.NicQOOIckf_JOEK-sVLfqEH32Nlrk2pM9_wtAy7BYyw"

```

#### Step 2: Update Server Hooks

File Path: src/hooks.server.js

Content:

```
import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
import { VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    VITE_PUBLIC_SUPABASE_URL,
    VITE_PUBLIC_SUPABASE_ANON_KEY,
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

#### Step 3: Update Supabase Client

File Path: src/lib/supabaseClient.js

Content:

```
import { createBrowserClient } from '@supabase/ssr'
import { VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createBrowserClient(VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY)

```