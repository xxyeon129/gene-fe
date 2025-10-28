import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
// app layers
import { AppLayout } from "../layout";
// pages layers
import { DashboardPage } from "@/pages";
const NotFoundErrorPage = lazy(() => import("@/pages").then((module) => ({ default: module.NotFoundErrorPage })));
const VerificationDashboardPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.VerificationDashboardPage }))
);
const MissingValuePage = lazy(() => import("@/pages").then((module) => ({ default: module.MissingValuePage })));
// shared layers
import { PATH_URL } from "@/shared";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <DashboardPage /> },
        {
          path: PATH_URL.VERIFICATION.BASE,
          element: <VerificationDashboardPage />,
          children: [
            // { path: PATH_URL.VERIFICATION.BASE, element: <VerificationDashboardPage /> },
            // { path: PATH_URL.VERIFICATION.RULES, element: <VerificationRulesPage /> },
            // { path: PATH_URL.VERIFICATION.EXECUTE, element: <VerificationExecutePage /> },
          ],
        },
        { path: PATH_URL.MISSING_VALUE, element: <MissingValuePage /> },
      ],
      errorElement: <NotFoundErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
