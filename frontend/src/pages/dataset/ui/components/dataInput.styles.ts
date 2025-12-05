import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const TabItem = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#667eea" : "#64748b")};
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #1e293b;
  }

  ${({ $active }) =>
    $active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #667eea;
    }
  `}
`;

export const TabContent = styled.div`
  display: block;
`;

export const Alert = styled.div<{ $type: "info" | "success" | "warning" | "danger" }>`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: start;
  gap: 12px;

  ${({ $type }) => {
    const styles = {
      info: {
        background: "#eff6ff",
        borderLeft: "4px solid #3b82f6",
      },
      success: {
        background: "#f0fdf4",
        borderLeft: "4px solid #10b981",
      },
      warning: {
        background: "#fffbeb",
        borderLeft: "4px solid #f59e0b",
      },
      danger: {
        background: "#fef2f2",
        borderLeft: "4px solid #ef4444",
      },
    };
    return styles[$type];
  }}

  > div {
    flex: 1;

    > div:first-child {
      font-weight: 600;
      margin-bottom: 4px;
      color: #1f2937;
    }

    > div:last-child {
      font-size: 14px;
      color: #4b5563;
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transform: translateY(-1px);
  }
`;

export const UploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  background: #f9fafb;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: #f0f9ff;
  }
`;

export const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #9ca3af;
`;

export const UploadTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

export const UploadSubtitle = styled.div`
  font-size: 14px;
  color: #6b7280;
`;



