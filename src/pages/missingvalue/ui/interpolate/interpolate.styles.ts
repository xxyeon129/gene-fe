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

export const InterpolateSettingList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const InterpolateSettingItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const SliderTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InterpolateSettingItemLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
`;

export const SliderPercentage = styled.div<{ $isBlue?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  color: ${({ theme, $isBlue }) => ($isBlue ? theme.colors.blue.primary : "#DA1D1D")};
  background-color: ${({ $isBlue, theme }) => ($isBlue ? theme.colors.background.skyBlue : "#FEE2E2")};
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
  width: fit-content;
`;

export const InterpolateSettingItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const SkyBlueDescriptionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.skyBlue};
  color: ${({ theme }) => theme.colors.blue.primary};
  border: 2px solid #c4eafd;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
`;

export const SkyBlueDescriptionTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  color: #1070a7;
`;

export const SkyBlueDescriptionContent = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: #2193ce;
  margin-top: 0.5rem;
`;
