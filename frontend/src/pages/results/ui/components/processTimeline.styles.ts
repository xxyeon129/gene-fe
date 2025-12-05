import styled from "styled-components";

export const TimelineCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const TimelineTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const TimelineContainer = styled.div`
  position: relative;
  padding-left: 40px;

  &::before {
    content: "";
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e5e7eb;
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TimelineDot = styled.div<{ $status: "completed" | "warning" | "pending" }>`
  position: absolute;
  left: -35px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid white;
  z-index: 1;

  ${({ $status }) => {
    if ($status === "completed") {
      return `background: #10b981;`;
    }
    if ($status === "warning") {
      return `background: #f59e0b;`;
    }
    return `background: #e5e7eb;`;
  }}
`;

export const TimelineContent = styled.div`
  position: relative;
`;

export const TimelineItemTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const TimelineItemTime = styled.div`
  font-size: 13px;
  color: #64748b;
`;



