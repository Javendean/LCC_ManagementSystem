<script>
  /**
   * A Svelte component for uploading CSV files.
   *
   * @event upload - Dispatched when a file is selected and the upload button is clicked.
   * @property {File} detail.file - The selected file to upload.
   */
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  const dispatch = createEventDispatcher();

  let files;

  function handleUpload() {
    if (files && files[0]) {
      dispatch('upload', { file: files[0] });
    }
  }
</script>

<div class="flex w-full max-w-sm items-center space-x-2">
  <Input type="file" bind:files accept=".csv" />
  <Button on:click={handleUpload}>Upload CSV</Button>
</div>