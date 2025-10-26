/**
 * @description 품질관리 대시보드 페이지
 */

import { DashboardHeader } from "./header";
import { ProjectManage, DataManage, Statistics } from "./section";

export const DashboardPage = () => {
  return (
    <article>
      <DashboardHeader />

      {/* 프로젝트 관리 section */}
      <ProjectManage />
      {/* 데이터 업로드 및 관리 section */}
      <DataManage />
      {/* 통계 section */}
      <Statistics />
    </article>
  );
};
