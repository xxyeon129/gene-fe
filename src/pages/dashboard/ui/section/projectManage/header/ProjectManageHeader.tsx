import { CommonBlueButton } from "@/shared";
import * as S from "./header.styles";
import { LuFolderOpen } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

export const ProjectManageHeader = () => {
  return (
    <S.Header>
      <S.TitleWrapper>
        <S.Title>
          <LuFolderOpen /> 프로젝트 관리
        </S.Title>
        <S.Description>품질관리를 수행할 프로젝트를 생성하고 관리합니다.</S.Description>
      </S.TitleWrapper>
      <CommonBlueButton>
        <LuPlus /> 새 프로젝트 생성
      </CommonBlueButton>
    </S.Header>
  );
};
