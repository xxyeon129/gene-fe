import { lazy } from "react";
import { PATH_URL } from "@/shared";

const VerificationLayout = lazy(() => import("@/pages/verification/layout").then((module) => ({ default: module.VerificationLayout })));
const VerificationDashboardPage = lazy(() => import("@/pages").then((module) => ({ default: module.VerificationDashboardPage })));
const VerificationRulesPage = lazy(() => import("@/pages").then((module) => ({ default: module.VerificationRulesPage })));
const VerificationExecutePage = lazy(() => import("@/pages").then((module) => ({ default: module.VerificationExecutePage })));

export const VerificationRouter = {
  path: PATH_URL.VERIFICATION.BASE,
  element: <VerificationLayout />,
  children: [
    { index: true, element: <VerificationDashboardPage /> },
    { path: PATH_URL.VERIFICATION.RULES, element: <VerificationRulesPage /> },
    { path: PATH_URL.VERIFICATION.EXECUTE, element: <VerificationExecutePage /> },
  ],
};
