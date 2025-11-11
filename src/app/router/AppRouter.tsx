import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
// app layers
import { AppLayout } from "../layout";
// pages layers
const DashboardPage = lazy(() => import("@/pages").then((module) => ({ default: module.DashboardPage })));
const NotFoundErrorPage = lazy(() => import("@/pages").then((module) => ({ default: module.NotFoundErrorPage })));
const DatasetPage = lazy(() => import("@/pages").then((module) => ({ default: module.DatasetPage })));
const RulesPage = lazy(() => import("@/pages").then((module) => ({ default: module.RulesPage })));
const ValidationPage = lazy(() => import("@/pages").then((module) => ({ default: module.ValidationPage })));
const ManagementPage = lazy(() => import("@/pages").then((module) => ({ default: module.ManagementPage })));
const ResultsPage = lazy(() => import("@/pages").then((module) => ({ default: module.ResultsPage })));
// shared layers
import { PATH_URL } from "@/shared";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: PATH_URL.MAIN, element: <DashboardPage /> },
        { path: PATH_URL.DATASET, element: <DatasetPage /> },
        { path: PATH_URL.RULES, element: <RulesPage /> },
        { path: PATH_URL.VALIDATION, element: <ValidationPage /> },
        { path: PATH_URL.MANAGEMENT, element: <ManagementPage /> },
        { path: PATH_URL.RESULTS, element: <ResultsPage /> },
      ],
      errorElement: <NotFoundErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
