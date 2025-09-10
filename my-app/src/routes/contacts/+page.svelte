<script>
  import DataTable from '$lib/components/contacts-data-table/DataTable.svelte';

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
    <div class="flex items-center justify-center h-64">
      <p class="text-lg text-muted-foreground">Loading contacts...</p>
    </div>
  {/if}
</div>