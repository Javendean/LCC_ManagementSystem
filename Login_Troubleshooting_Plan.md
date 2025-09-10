# Login Troubleshooting and Remediation Plan

## 1. Objective

To systematically diagnose the root cause of the user login failure in the LCC Management application. This plan prioritizes a methodical, tool-driven troubleshooting process over broad feature implementation. The goal is to identify the specific point of failure—be it in the client-side code, network communication, or backend configuration—and propose a precise, targeted fix.

## 2. Guiding Principles

*   **Troubleshoot First:** All efforts are focused on diagnosing the existing problem before attempting any new development.
*   **Observe, then Inspect:** The process will begin with high-level observation of the application's behavior and progressively drill down into logs, configuration, and code.
*   **Tool-Driven Analysis:** Leverage the `debugg_ai`, `supabase`, and `octocode` toolkits via the Rube MCP server to gather concrete data and evidence at each step, following the Discover -> Plan -> Execute workflow.
*   **Adherence to Protocol:** The investigation will be guided by the principles and specialist roles outlined in `Instructions.md`.

---

## 3. Phase 1: Live Analysis of a Failed Login Attempt

**Objective:** To capture real-time browser activity, network requests, and console errors during a login attempt to get an unfiltered view of the failure.

*   **Action 1.1: Initiate Live Debugging Session**
    *   **Task:** Start a `debugg_ai` live session targeting the local development server.
    *   **Tooling Details (`debugg_ai`):
        1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="live debug a local web application", toolkits=["debugg_ai"])`
        2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Start a live browser session to monitor the login page", primary_tool_slugs=["debugg_ai_start_live_session"], ...)`
        3.  **Execute:**
            ```bash
            RUBE_MULTI_EXECUTE_TOOL(tools=[{
                "tool_slug": "debugg_ai_start_live_session",
                "arguments": {
                    "url": "http://localhost:5173/login",
                    "localPort": 5173,
                    "monitorConsole": true,
                    "monitorNetwork": true,
                    "sessionName": "Login Failure Diagnosis"
                }
            }])
            ```

*   **Action 1.2: Collect Diagnostic Data**
    *   **Task:** While the session is active, manually attempt to log in with known correct credentials. Immediately after the failure, retrieve all captured logs.
    *   **Tooling Details (`debugg_ai`):
        1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="get logs from a live debugging session", toolkits=["debugg_ai"])`
        2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Retrieve all console and network logs from the active session", primary_tool_slugs=["debugg_ai_get_live_session_logs"], ...)`
        3.  **Execute:**
            ```bash
            # The session ID would be from the output of the start_live_session call
            RUBE_MULTI_EXECUTE_TOOL(tools=[{
                "tool_slug": "debugg_ai_get_live_session_logs",
                "arguments": {
                    "sessionId": "generated-session-id-12345",
                    "logType": "all"
                }
            }])
            ```
    *   **Analysis:** Critically examine the output for JavaScript errors in the console and, most importantly, the HTTP status code and response body of the failed request to Supabase.

---

## 4. Phase 2: Backend and Configuration Verification

**Objective:** Based on the network error from Phase 1, verify the backend state and configuration in Supabase.

*   **Action 2.1: Check Supabase Authentication Logs**
    *   **Task:** Correlate the failed login attempt with a specific error log on the Supabase backend.
    *   **Tooling Details (`supabase`):
        1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="get supabase auth logs", toolkits=["supabase"])`
        2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Fetch recent auth service logs from Supabase", ...)`
        3.  **Execute:**
            ```bash
            RUBE_MULTI_EXECUTE_TOOL(tools=[{
                "tool_slug": "get_logs",
                "arguments": {"service": "auth"}
            }])
            ```

*   **Action 2.2: Verify User and Project State**
    *   **Task:** Ensure the test user exists, is confirmed, and that the application is connecting to the correct Supabase project.
    *   **Tooling Details (`supabase`):
        1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="get supabase user list and project url", toolkits=["supabase"])`
        2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Verify user existence and project connection details", ...)`
        3.  **Execute:**
            ```bash
            # Execute in parallel to quickly gather configuration and user data
            RUBE_MULTI_EXECUTE_TOOL(tools=[
                {"tool_slug": "list_users", "arguments": {}},
                {"tool_slug": "get_project_url", "arguments": {}}
            ])
            ```

---

## 5. Phase 3: Code-Level Investigation

**Objective:** If the root cause is not a simple configuration mismatch, inspect the relevant source code files for logical errors.

*   **Action 3.1: Search for Known Issues**
    *   **Task:** Use the specific error message from the logs to search for known issues or solutions from the community.
    *   **Tooling Details (`octocode`):
        1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="search github for code", toolkits=["octocode"])`
        2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Search for similar login errors in SvelteKit/Supabase projects", ...)`
        3.  **Execute:**
            ```bash
            # Use the actual error message from the logs in the query
            RUBE_MULTI_EXECUTE_TOOL(tools=[{
                "tool_slug": "githubSearchCode",
                "arguments": {
                    "queries": [{
                        "queryTerms": ["sveltekit", "supabase", "signInWithPassword", "THE_ACTUAL_ERROR_MESSAGE"],
                        "language": "typescript",
                        "researchGoal": "debugging"
                    }]
                }
            }])
            ```

*   **Action 3.2: Manual Code Review**
    *   **Task:** Read the contents of the key files involved in the login process.
    *   **Files to Review:**
        1.  `my-app/src/routes/login/+page.svelte` (for client-side form handling)
        2.  `my-app/src/lib/supabaseClient.js` (for Supabase client initialization)
        3.  `my-app/src/hooks.server.js` (for session handling and redirects)

---

## 6. Phase 4: Hypothesis and Targeted Remediation

**Objective:** To formulate a precise hypothesis based on the evidence gathered and execute a minimal, targeted fix.

*   **Hypothesis Formulation:** Synthesize all findings from Phases 1-3 into a single, specific statement. (e.g., "The login fails with a 400 error because the `signInWithPassword` function in `login/+page.svelte` is passing the user object instead of separate email and password strings.")

*   **Remediation:** Propose and execute the smallest possible change to fix the issue. This will be followed by a final, successful test run using the `debugg_ai` live session to confirm the resolution.
