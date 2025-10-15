# Dependency Map

This document outlines the dependency map for the `LCC_Mgmt` project, based on the `package.json` in the root directory.

## Production Dependencies

### @supabase/ssr@^0.6.1
- cookie@^1.0.2

### papaparse@^5.5.3
- No dependencies

### twilio@^5.7.3
- axios@^1.12.0
  - form-data@^4.0.4
  - proxy-from-env@^1.1.0
  - follow-redirects@^1.15.6
- dayjs@^1.11.9
- https-proxy-agent@^5.0.0
  - agent-base@^7.1.2
  - debug@4
- jsonwebtoken@^9.0.2
  - jws@^3.2.2
  - lodash.includes@^4.3.0
  - lodash.isboolean@^3.0.3
  - lodash.isinteger@^4.0.4
  - lodash.isnumber@^3.0.3
  - lodash.isplainobject@^4.0.6
  - lodash.isstring@^4.0.1
  - lodash.once@^4.0.0
  - ms@^2.1.1
  - semver@^7.5.4
- qs@^6.9.4
  - side-channel@^1.1.0
- scmp@^2.1.0
- xmlbuilder@^13.0.2

## Dev Dependencies

### @sveltejs/adapter-auto@^6.0.1
- No dependencies

### @sveltejs/kit@^2.22.0
- @standard-schema/spec@^1.0.0
- @sveltejs/acorn-typescript@^1.0.5
- @types/cookie@^0.6.0
- acorn@^8.14.1
- cookie@^0.6.0
- devalue@^5.3.2
- esm-env@^1.2.2
- kleur@^4.1.5
- magic-string@^0.30.5
- mrmime@^2.0.0
- sade@^1.8.1
- set-cookie-parser@^2.6.0
- sirv@^3.0.0

### @sveltejs/vite-plugin-svelte@^6.0.0
- @sveltejs/vite-plugin-svelte-inspector@^5.0.0
- debug@^4.4.1
- deepmerge@^4.3.1
- magic-string@^0.30.17
- vitefu@^1.1.1

### eslint-config-prettier@^10.1.5
- No dependencies

### svelte@^5.0.0
- @jridgewell/remapping@^2.3.4
- @jridgewell/sourcemap-codec@^1.5.0
- @sveltejs/acorn-typescript@^1.0.5
- @types/estree@^1.0.5
- acorn@^8.12.1
- aria-query@^5.3.1
- axobject-query@^4.1.0
- clsx@^2.1.1
- esm-env@^1.2.1
- esrap@^2.1.0
- is-reference@^3.0.3
- locate-character@^3.0.0
- magic-string@^0.30.11
- zimmerframe@^1.1.2

### vite@^7.0.4
- fdir@^6.5.0
- rollup@^4.43.0
- esbuild@^0.25.0
- postcss@^8.5.6
- picomatch@^4.0.3
- tinyglobby@^0.2.15
