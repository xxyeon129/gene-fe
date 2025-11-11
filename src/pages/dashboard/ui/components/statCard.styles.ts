import styled from "styled-components";

export const StatCard = styled.div<{ $color: "blue" | "green" | "yellow" | "purple" }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  transition: transform 0.2s;

  ${({ $color }) => {
    const colors = {
      blue: "#3b82f6",
      green: "#10b981",
      yellow: "#f59e0b",
      purple: "#8b5cf6",
    };
    return `border-left-color: ${colors[$color]};`;
  }}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 12px;
`;

export const StatTrend = styled.span<{ $type: "up" | "down" }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;

  ${({ $type }) =>
    $type === "up"
      ? `
    background: #d1fae5;
    color: #065f46;
  `
      : `
    background: #fee2e2;
    color: #991b1b;
  `}
`;



