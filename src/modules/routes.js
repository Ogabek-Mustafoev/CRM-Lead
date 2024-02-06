import {leadRoutes} from "@/modules/lead/route.js";
import {notFoundRoutes} from "@/modules/not-found/route.js";

const routes = [
  ...leadRoutes,
  ...notFoundRoutes,
];

const rolename = localStorage.getItem("rolename") || "SuperAdmin";
export const filteredRoutes = routes.filter(async (el) => {
  return await el?.meta?.role?.has(rolename);
});


