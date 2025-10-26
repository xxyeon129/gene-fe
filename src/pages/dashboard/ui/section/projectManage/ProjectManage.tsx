/**
 * @description 프로젝트 관리 섹션 UI 컴포넌트
 */

import * as S from "./projectManage.styles";
import { ProjectManageHeader } from "./header";
import { ProjectList } from "./projects";

export const ProjectManage = () => {
  return (
    <S.Section>
      <ProjectManageHeader />
      <ProjectList />
    </S.Section>
  );
};
