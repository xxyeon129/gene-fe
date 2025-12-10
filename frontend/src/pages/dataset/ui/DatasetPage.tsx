/**
 * @description 데이터셋 관리 페이지
 */

import { useRef } from "react";
import * as S from "./datasetPage.styles";
import { ProjectManage } from "./components/ProjectManage";
import type { ProjectManageRef } from "./components/ProjectManage";
import { DataInput } from "./components/DataInput";
import type { DataInputRef } from "./components/DataInput";

export const DatasetPage = () => {
  const projectManageRef = useRef<ProjectManageRef>(null);
  const dataInputRef = useRef<DataInputRef>(null);

  const handleFileUploaded = () => {
    // 파일 업로드 후 프로젝트 목록 갱신
    projectManageRef.current?.refreshProjects();
  };

  const handleProjectCreated = () => {
    // 프로젝트 생성 후 DataInput의 프로젝트 목록도 갱신
    dataInputRef.current?.refreshProjects();
  };

  return (
    <S.Section>
      <ProjectManage ref={projectManageRef} onProjectCreated={handleProjectCreated} />
      <DataInput ref={dataInputRef} onFileUploaded={handleFileUploaded} />
    </S.Section>
  );
};
