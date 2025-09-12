<script>
  /**
   * A Svelte component that displays a dialog for sending a message to selected contacts.
   *
   * @property {boolean} open - Controls the visibility of the dialog.
   * @property {Array<Object>} selectedContacts - The list of contacts to send the message to.
   * @event send - Dispatched when the send button is clicked.
   * @property {string} detail.message - The message to send.
   * @property {Array<Object>} detail.contacts - The contacts to send the message to.
   */
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