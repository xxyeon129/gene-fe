/**
 * @description [품질검증 페이지] 레이아웃 컴포넌트
 */

import { Outlet, useLocation } from "react-router-dom";
import * as S from "./verificationLayout.styles";
import { PATH_URL } from "@/shared";
import { PageHeader } from "@/widgets";

const NAV_ITEMS = [
  { label: "📊 대시보드", to: PATH_URL.MAIN },
  { label: "⚙️ 품질 규칙 관리", to: PATH_URL.RULES },
  { label: "🔬 검증 실행", to: PATH_URL.VALIDATION },
];

export const VerificationLayout = () => {
  const currentPathname = useLocation().pathname;

  return (
    <S.VerificationLayoutArticle>
      <S.WhiteBoxSectionHeader>
        <PageHeader />
      </S.WhiteBoxSectionHeader>

      <S.WhiteBoxSectionNav>
        <S.WhiteBoxSectionNavList>
          {NAV_ITEMS.map((item) => (
            <S.WhiteBoxSectionNavItem key={item.to} $isActive={currentPathname === item.to}>
              <S.StyledLink to={item.to}>
                <span>{item.label}</span>
              </S.StyledLink>
            </S.WhiteBoxSectionNavItem>
          ))}
        </S.WhiteBoxSectionNavList>
      </S.WhiteBoxSectionNav>
      <Outlet />
    </S.VerificationLayoutArticle>
  );
};
