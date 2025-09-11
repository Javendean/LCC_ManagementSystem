<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Textarea } from '$lib/components/ui/textarea';
  import * as Dialog from '$lib/components/ui/dialog';

  const dispatch = createEventDispatcher();

  export let open = false;
  export let selectedContacts = [];

  let message = '';

  function handleSend() {
    if (message) {
      dispatch('send', { message, contacts: selectedContacts });
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger asChild let:builder>
    <Button builders={[builder]} disabled={selectedContacts.length === 0}>
      Send Message ({selectedContacts.length})
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Send Message</Dialog.Title>
      <Dialog.Description>
        You are sending a message to {selectedContacts.length} contact(s).
      </Dialog.Description>
    </Dialog.Header>
    <Textarea bind:value={message} placeholder="Enter your message..." />
    <Dialog.Footer>
      <Button on:click={handleSend}>Send</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
