import { NotFound } from "./page";
import { UserOutlined } from "@ant-design/icons";

export const notFoundRoutes = [
  {
    key: "17",
    path: "*",
    Element: NotFound,
    label: "Not Found",
    icon: UserOutlined,
    children: [],
    visible: false,
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
  },
];
