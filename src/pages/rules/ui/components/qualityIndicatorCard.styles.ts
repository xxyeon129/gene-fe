import styled from "styled-components";

export const SettingCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SettingIcon = styled.div<{ $bg: string; $color: string }>`
  width: 40px;
  height: 40px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const SettingTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

export const SettingDescription = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const CompletenessBox = styled.div<{ $bg: string; $color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: ${({ $bg }) => $bg};
  border-radius: 8px;
  margin: 12px 0;

  > span:first-child {
    font-size: 14px;
    color: ${({ $color }) => $color};
  }

  > span:last-child {
    font-size: 20px;
    font-weight: 700;
    color: ${({ $color }) => $color};
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

export const CodeTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 12px;
  font-family: "Courier New", monospace;
  transition: all 0.2s;
  background: white;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;



