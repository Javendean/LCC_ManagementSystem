<script>
  /**
   * A Svelte component that displays a data table of contacts with global filtering and pagination.
   *
   * This component uses `@tanstack/svelte-table` to create a sortable, filterable, and paginated table.
   *
   * @property {import('$lib/types').Contact[]} data - The list of contacts to display in the table.
   */
  import { writable, derived } from 'svelte/store';
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
  } from '@tanstack/svelte-table';
  import { columns } from './columns.js';

  export let data;

  const table = createSvelteTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const globalFilter = writable('');
</script>

<div class="p-4">
  <div class="flex items-center mb-4">
    <input
      type="text"
      placeholder="Search..."
      class="flex-1 p-2 border rounded"
      bind:value={$globalFilter}
      on:input={() => table.setGlobalFilter($globalFilter)}
    />
  </div>
  <div class="border rounded-md">
    <table class="min-w-full">
      <thead>
        {#each $table.getHeaderGroups() as headerGroup}
          <tr>
            {#each headerGroup.headers as header}
              <th class="p-2 text-left">
                <button on:click={header.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽'
                  }[header.column.getIsSorted()] ?? ''}
                </button>
              </th>
            {/each}
          </tr>
        {/each}
      </thead>
      <tbody>
        {#each $table.getRowModel().rows as row}
          <tr>
            {#each row.getVisibleCells() as cell}
              <td class="p-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-between mt-4">
    <div class="text-sm text-muted-foreground">
      Showing {$table.getState().pagination.pageIndex * $table.getState().pagination.pageSize + 1}
      - {$table.getState().pagination.pageIndex * $table.getState().pagination.pageSize + $table.getRowModel().rows.length}
      of {$table.getRowCount()} rows.
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="p-2 border rounded"
        on:click={() => table.previousPage()}
        disabled={!$table.getCanPreviousPage()}
      >
        Previous
      </button>
      <button
        class="p-2 border rounded"
        on:click={() => table.nextPage()}
        disabled={!$table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  </div>
</div>
