import styled from "styled-components";

export const Section = styled.section`
  display: block;
  padding: 24px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

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

export const Button = styled.button<{ $fullWidth?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transform: translateY(-1px);
  }
`;

export const Alert = styled.div<{ $type: "info" | "success" | "warning" | "danger" }>`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: start;
  gap: 12px;
  background: #eff6ff;
  border-left: 4px solid #3b82f6;

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

export const SectionTitle = styled.h3`
  margin: 24px 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

export const SaveButtonContainer = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff, #faf5ff);
  border-radius: 8px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;



