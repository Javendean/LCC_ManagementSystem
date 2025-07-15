<script>
  import DataTable from '$lib/components/contacts-data-table/DataTable.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="container mx-auto py-10">
  <h1 class="text-2xl font-bold mb-4">Contacts</h1>
  <DataTable contacts={data.contacts} />
</div>