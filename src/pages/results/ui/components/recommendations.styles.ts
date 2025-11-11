import styled from "styled-components";

export const RecommendationsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const RecommendationsTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RecommendationItem = styled.div<{ $type: "warning" | "info" | "success" }>`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;

  ${({ $type }) => {
    if ($type === "warning") {
      return `background: #fef2f2;`;
    }
    if ($type === "info") {
      return `background: #fefce8;`;
    }
    return `background: #f0fdf4;`;
  }}
`;

export const RecommendationIcon = styled.span`
  font-size: 20px;
`;

export const RecommendationContent = styled.div`
  flex: 1;
`;

export const RecommendationItemTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

export const RecommendationItemDescription = styled.div`
  font-size: 13px;
  color: #64748b;
`;



