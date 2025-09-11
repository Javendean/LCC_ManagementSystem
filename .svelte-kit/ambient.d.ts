// this file is generated — do not edit it

/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 *
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 *
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 *
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 *
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 *
 * You can override `.env` values from the command line like so:
 *
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
  export const ALLUSERSPROFILE: string;
  export const APPDATA: string;
  export const APPLICATION_INSIGHTS_NO_STATSBEAT: string;
  export const BROWSER: string;
  export const CHROME_CRASHPAD_PIPE_NAME: string;
  export const COLOR: string;
  export const COLORTERM: string;
  export const COMMONPROGRAMFILES: string;
  export const CommonProgramW6432: string;
  export const COMPUTERNAME: string;
  export const COMSPEC: string;
  export const DEBUGGAI_API_KEY: string;
  export const DEBUG_COLORS: string;
  export const DriverData: string;
  export const EDITOR: string;
  export const EFC_11292_1592913036: string;
  export const ELECTRON_RUN_AS_NODE: string;
  export const FORCE_COLOR: string;
  export const GIT_ASKPASS: string;
  export const GIT_AUTHOR_DATE: string;
  export const GIT_AUTHOR_EMAIL: string;
  export const GIT_AUTHOR_NAME: string;
  export const GIT_CONFIG_PARAMETERS: string;
  export const GIT_EDITOR: string;
  export const GIT_EXEC_PATH: string;
  export const GIT_INDEX_FILE: string;
  export const GIT_PAGER: string;
  export const GIT_PREFIX: string;
  export const HOME: string;
  export const HOMEDRIVE: string;
  export const HOMEPATH: string;
  export const INIT_CWD: string;
  export const JAVA_HOME: string;
  export const LANG: string;
  export const LC_ALL: string;
  export const LOCALAPPDATA: string;
  export const LOGONSERVER: string;
  export const MSYSTEM: string;
  export const NODE: string;
  export const NODE_ENV: string;
  export const npm_command: string;
  export const npm_config_cache: string;
  export const npm_config_globalconfig: string;
  export const npm_config_global_prefix: string;
  export const npm_config_init_module: string;
  export const npm_config_local_prefix: string;
  export const npm_config_node_gyp: string;
  export const npm_config_noproxy: string;
  export const npm_config_npm_version: string;
  export const npm_config_prefix: string;
  export const npm_config_userconfig: string;
  export const npm_config_user_agent: string;
  export const npm_execpath: string;
  export const npm_lifecycle_event: string;
  export const npm_lifecycle_script: string;
  export const npm_node_execpath: string;
  export const npm_package_json: string;
  export const npm_package_name: string;
  export const npm_package_version: string;
  export const NUMBER_OF_PROCESSORS: string;
  export const NVM_HOME: string;
  export const NVM_SYMLINK: string;
  export const OneDrive: string;
  export const OneDriveConsumer: string;
  export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
  export const OS: string;
  export const PATH: string;
  export const PATHEXT: string;
  export const PLINK_PROTOCOL: string;
  export const PROCESSOR_ARCHITECTURE: string;
  export const PROCESSOR_IDENTIFIER: string;
  export const PROCESSOR_LEVEL: string;
  export const PROCESSOR_REVISION: string;
  export const ProgramData: string;
  export const PROGRAMFILES: string;
  export const ProgramW6432: string;
  export const PROMPT: string;
  export const PSModulePath: string;
  export const PUBLIC: string;
  export const PWD: string;
  export const RTOOLS40_HOME: string;
  export const SESSIONNAME: string;
  export const SHLVL: string;
  export const SSH_ASKPASS: string;
  export const SSH_ASKPASS_REQUIRE: string;
  export const SYSTEMDRIVE: string;
  export const SYSTEMROOT: string;
  export const TEMP: string;
  export const TERM: string;
  export const TMP: string;
  export const TMPDIR: string;
  export const USERDOMAIN: string;
  export const USERDOMAIN_ROAMINGPROFILE: string;
  export const USERNAME: string;
  export const USERPROFILE: string;
  export const VSCODE_CODE_CACHE_PATH: string;
  export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
  export const VSCODE_CWD: string;
  export const VSCODE_ESM_ENTRYPOINT: string;
  export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
  export const VSCODE_GIT_ASKPASS_MAIN: string;
  export const VSCODE_GIT_ASKPASS_NODE: string;
  export const VSCODE_GIT_COMMAND: string;
  export const VSCODE_GIT_EDITOR_EXTRA_ARGS: string;
  export const VSCODE_GIT_EDITOR_MAIN: string;
  export const VSCODE_GIT_EDITOR_NODE: string;
  export const VSCODE_GIT_IPC_HANDLE: string;
  export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
  export const VSCODE_IPC_HOOK: string;
  export const VSCODE_L10N_BUNDLE_LOCATION: string;
  export const VSCODE_NLS_CONFIG: string;
  export const VSCODE_PID: string;
  export const WINDIR: string;
  export const ZES_ENABLE_SYSMAN: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Values are replaced statically at build time.
 *
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 *
 * This module cannot be imported into client-side code.
 *
 * Dynamic environment variables cannot be used during prerendering.
 *
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 *
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
  export const env: {
    ALLUSERSPROFILE: string;
    APPDATA: string;
    APPLICATION_INSIGHTS_NO_STATSBEAT: string;
    BROWSER: string;
    CHROME_CRASHPAD_PIPE_NAME: string;
    COLOR: string;
    COLORTERM: string;
    COMMONPROGRAMFILES: string;
    CommonProgramW6432: string;
    COMPUTERNAME: string;
    COMSPEC: string;
    DEBUGGAI_API_KEY: string;
    DEBUG_COLORS: string;
    DriverData: string;
    EDITOR: string;
    EFC_11292_1592913036: string;
    ELECTRON_RUN_AS_NODE: string;
    FORCE_COLOR: string;
    GIT_ASKPASS: string;
    GIT_AUTHOR_DATE: string;
    GIT_AUTHOR_EMAIL: string;
    GIT_AUTHOR_NAME: string;
    GIT_CONFIG_PARAMETERS: string;
    GIT_EDITOR: string;
    GIT_EXEC_PATH: string;
    GIT_INDEX_FILE: string;
    GIT_PAGER: string;
    GIT_PREFIX: string;
    HOME: string;
    HOMEDRIVE: string;
    HOMEPATH: string;
    INIT_CWD: string;
    JAVA_HOME: string;
    LANG: string;
    LC_ALL: string;
    LOCALAPPDATA: string;
    LOGONSERVER: string;
    MSYSTEM: string;
    NODE: string;
    NODE_ENV: string;
    npm_command: string;
    npm_config_cache: string;
    npm_config_globalconfig: string;
    npm_config_global_prefix: string;
    npm_config_init_module: string;
    npm_config_local_prefix: string;
    npm_config_node_gyp: string;
    npm_config_noproxy: string;
    npm_config_npm_version: string;
    npm_config_prefix: string;
    npm_config_userconfig: string;
    npm_config_user_agent: string;
    npm_execpath: string;
    npm_lifecycle_event: string;
    npm_lifecycle_script: string;
    npm_node_execpath: string;
    npm_package_json: string;
    npm_package_name: string;
    npm_package_version: string;
    NUMBER_OF_PROCESSORS: string;
    NVM_HOME: string;
    NVM_SYMLINK: string;
    OneDrive: string;
    OneDriveConsumer: string;
    ORIGINAL_XDG_CURRENT_DESKTOP: string;
    OS: string;
    PATH: string;
    PATHEXT: string;
    PLINK_PROTOCOL: string;
    PROCESSOR_ARCHITECTURE: string;
    PROCESSOR_IDENTIFIER: string;
    PROCESSOR_LEVEL: string;
    PROCESSOR_REVISION: string;
    ProgramData: string;
    PROGRAMFILES: string;
    ProgramW6432: string;
    PROMPT: string;
    PSModulePath: string;
    PUBLIC: string;
    PWD: string;
    RTOOLS40_HOME: string;
    SESSIONNAME: string;
    SHLVL: string;
    SSH_ASKPASS: string;
    SSH_ASKPASS_REQUIRE: string;
    SYSTEMDRIVE: string;
    SYSTEMROOT: string;
    TEMP: string;
    TERM: string;
    TMP: string;
    TMPDIR: string;
    USERDOMAIN: string;
    USERDOMAIN_ROAMINGPROFILE: string;
    USERNAME: string;
    USERPROFILE: string;
    VSCODE_CODE_CACHE_PATH: string;
    VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
    VSCODE_CWD: string;
    VSCODE_ESM_ENTRYPOINT: string;
    VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
    VSCODE_GIT_ASKPASS_MAIN: string;
    VSCODE_GIT_ASKPASS_NODE: string;
    VSCODE_GIT_COMMAND: string;
    VSCODE_GIT_EDITOR_EXTRA_ARGS: string;
    VSCODE_GIT_EDITOR_MAIN: string;
    VSCODE_GIT_EDITOR_NODE: string;
    VSCODE_GIT_IPC_HANDLE: string;
    VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
    VSCODE_IPC_HOOK: string;
    VSCODE_L10N_BUNDLE_LOCATION: string;
    VSCODE_NLS_CONFIG: string;
    VSCODE_PID: string;
    WINDIR: string;
    ZES_ENABLE_SYSMAN: string;
    [key: `PUBLIC_${string}`]: undefined;
    [key: `${string}`]: string | undefined;
  };
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 *
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 *
 * Dynamic environment variables cannot be used during prerendering.
 *
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
  export const env: {
    PUBLIC_SUPABASE_URL: string;
    PUBLIC_SUPABASE_ANON_KEY: string;
    [key: `PUBLIC_${string}`]: string | undefined;
  };
}
