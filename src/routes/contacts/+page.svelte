<script>
  import CSVUploader from '$lib/components/CSVUploader.svelte';
  import DataTable from '$lib/components/contacts-data-table/DataTable.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { invalidateAll } from '$app/navigation';

  /** @type {import('./$types').PageData} */
  export let data;

  async function handleUpload(event) {
    const { file } = event.detail;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload-csv', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      invalidateAll();
    } else {
      alert('Upload failed');
    }
  }
</script>

<div class="container mx-auto py-10">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Contacts</h1>
    <CSVUploader on:upload={handleUpload} />
  </div>

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
