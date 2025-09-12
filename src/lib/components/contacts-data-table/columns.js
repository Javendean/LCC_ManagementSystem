/**
 * An array of column definitions for the contacts data table.
 * Each object in the array represents a column and its properties.
 *
 * @type {import('tanstack-table-8-svelte-5').ColumnDef<import('$lib/types').Contact>[]}
 */
export const columns = [
  {
    accessorKey: 'first_name',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'created_at',
    header: 'Date Added',
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString('en-US');
    },
  },
];
