import styled from "styled-components";
import { cssCard } from "@/shared";

export const ProjectList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 1rem;

  margin-top: 1rem;
`;

export const ProjectItem = styled.li`
  ${cssCard}
  padding: 1.25rem;

  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid #e5ebf2;

  row-gap: 0.5rem;
`;

// project item header =============================================
export const ProjectItemHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const ProjectItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`;

export const ProjectItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
`;

export const ProjectItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  font-weight: 600;
`;

export const ProjectItemStatus = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.gray};

  width: 4rem;
  height: fit-content;
  padding: 0.25rem 0;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.35rem;

  color: ${({ $status }) => {
    if ($status === "진행중") return "#065F46";
    if ($status === "완료") return "#6E778D";
  }};

  background-color: ${({ $status }) => {
    if ($status === "진행중") return "#D1FAE5";
    if ($status === "완료") return "#F1F5F9";
  }};

  svg {
    font-size: ${({ $status }) => ($status === "진행중" ? "0.5rem" : "0.65rem")};
  }
`;

// project item content =============================================
export const ProjectItemContent = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  margin-top: 1rem;
`;

export const ProjectItemContentItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 0.5rem;

  background-color: white;
`;

export const ProjectItemContentItemTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.lightGray};
  font-weight: 600;
`;

export const ProjectItemContentItemValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
`;

// project item footer =============================================
export const ProjectItemBottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 0.3rem;
`;

export const CurrentStatus = styled.div<{ $status: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: 0.5rem;

  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;

  color: ${({ $status }) => {
    if ($status === "진행중") return "#1D3EB6";
    if ($status === "대기") return "#9F5930";
    if ($status === "완료") return "#065F46";
  }};

  background-color: ${({ $status }) => {
    if ($status === "진행중") return "#DBEAFE";
    if ($status === "대기") return "#FEF3C7";
    if ($status === "완료") return "#D1FAE5";
  }};

  svg {
    font-size: ${({ $status }) => ($status === "진행중" ? "1rem" : "0.65rem")};
  }
`;

export const Date = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.lightGray};
`;
