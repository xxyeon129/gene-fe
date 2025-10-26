import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
// pages layers
import { DashboardPage } from "@/pages";
const NotFoundErrorPage = lazy(() => import("@/pages").then((module) => ({ default: module.NotFoundErrorPage })));
const VerificationPage = lazy(() => import("@/pages").then((module) => ({ default: module.VerificationPage })));
const MissingValuePage = lazy(() => import("@/pages").then((module) => ({ default: module.MissingValuePage })));
// shared layers
import { PATH_URL } from "@/shared";
import { AppLayout } from "../layout/AppLayout";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <DashboardPage /> },
        { path: PATH_URL.VERIFICATION, element: <VerificationPage /> },
        { path: PATH_URL.MISSING_VALUE, element: <MissingValuePage /> },
      ],
      errorElement: <NotFoundErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
