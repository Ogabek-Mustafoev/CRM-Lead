const users = [
  {
    id: "1",
    fullName: 'John Smith',
    imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    age: 25,
    from: 'New York',
    phoneNumber: '555-111-1111',
    date: '1997-04-15',
  },
  {
    id: "2",
    fullName: 'Jane Johnson',
    imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    age: 30,
    from: 'Los Angeles',
    phoneNumber: '555-222-2222',
    date: '1992-08-22',
  },
  {
    id: "3",
    fullName: 'Alice Williams',
    imgUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    age: 22,
    from: 'Chicago',
    phoneNumber: '555-333-3333',
    date: '1999-11-03',
  },
  {
    id: "4",
    fullName: 'Bob Brown',
    imgUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    age: 28,
    from: 'Houston',
    phoneNumber: '555-444-4444',
    date: '1994-07-18',
  },
  {
    id: "5",
    fullName: 'Eva Jones',
    imgUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    age: 35,
    from: 'Phoenix',
    phoneNumber: '555-555-5555',
    date: '1987-02-28',
  },
  {
    id: "6",
    fullName: 'Charlie Miller',
    imgUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    age: 29,
    from: 'Philadelphia',
    phoneNumber: '555-666-6666',
    date: '1993-09-10',
  },
  {
    id: "7",
    fullName: 'Olivia Davis',
    imgUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
    age: 32,
    from: 'San Antonio',
    phoneNumber: '555-777-7777',
    date: '1990-05-20',
  },
  {
    id: "8",
    fullName: 'Liam Garcia',
    imgUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
    age: 24,
    from: 'San Diego',
    phoneNumber: '555-888-8888',
    date: '1996-12-08',
  },
  {
    id: "9",
    fullName: 'Sophia Rodriguez',
    imgUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    age: 27,
    from: 'Dallas',
    phoneNumber: '555-999-9999',
    date: '1995-01-25',
  },
  {
    id: "10",
    fullName: 'Mia Martinez',
    imgUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
    age: 31,
    from: 'San Jose',
    phoneNumber: '555-101-0101',
    date: '1991-06-12',
  },
];

export const listData = {
  incoming: {
    name: "Incoming leads",
    items: users,
  },
  newLeads: {
    name: "Yangi lidlar",
    items: []
  },
  doesntAnswered: {
    name: "Qo'ngiroqqa javob bermaganlar",
    items: []
  },
  pending: {
    name: "Kutilmoqda",
    items: []
  },
};

