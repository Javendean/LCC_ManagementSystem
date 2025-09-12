<script>
  /**
   * @component ContactsPage
   * @description The main page for displaying the user's contacts.
   * It uses the DataTable component to render the contacts and shows a skeleton loader while the data is being fetched.
   * @props {import('./$types').PageData} data - The data for the page, including the list of contacts.
   */
  import DataTable from '$lib/components/contacts-data-table/DataTable.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="container mx-auto py-10">
  <h1 class="text-2xl font-bold mb-4">Contacts</h1>

  {#if data.contacts}
    {#if data.contacts.length > 0}
      <DataTable contacts={data.contacts} />
    {:else}
      <div class="flex items-center justify-center h-64">
        <p class="text-lg text-muted-foreground">No contacts found.</p>
      </div>
    {/if}
  {:else}
    <div class="space-y-4">
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
    </div>
  {/if}
</div>
