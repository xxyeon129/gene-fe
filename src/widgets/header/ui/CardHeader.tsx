/**
 * @description [품질관리 대시보드 페이지] 각 섹션 헤더 UI 컴포넌트
 */

import { CommonBlueButton } from "@/shared";
import * as S from "./header.styles";

interface CardHeaderProps {
  title: string;
  titleIcon: React.ReactNode;
  description: string;

  hasButton?: boolean;
  buttonContent?: React.ReactNode;
}

export const CardHeader = ({ title, titleIcon, description, hasButton = false, buttonContent }: CardHeaderProps) => {
  return (
    <S.Header>
      <S.TitleWrapper>
        <S.Title>
          {titleIcon} {title}
        </S.Title>
        <S.Description>{description}</S.Description>
      </S.TitleWrapper>

      {hasButton && <CommonBlueButton>{buttonContent}</CommonBlueButton>}
    </S.Header>
  );
};
