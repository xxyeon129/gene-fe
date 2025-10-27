import styled from "styled-components";
import { CommonSection } from "../../section.styles";

export const DataStatisticsContainer = styled(CommonSection)`
  height: 36.5rem;
`;

export const DataStatisticsUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DataStatisticsLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  border-radius: 0.75rem;

  background-color: ${({ theme }) => theme.colors.background.default};
  border: 2px solid ${({ theme }) => theme.colors.border.gray};
`;

export const DataStatisticsItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const DataStatisticsItemValue = styled.p<{ color?: string }>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  color: ${({ color }) => color || "black"};
`;

export const StatisticsNumberItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StatisticsNumberItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const StatisticsNumberItemValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

export const DataTypeUl = styled.ul`
  display: flex;
  column-gap: 0.4rem;
`;

export const DataTypeLi = styled.li`
  background-color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.border.gray};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 800;
  color: rgb(109, 109, 109);
`;
