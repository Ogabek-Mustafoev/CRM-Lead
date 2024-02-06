import {Login} from "./pages/login";
import {Register} from "./pages/register";

export const authRoutes = [
  {
    key: "1",
    path: "/login",
    Element: Login,
    label: "Login",
    children: [],
    visible: false,
    meta: {isLoginIf: false, role: new Set(["SuperAdmin"])},
  },
  {
    key: "2",
    path: "/register",
    Element: Register,
    label: "Register",
    children: [],
    visible: false,
    meta: {isLoginIf: false, role: new Set(["SuperAdmin"])},
  },
];
