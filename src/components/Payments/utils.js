export const data = [
  {
    id: 1,
    project: 'project-1',
    amount: '234234',
    date: '01-07-2020',
    for_plan: 'No',
    directly: 'Yes',
    note: 'note',
  },
  {
    id: 2,
    project: 'project-1',
    amount: '120',
    date: '22-07-2020',
    for_plan: 'Yes',
    directly: 'No',
    note: 'note',
  },
];

export const projectsArr = [
  {
    id: 1,
    name: 'project-1',
  },
  {
    id: 2,
    name: 'project-2',
  },
  {
    id: 3,
    name: 'project-3',
  },
];

export const table_columns = [
  {
    Header: 'Project',
    accessor: 'project_name',
    className: 'center',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    className: 'center',
  },
  {
    Header: 'Date',
    accessor: 'date',
    className: 'center',
  },
  {
    Header: 'For Plan',
    accessor: 'for_plan',
    className: 'center',
    Cell: (row) => (row.original.for_plan ? 'Yes' : 'No'),
  },
  {
    Header: 'Directly',
    accessor: 'is_directly',
    className: 'center',
    Cell: (row) => (row.original.is_directly ? 'Yes' : 'No'),
  },
  {
    Header: 'Note',
    accessor: 'note',
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

export const getProjectNameById = (id, projects) => {
  try {
    const ele = projects.find((x) => x.id === id);
    return ele.name;
  } catch (error) {
    return '';
  }
};
