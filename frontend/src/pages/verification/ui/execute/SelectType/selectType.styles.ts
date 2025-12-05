import styled from "styled-components";
import { CommonWhiteBoxSection, cssGradientBlueBackground } from "@/shared";

export const WhiteBoxSection = styled(CommonWhiteBoxSection)`
  padding: 1.5rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const RadioOption = styled.div<{ $isSelected: boolean }>`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "transparent" : "#def1fe")};
  border-radius: 0.75rem;
  cursor: pointer;
  ${({ $isSelected }) => ($isSelected ? cssGradientBlueBackground : "background-color: transparent;")}
  transition: background-color 0.2s ease;
  font-weight: 700;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const RadioLabel = styled.label<{ $isSelected: boolean }>`
  font-size: 0.85rem;
  color: ${({ $isSelected, theme }) => ($isSelected ? "white" : theme.colors?.text?.default || "#000")};
  cursor: pointer;
  pointer-events: none;
  text-align: center;
`;
