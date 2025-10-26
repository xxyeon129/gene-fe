/**
 * @description 품질관리 대시보드 페이지
 */

import { DashboardHeader } from "./header";
import { ProjectManage } from "./section";
import { DataManage } from "./section/dataManage/DataManage";

export const DashboardPage = () => {
  return (
    <article>
      <DashboardHeader />

      {/* 프로젝트 관리 section */}
      <ProjectManage />
      {/* 데이터 업로드 및 관리 section */}
      <DataManage />
    </article>
  );
};
