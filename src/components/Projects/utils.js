export const table_columns = [
  {
    Header: 'Title',
    accessor: 'name',
    className: 'center',
  },
  {
    Header: 'Client Name',
    accessor: 'client_name',
    className: 'center',
  },
  {
    Header: 'Country',
    accessor: 'country',
    className: 'center',
  },
  {
    Header: 'Cost',
    accessor: 'cost',
    className: 'center',
  },
  {
    Header: 'Contact',
    accessor: 'contact',
    className: 'center',
  },
  {
    Header: 'Note',
    accessor: 'note',
    className: 'center',
  },
  {
    Header: 'Start Date',
    accessor: 'start_date',
    className: 'center',
  },
];

export const getCurrentDate = () => {
  const d = new Date();
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${ye}-${mo}-${da}`;
};
