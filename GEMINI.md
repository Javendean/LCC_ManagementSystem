# Gemini Agent Codebase Quick Reference

This document is a concise map of the LCC Management System's codebase. It outlines the purpose of key files and directories.

Prerequisite: This guide assumes you have already internalized the operational, reasoning (CoT/ToT), and workflow protocols detailed in `Instructions.md`. This file focuses exclusively on code location and structure.

### `src/hooks.server.js`

- Role: The Server-Side Gatekeeper.

- Purpose: Intercepts every request to the server. Its primary job is to manage authentication by creating a server-side Supabase client and protecting routes from unauthenticated access.

### `src/routes/`

- Role: Application Pages & API Endpoints.

- Purpose: This directory uses SvelteKit's file-based routing. The folder structure directly maps to the application's URLs.

| File Name | Purpose |
|

`+page.svelte`

|

A visible page component. (e.g., `routes/contacts/+page.svelte`)

|
|

`+page.server.js`

|

Server-only logic to securely load data for a page.

|
|

`+layout.svelte`

|

A shared UI wrapper for a section of the app.

|
|

`+layout.server.js`

|

Server-only logic to securely load data for a layout.

|
|

`api/**/+server.js`

|

A server-only API endpoint. (e.g., `routes/api/upload-csv/+server.js`)

|

### `src/lib/` (Import Alias: `$lib`)

- Role: Shared Utilities & Components.

- Purpose: Contains all reusable code accessible throughout the application.

| File / Folder | Purpose |
|

`components/`

|

Reusable Svelte components (e.g., data tables, modals).

|
|

`supabaseClient.js`

|

Initializes the browser-side Supabase client.

|
|

`types.js`

|

Central location for project-wide JSDoc `@typedef` definitions.

|

### Final Mandate

Before executing any task, refer to this guide to locate or create the correct files. Apply the reasoning and workflow protocols from `Instructions.md` to the implementation.
