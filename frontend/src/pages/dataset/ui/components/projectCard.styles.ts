import styled from "styled-components";

export const ProjectCard = styled.div<{ $selected: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid ${({ $selected }) => ($selected ? "#667eea" : "#e5e7eb")};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${({ $selected }) =>
    $selected &&
    `
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
  `}

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`;

export const ProjectBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  background: #f0f9ff;
  color: #0284c7;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

export const ProjectName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const ProjectDescription = styled.p`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Tag = styled.span<{ $bg: string; $color: string }>`
  padding: 4px 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: 4px;
  font-size: 12px;
`;

export const ProjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 13px;
`;



