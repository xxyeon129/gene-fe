/**
 * @description [품질관리 대시보드 페이지] 프로젝트 관리 섹션 UI 컴포넌트
 */

import * as S from "../section.styles";
import { ProjectList } from "./projects";
import { CardTitle } from "@/widgets";
import { LuFolderOpen } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

export const ProjectManage = () => {
  return (
    <S.CommonSection>
      <CardTitle
        title="프로젝트 관리"
        titleIcon={<LuFolderOpen />}
        description="품질관리를 수행할 프로젝트를 생성하고 관리합니다."
        hasButton={true}
        buttonContent={
          <>
            <LuPlus /> 새 프로젝트 생성
          </>
        }
      />
      <ProjectList />
    </S.CommonSection>
  );
};
