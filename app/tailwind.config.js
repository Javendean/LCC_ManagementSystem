import skeleton from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './index.html',
    './node_modules/@skeletonlabs/skeleton/**/*.svelte',
  ],
  theme: {
    extend: {},
  },
  plugins: [skeleton],
}
