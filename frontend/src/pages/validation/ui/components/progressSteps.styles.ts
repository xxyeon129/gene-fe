import styled from "styled-components";

export const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background: #e5e7eb;
    z-index: -1;
  }
`;

export const ProgressStep = styled.div<{ $status: "completed" | "active" | "pending" }>`
  text-align: center;
  position: relative;
  flex: 1;
`;

export const ProgressCircle = styled.div<{ $status: "completed" | "active" | "pending" }>`
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-weight: 600;
  color: #9ca3af;

  ${({ $status }) => {
    if ($status === "completed") {
      return `
        background: #10b981;
        border-color: transparent;
        color: white;
      `;
    }
    if ($status === "active") {
      return `
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-color: transparent;
        color: white;
      `;
    }
    return "";
  }}
`;

export const ProgressLabel = styled.div`
  font-size: 13px;
  color: #64748b;
`;



