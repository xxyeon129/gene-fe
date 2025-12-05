import { CommonWhiteBoxSection } from "@/shared";
import styled from "styled-components";

export const PageArticle = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const BoxSection = styled(CommonWhiteBoxSection)<{ $isGrayBackgroundColor?: boolean }>`
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme, $isGrayBackgroundColor = false }) => ($isGrayBackgroundColor ? theme.colors.background.default : "white")};
`;
