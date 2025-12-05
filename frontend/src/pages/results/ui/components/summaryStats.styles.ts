import styled from "styled-components";

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
`;

export const StatValue = styled.div<{ $color: string }>`
  font-size: 28px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-top: 8px;
`;



