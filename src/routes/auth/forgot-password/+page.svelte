<script>
  import { enhance } from '$app/forms';
  let form;
</script>

<div class="flex items-center justify-center h-screen">
  <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-900">Forgot Password</h2>

    {#if form?.success}
      <div class="p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
        Password reset link has been sent to your email.
      </div>
    {:else if form?.error}
      <div class="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        {form.error}
      </div>
    {/if}

    <form method="POST" use:enhance={() => {
      return async ({ result }) => {
        form = result.data;
      };
    }}>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Send Reset Link
      </button>
    </form>
  </div>
</div>
