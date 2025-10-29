import { MISSING_VALUE_PAGE_PROJECT_LIST } from "../../consts";
import * as S from "./selectProject.styles";

export const SelectProject = () => {
  return (
    <S.WhiteBoxSection>
      <S.Title>📂 프로젝트 선택</S.Title>
      <S.ProjectList>
        {MISSING_VALUE_PAGE_PROJECT_LIST.map((project) => (
          <S.ProjectItem key={project.label} $isActive={project.label === "Breast Cancer Imputation"}>
            <S.ProjectItemTitle>{project.label}</S.ProjectItemTitle>
            <S.ProjectItemSampleCount>{project.sampleCount.toLocaleString()} samples</S.ProjectItemSampleCount>
            <S.ProjectItemCurrentMissingValueRate $isActive={project.label === "Breast Cancer Imputation"}>
              현재 결측률: {project.currentMissingValueRate}%
            </S.ProjectItemCurrentMissingValueRate>
          </S.ProjectItem>
        ))}
      </S.ProjectList>
    </S.WhiteBoxSection>
  );
};