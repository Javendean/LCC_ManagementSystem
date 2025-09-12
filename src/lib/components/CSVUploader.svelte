<script>
  /**
   * @component CSVUploader
   * @description A Svelte component for uploading CSV files.
   * @event upload - Dispatched when a CSV file is uploaded.
   * @property {File} detail.file - The uploaded CSV file.
   */
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  const dispatch = createEventDispatcher();

  let files;

  /**
   * Handles the file upload process.
   * It dispatches an 'upload' event with the selected file.
   */
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
