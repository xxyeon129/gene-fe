import styled from "styled-components";

export const PreviewPanel = styled.div`
  background: linear-gradient(135deg, #f0f9ff, #faf5ff);
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
`;

export const PreviewTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const PreviewItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PreviewIcon = styled.div<{ $bg: string; $color: string }>`
  width: 36px;
  height: 36px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const PreviewContent = styled.div`
  flex: 1;
`;

export const PreviewLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
`;

export const PreviewValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
`;

export const PreviewChange = styled.span<{ $type: "positive" | "negative" | "neutral" }>`
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 4px;

  ${({ $type }) => {
    if ($type === "positive") {
      return `
        background: #d1fae5;
        color: #065f46;
      `;
    }
    if ($type === "negative") {
      return `
        background: #fee2e2;
        color: #991b1b;
      `;
    }
    return `
      color: #64748b;
    `;
  }}
`;

export const RecommendationBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #10b981;
`;

export const RecommendationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #065f46;
`;

export const RecommendationText = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
`;

export const RecommendationNote = styled.div`
  margin-top: 12px;
  padding: 8px;
  background: #f0fdf4;
  border-radius: 6px;
  font-size: 12px;
  color: #15803d;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: ${({ $primary }) => ($primary ? 1 : "none")};

  ${({ $primary }) =>
    $primary
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      transform: translateY(-1px);
    }
  `
      : `
    background: #f1f5f9;
    color: #475569;
    
    &:hover {
      background: #e2e8f0;
    }
  `}
`;



