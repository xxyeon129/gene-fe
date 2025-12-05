/**
 * @description 데이터셋 관리 페이지
 */

import { useRef } from "react";
import * as S from "./datasetPage.styles";
import { ProjectManage } from "./components/ProjectManage";
import type { ProjectManageRef } from "./components/ProjectManage";
import { DataInput } from "./components/DataInput";

export const DatasetPage = () => {
  const projectManageRef = useRef<ProjectManageRef>(null);

  const handleFileUploaded = () => {
    // 파일 업로드 후 프로젝트 목록 갱신
    projectManageRef.current?.refreshProjects();
  };

  return (
    <S.Section>
      <ProjectManage ref={projectManageRef} />
      <DataInput onFileUploaded={handleFileUploaded} />
    </S.Section>
  );
};
