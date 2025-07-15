<script>
  import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
  import { columns } from './columns.js';
  import * as Table from '$lib/components/ui/table';

  /** @type {import('$lib/types').Contact[]} */
  export let contacts = [];

  const table = createSvelteTable({
    get data() {
      return contacts;
    },
    columns,
    getCoreRowModel: getCoreRowModel()
  });
</script>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each $table.getHeaderGroups() as headerGroup}
        <Table.Row>
          {#each headerGroup.headers as header}
            <Table.Head>
              {@render flexRender(header.column.columnDef.header, header.getContext())}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each $table.getRowModel().rows as row}
        <Table.Row>
          {#each row.getVisibleCells() as cell}
            <Table.Cell>
              {@render flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Table.Cell>
          {/each}
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
