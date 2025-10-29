import { CommonWhiteBoxSection, cssGradientBlueBackground } from "@/shared";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const VerificationLayoutArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  row-gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background.skyBlue};
  padding-bottom: 5rem;
`;

export const WhiteBoxSectionHeader = styled(CommonWhiteBoxSection)`
  width: 100%;
  padding: 1rem 1.5rem;
`;

export const WhiteBoxSectionNav = styled(CommonWhiteBoxSection)`
  width: 100%;
  height: fit-content;
  padding: 0.3rem;
  margin-bottom: 1rem;
`;

export const WhiteBoxSectionNavList = styled.ul`
  display: flex;
  justify-content: space-between;
  column-gap: 0.5rem;
`;

export const WhiteBoxSectionNavItem = styled.li<{ $isActive: boolean }>`
  text-align: center;
  flex: 1;
  ${({ $isActive }) => ($isActive ? cssGradientBlueBackground : "background-color: transparent;")}
  border-radius: 0.75rem;
  color: ${({ $isActive, theme }) => ($isActive ? "white" : theme.colors.text.default)};
  padding: 0.75rem 0.85rem;
`;

export const StyledLink = styled(Link)`
  text-align: center;
  font-weight: 600;
`;
