<script>
  /**
   * @component DataTable
   * @description A Svelte component that displays a data table of contacts using TanStack Table.
   * @props {Array<import('$lib/types').Contact>} contacts - The list of contacts to display.
   */
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
  } from 'tanstack-table-8-svelte-5';
  import { columns } from './columns.js';
  import * as Table from '$lib/components/ui/table';

  /** @type {import('$lib/types').Contact[]} */
  export let contacts = [];

  let sorting = [];
  let columnFilters = [];
  let columnVisibility = {};
  let rowSelection = {};

  /**
   * The TanStack Table instance.
   * @type {import('tanstack-table-8-svelte-5').SvelteTable}
   */
  const table = createSvelteTable({
    get data() {
      return contacts;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updater) => {
      sorting = typeof updater === 'function' ? updater(sorting) : updater;
    },
    onColumnFiltersChange: (updater) => {
      columnFilters =
        typeof updater === 'function' ? updater(columnFilters) : updater;
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility =
        typeof updater === 'function' ? updater(columnVisibility) : updater;
    },
    onRowSelectionChange: (updater) => {
      rowSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater;
    },
    state: {
      get sorting() {
        return sorting;
      },
      get columnFilters() {
        return columnFilters;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      },
    },
  });
</script>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each $table.getHeaderGroups() as headerGroup}
        <Table.Row>
          {#each headerGroup.headers as header}
            <Table.Head>
              <svelte:component
                this={flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              />
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
              <svelte:component
                this={flexRender(cell.column.columnDef.cell, cell.getContext())}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
