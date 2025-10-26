/**
 * @description 품질관리 대시보드 페이지
 */

import { DashboardHeader } from "./header";
import { ProjectManage } from "./section";

export const DashboardPage = () => {
  return (
    <article>
      <DashboardHeader />

      {/* 프로젝트 관리 section */}
      <ProjectManage />
    </article>
  );
};
