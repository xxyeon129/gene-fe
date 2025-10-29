import { CommonWhiteBoxSection } from "@/shared";
import styled from "styled-components";

export const WhiteBoxSection = styled(CommonWhiteBoxSection)`
  width: 100%;
  height: fit-content;
  padding: 1.5rem;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const ProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ProjectItem = styled.li<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.colors.blue.primary : theme.colors.background.default)};
  border: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.blue.primary : theme.colors.border.gray)};
  color: ${({ $isActive, theme }) => ($isActive ? "white" : theme.colors.text.default)};
`;

export const ProjectItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
`;

export const ProjectItemSampleCount = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ProjectItemCurrentMissingValueRate = styled.p<{ $isActive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ $isActive }) => ($isActive ? "rgba(255, 255, 255, 0.3)" : "#FEE4E1")};
  color: ${({ $isActive }) => ($isActive ? "white" : "#D92D20")};
`;