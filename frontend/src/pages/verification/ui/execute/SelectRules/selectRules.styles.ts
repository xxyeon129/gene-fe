import styled from "styled-components";
import { CommonWhiteBoxSection } from "@/shared";

export const WhiteBoxSection = styled(CommonWhiteBoxSection)`
  padding: 1.5rem;
`;

export const RuleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  /* display: flex;
  flex-direction: column;
  row-gap: 1rem; */
  margin-top: 1.5rem;
  list-style: none;
  padding: 0;
`;

export const RuleItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
  border-radius: 0.75rem;
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.background.default : "white")};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

export const RuleItemContent = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  width: 100%;
`;

export const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #5f5f5f;
`;

export const RuleItemLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};

  .rule-item-label-text {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 700;
  }

  .rule-item-label-category {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.gray};
  }
`;
