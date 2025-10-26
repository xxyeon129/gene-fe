/**
 * @description 좌측 네비게이션 컴포넌트
 */

import { PATH_URL } from "@/shared";
import * as S from "./appNav.styles";
import { FiHome } from "react-icons/fi";
import { PiMicroscopeBold } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";

const NAV_ITEMS = [
  { label: "대시보드", to: "/", icon: <FiHome /> },
  { label: "품질 검증", to: PATH_URL.VERIFICATION, icon: <PiMicroscopeBold /> },
  { label: "데이터 결측치", to: PATH_URL.MISSING_VALUE, icon: <SlGraph /> },
];

export const AppNav = () => {
  return (
    <S.Nav>
      <S.LogoContainer>
        <S.Logo>GENE-QC</S.Logo>
        <S.Description>유전체 품질관리 시스템</S.Description>
      </S.LogoContainer>

      <S.Ul>
        {NAV_ITEMS.map((item) => (
          <S.Li key={item.to}>
            <S.StyledLink to={item.to}>
              <S.Icon>{item.icon}</S.Icon>
              <S.Label>{item.label}</S.Label>
            </S.StyledLink>
          </S.Li>
        ))}
      </S.Ul>
    </S.Nav>
  );
};
