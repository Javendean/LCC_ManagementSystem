# Efficient Login Troubleshooting Plan

## 1. Objective

To efficiently diagnose and resolve the user login failure by executing a streamlined, automated, and non-blocking troubleshooting process. This plan removes all identified bottlenecks and manual intervention steps, ensuring the fastest possible path to identifying the root cause and achieving a successful login.

## 2. Guiding Principles

- **Automation First:** Prioritize non-interactive tools to eliminate waiting and manual steps.
- **Efficiency:** Combine related actions and use the most direct tools to gather evidence.
- **Clear Handoffs:** When manual action is unavoidable, it will be explicitly stated as a prerequisite before the automated plan begins.

---

## 3. Phase 1: Pre-Flight System Checks

**Objective:** To rule out the most common configuration errors before beginning automated testing.

- **Action 1.1: Inspect Configuration for Server Port**
  - **Task:** Directly inspect the `vite.config.js` to confirm the configured development server port, avoiding the need to monitor a running process.
  - \*\*Tooling Details (`local files`):
    ```bash
    read_file(absolute_path="d:/DevProjects/LCC_Mgmt/my-app/vite.config.js")
    ```

- **Action 1.2: Validate Environment Variables**
  - **Task:** Compare the Supabase credentials in the project's `.env` file with the actual credentials from the Supabase project.
  - \*\*Tooling Details (`supabase` & `local files`):
    1.  **Get Ground Truth:**
        ```bash
        RUBE_MULTI_EXECUTE_TOOL(tools=[
            {"tool_slug": "get_project_url", "arguments": {}},
            {"tool_slug": "get_anon_key", "arguments": {}}
        ])
        ```
    2.  **Compare with Local File:**
        ```bash
        read_file(absolute_path="d:/DevProjects/LCC_Mgmt/my-app/.env")
        ```

- **Action 1.3: Prerequisite - User Action Required**
  - **Task:** This is a required manual step for you, the user, to complete before I proceed.
  - **Instruction:** **You must manually reset the password for your test user in the Supabase dashboard.** This plan will proceed assuming the credentials are known to be 100% valid. This eliminates password validity as a variable in my automated testing.

---

## 4. Phase 2: Automated E2E Diagnosis

**Objective:** To use a single, non-interactive test to perform a login attempt and automatically capture all resulting logs and errors. This replaces the multi-step, manual session analysis.

- **Action 2.1: Execute Automated Login Test**
  - **Task:** Run a single end-to-end test that navigates to the login page, fills in the known-valid credentials, clicks the submit button, and records the outcome.
  - \*\*Tooling Details (`debugg_ai`):
    1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="run an end-to-end test on a web page", toolkits=["debugg_ai"])`
    2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Run a single automated test to attempt login and capture all resulting logs and errors.", primary_tool_slugs=["debugg_ai_test_page_changes"], ...)`
    3.  **Execute:**
        ```bash
        RUBE_MULTI_EXECUTE_TOOL(tools=[{
            "tool_slug": "debugg_ai_test_page_changes",
            "arguments": {
                "description": "Navigate to the /login page. Enter the known-valid email and password. Click the submit button. The test should fail, capture the console logs, network logs, and a final screenshot.",
                "repoName": "LCC_Mgmt",
                "localPort": 5173, # Use port confirmed in Phase 1
                "repoPath": "d:/DevProjects/LCC_Mgmt/my-app"
            }
        }])
        ```
  - **Critical Analysis:** The output of this single tool will contain all necessary diagnostic data (console errors, network request/response details, screenshots). The analysis will focus on the specific error message returned in the network response to the Supabase token endpoint.

---

## 5. Phase 3: Targeted Code Investigation

**Objective:** Using the specific error from the automated test, inspect the relevant source code files for logical errors.

- **Action 3.1: Efficient Code Review**
  - **Task:** Read the contents of all key files involved in the login process in a single, efficient step.
  - \*\*Tooling Details (`local files`):
    ```bash
    read_many_files(paths=[
        "d:/DevProjects/LCC_Mgmt/my-app/src/routes/login/+page.svelte",
        "d:/DevProjects/LCC_Mgmt/my-app/src/lib/supabaseClient.js",
        "d:/DevProjects/LCC_Mgmt/my-app/src/hooks.server.js"
    ])
    ```
  - **Investigation Checklist:** Based on the error from Phase 2, inspect the relevant file for the likely cause (e.g., for a `400 Bad Request`, check the payload structure in `login/+page.svelte`).

- **Action 3.2: Search for Known Solutions**
  - **Task:** Use the exact error message from the logs to search for community solutions.
  - \*\*Tooling Details (`octocode`):
    ```bash
    # Discover, Plan, then Execute with the specific error
    RUBE_MULTI_EXECUTE_TOOL(tools=[{
        "tool_slug": "githubSearchCode",
        "arguments": {
            "queries": [{
                "queryTerms": ["supabase", "signInWithPassword", "THE_EXACT_ERROR_DESCRIPTION"],
                "researchGoal": "debugging"
            }]
        }
    }])
    ```

---

## 6. Phase 4: Hypothesis and Targeted Fix

**Objective:** To formulate a precise hypothesis and execute a minimal, targeted fix.

- **Hypothesis:** Based on all evidence, state the specific, single root cause.
- **Remediation:** Propose and execute the smallest possible code change to fix the issue. Immediately re-run the automated test from Phase 2 to confirm the resolution.
