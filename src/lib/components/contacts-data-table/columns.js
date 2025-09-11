import { createRender } from '@tanstack/svelte-table';

/** @type {import('@tanstack/svelte-table').ColumnDef<import('$lib/types').Contact>[]} */
export const columns = [
  {
    accessorKey: 'first_name',
    header: 'First Name',
    cell: (info) => createRender(info.getValue()),
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    cell: (info) => createRender(info.getValue()),
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: (info) => createRender(info.getValue()),
  },
  {
    accessorKey: 'created_at',
    header: 'Date Added',
    cell: (info) => {
      const date = new Date(info.getValue());
      return createRender(date.toLocaleDateString('en-US'));
    },
  },
];
