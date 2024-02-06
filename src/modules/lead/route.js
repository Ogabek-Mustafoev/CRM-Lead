import {Lead} from "./pages";
import {AppstoreAddOutlined} from "@ant-design/icons";

export const leadRoutes = [
  {
    key: "0",
    path: "/lead",
    Element: Lead,
    label: "Lid bo'limi",
    icon: AppstoreAddOutlined,
    children: [],
    visible: true,
    meta: {isLoginIf: false, role: new Set(["SuperAdmin"])},
  },
];



export const listData = {
  incomingID: {
    name: "Incoming leads",
    items: [
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
    ],
  },
  newLeadsID: {
    name: "Yangi lidlar",
    items: []
  },
  doesntAnsweredID: {
    name: "Qo'ngiroqqa javob bermaganlar",
    items: []
  },
  pendingID: {
    name: "Kutilmoqda",
    items: []
  },
};