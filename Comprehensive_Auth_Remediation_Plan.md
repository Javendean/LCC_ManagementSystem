# Advanced Authentication Hardening and Remediation Plan

## 1. Objective

To execute a comprehensive, defense-in-depth overhaul of the application's authentication system. This plan integrates critical security controls that were missing from previous versions, including rate limiting, secure session management, and proactive credential monitoring. It is the definitive strategy for achieving a robust and secure user authentication architecture.

## 2. Guiding Principles

- **Zero Trust Architecture:** No component of the system is implicitly trusted. All actions are verified.
- **Verify, then Harden:** Assume the features described in `GEMINI_CHANGELOG.txt` exist. The goal is to audit, correct, and secure them, not rebuild them.
- **Security in Depth:** Address vulnerabilities at every layer: cloud configuration, server-side logic, and client-side UI.
- **Adherence to Protocol:** All implementation steps will be validated through the project's established Quality Gates by invoking the `@security-auditor` and `@tester` specialist agents as defined in `GEMINI.md`.
- **Tool-Driven Workflow:** Utilize the Rube MCP server for discovery, planning, and execution, adhering to the Discover -> Plan -> Execute model.

---

## 3. Phase 0: Advanced Threat Research

**Objective:** To inform the remediation plan with current, industry-standard best practices for the specific tech stack.

- **Tooling Details (`octocode`, `google`):**
  1.  **Discover:** `RUBE_SEARCH_TOOLS(use_case="search github and the web for security best practices", toolkits=["octocode", "google"])`
  2.  **Plan:** `RUBE_CREATE_PLAN(use_case="Find best practices for SvelteKit/Supabase rate limiting, session management, and pwned password checks", ...)`
  3.  **Execute:**
      ```bash
      # Search for code patterns and community libraries
      RUBE_MULTI_EXECUTE_TOOL(tools=[{
          "tool_slug": "githubSearchCode",
          "arguments": {
              "queries": [
                  {"queryTerms": ["sveltekit", "rate-limit", "hooks"], "language": "typescript", "researchGoal": "analysis"},
                  {"queryTerms": ["supabase", "cookie", "httpOnly", "hooks.server.js"], "language": "typescript", "researchGoal": "analysis"}
              ]
          }
      }])
      # Search for articles and official documentation
      RUBE_MULTI_EXECUTE_TOOL(tools=[{
          "tool_slug": "google_web_search",
          "arguments": {"query": "SvelteKit API rate limiting strategies"}
      }, {
          "tool_slug": "google_web_search",
          "arguments": {"query": "Supabase Auth pwned password checking"}
      }])
      ```

---

## 4. Phase 1: Supabase Configuration Hardening

**Objective:** To immediately mitigate risks by enforcing stricter security policies directly within the Supabase dashboard or via management API.

- **Action 1.1: Enable Pwned Password Protection**
  - **Task:** Enable the built-in Supabase feature to check new passwords against the HIBP database of known credential leaks.
  - **Reasoning:** Prevents users from using compromised passwords, a primary vector for account takeover.
- **Action 1.2: Disable Email Auto-Confirmation**
- **Action 1.3: Strengthen Password Policy (10 char min)**
- **Action 1.4: Enable CAPTCHA**

- **Tooling & Fallback:**
  - The `SUPABASE_UPDATE_AUTH_CONFIG` tool will be used if discovered. **Fallback:** If no tool is available, these settings **must** be configured manually in the Supabase project dashboard. The changes must be documented with screenshots for verification.

---

## 5. Phase 2: Codebase Remediation & Hardening

**Objective:** To refactor the codebase, closing all identified vulnerabilities and implementing new, critical security controls.

- **Action 2.1: Implement API Rate Limiting**
  - **Priority:** CRITICAL
  - **Task:** Introduce server-side rate limiting on all authentication endpoints.
  - **Steps:**
    1.  Identify a suitable rate-limiting library for SvelteKit (e.g., `sveltekit-rate-limiter`) or implement a custom hook using an in-memory store.
    2.  Apply strict rate limits to `/api/auth/login`, `/api/auth/signup`, and `/api/auth/forgot-password` to prevent brute-force, enumeration, and denial-of-service attacks.
  - **Security Gate:** Invoke `@security-auditor` to verify the implementation is effective and cannot be bypassed.

- **Action 2.2: Secure Session Cookie Management**
  - **Priority:** CRITICAL
  - **Task:** Ensure session tokens are handled with secure cookie settings.
  - **Steps:** Modify `src/hooks.server.js` to ensure that when the Supabase session is set in a cookie, it uses the flags: `httpOnly: true`, `secure: true` (in production), and `sameSite: 'lax'`.
  - **Reasoning:** Mitigates XSS attacks by preventing client-side script access to the session token.

- **Action 2.3: Refactor Password Recovery Flow**
  - **Task:** Split password update functionality into two distinct, secure routes (`/auth/change-password` and `/auth/reset-password`).
  - **Security Gate:** Invoke `@security-auditor`.

- **Action 2.4: Implement Security Event Logging**
  - **Priority:** HIGH
  - **Task:** Create a mechanism to log important security events for auditing and monitoring.
  - **Steps:**
    1.  Create a new table in Supabase named `security_events` with columns like `timestamp`, `event_type`, `user_id`, `ip_address`, `details`.
    2.  From the server-side API routes, log events such as: `login_failed`, `login_success`, `password_reset_request`, `password_reset_success`, `password_change_success`.
  - **Reasoning:** Provides critical visibility into potential attacks and system misuse.

---

## 6. Phase 3: Comprehensive Testing & Validation

**Objective:** To validate all changes through a multi-layered testing strategy, ensuring correctness, security, and adherence to project standards.

- **Action 3.1: Develop Multi-Layered Test Suite**
  - **Task:** Invoke the `@tester` specialist agent to create a full suite of tests, aligning with the project's "Testing Trinity" mandate.
  - **Requirements:**
    1.  **Unit Tests (Vitest):** For any new utility functions (e.g., password strength calculation).
    2.  **Component Tests (Playwright):** For new UI components (e.g., the password strength indicator).
    3.  **End-to-End Tests (debugg_ai):** For the critical user flows.

- **Action 3.2: Execute E2E Tests and Report**
  - **Task:** The `@tester` agent will use `debugg_ai` to execute the full E2E test suite against a preview deployment.
  - **New Test Cases:**
    - Verify that exceeding the rate limit on the login form returns a `429 Too Many Requests` error.
    - Verify that the session cookie has the `httpOnly` and `Secure` flags set.
    - Verify that a failed login attempt creates a new entry in the `security_events` table.
  - **Tooling Details (`debugg_ai`):**

    ```bash
    # Generate the test suite with the new, expanded test cases
    RUBE_MULTI_EXECUTE_TOOL(tools=[{
        "tool_slug": "debugg_ai_create_test_suite",
        "arguments": {
            "description": "Create an ADVANCED test suite for LCC_Mgmt auth. Add tests for rate limiting (expect 429 error), secure cookie flags (httpOnly), and security event logging verification.",
            "repoName": "LCC_Mgmt",
            "branchName": "feature/auth-hardening-v2",
            "repoPath": "d:/DevProjects/LCC_Mgmt/my-app"
        }
    }])

    # Monitor the test run
    RUBE_MULTI_EXECUTE_TOOL(tools=[{
        "tool_slug": "debugg_ai_get_test_status",
        "arguments": {"suiteUuid": "generated-suite-uuid-67890"}
    }])
    ```

  - **Gate:** This plan is not considered complete until the `@tester` agent delivers a report with a 100% pass rate for all test layers.
