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

export const SliderWrapper = styled.div`
  width: 100%;
`;

export const SliderInput = styled.input`
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #0ea5e9;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 6px rgba(15, 118, 110, 0.35);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #0ea5e9;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 6px rgba(15, 118, 110, 0.35);
    cursor: pointer;
  }
`;
