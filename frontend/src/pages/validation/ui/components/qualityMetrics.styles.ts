import styled from "styled-components";

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const MetricIcon = styled.div<{ $bg: string }>`
  width: 40px;
  height: 40px;
  background: ${({ $bg }) => $bg};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const MetricTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

export const MetricValue = styled.div<{ $color: string }>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 20px 0;
`;

export const MetricInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #64748b;
`;



