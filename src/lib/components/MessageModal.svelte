<script>
  /**
   * @component MessageModal
   * @description A Svelte component that provides a dialog for sending a message to selected contacts.
   * @props {boolean} open - Controls the visibility of the dialog.
   * @props {Array<Contact>} selectedContacts - The list of contacts to send the message to.
   * @event send - Dispatched when the user sends a message.
   * @property {string} detail.message - The message to be sent.
   * @property {Array<Contact>} detail.contacts - The contacts to whom the message will be sent.
   */
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Textarea } from '$lib/components/ui/textarea';
  import * as Dialog from '$lib/components/ui/dialog';

  const dispatch = createEventDispatcher();

  export let open = false;
  export let selectedContacts = [];

  let message = '';

  /**
   * Handles the sending of the message.
   * It dispatches a 'send' event with the message and the selected contacts.
   */
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
