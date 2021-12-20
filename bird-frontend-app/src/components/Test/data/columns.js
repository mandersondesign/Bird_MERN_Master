
export const clients = render => () => [
  {
    title: 'Athlete',
    dataIndex: 'name',
    key: 'name',
    render: render.user,
  },
  {
    title: 'Last Activity',
    dataIndex: 'lastActivity',
    key: 'lastActivity',
    render: render.activity,
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: render.action,
  },
]

export const planClients = render => () => [
  {
    title: 'Athlete',
    dataIndex: 'name',
    key: 'name',
    render: render.user,
  },
  {
    title: 'Weeks Until Race',
    dataIndex: 'weeksUntilRace',
    key: 'weeksUntilRace',
    render: render.timeToRace, // value => value
  },
  {
    title: 'Key 1',
    dataIndex: 'key 1',
    key: 'key 1',
    render: (_, record) => (
      render.workout(record?.keyWorkouts[0])
    ),
  },
  {
    title: 'Key 2',
    dataIndex: 'key 2',
    key: 'key 2',
    render: (_, record) => (
      render.workout(record?.keyWorkouts[1])
    ),
  },
  {
    title: 'Key 3',
    dataIndex: 'key 3',
    key: 'key 3',
    render: (_, record) => (
      render.workout(record?.keyWorkouts[2])
    ),
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: render.action,
  },
]

export const planTemplates = render => () => [
  {
    title: 'Plan Template Name',
    dataIndex: 'name',
    key: 'name',
    render: render.name,
  },
  {
    title: 'Plan Weeks',
    dataIndex: 'type',
    key: 'type',
    render: render.type || '',
  },
  {
    title: 'Last Update',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: render.lastUpdate,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: render.actions,
  },
]

export const workouts = render => () => [
  {
    title: 'Workout title',
    dataIndex: 'libraryName',
    key: 'libraryName',
    render: render.libraryName,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: render.type || '',
  },
  {
    title: 'Last Update',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: render.lastUpdate,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: render.actions,
  },
]
