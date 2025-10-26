import { Outlet, useLocation } from "react-router-dom";
import { AppNav } from "./ui";

export const AppLayout = () => {
  const isNavVisible = useLocation().pathname === "/";

  return (
    <>
      {isNavVisible && <AppNav />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
