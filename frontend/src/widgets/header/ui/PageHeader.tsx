import * as S from "./header.styles";
import { Logo } from "./logo";
import { FaArrowLeft } from "react-icons/fa6";

export const PageHeader = () => {
  return (
    <S.PageHeader>
      <S.LeftWrapper>
        <Logo />
        <S.SubTitle>| 🔬 Imputation 품질관리</S.SubTitle>
      </S.LeftWrapper>
      <S.GoToDashboardButton to="/">
        <FaArrowLeft />
        대시보드로 돌아가기
      </S.GoToDashboardButton>
    </S.PageHeader>
  );
};
