import {Outlet} from "react-router-dom";

export const LoginLayout = () => {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Outlet/>
    </main>
  )
};
