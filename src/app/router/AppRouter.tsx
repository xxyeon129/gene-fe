import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
// pages layers
import { DashboardPage } from "@/pages";
const NotFoundErrorPage = lazy(() => import("@/pages").then((module) => ({ default: module.NotFoundErrorPage })));

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
      // children: [{ path: "/", element:  }],
      errorElement: <NotFoundErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
