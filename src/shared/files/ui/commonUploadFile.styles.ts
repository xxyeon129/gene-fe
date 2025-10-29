import styled, { css } from "styled-components";
import { TbUpload } from "react-icons/tb";
import { FiFileText } from "react-icons/fi";

export const DataUploadInput = styled.input`
  display: none;
`;

export const DataUploadLabel = styled.label<{ $isBlue: boolean; $padding: string }>`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  background-color: ${({ theme, $isBlue }) => ($isBlue ? theme.colors.background.skyBlue : theme.colors.background.default)};
  border: 2px dashed ${({ $isBlue }) => ($isBlue ? "#B4E4FD" : "#cad4e0")};
  border-radius: 1rem;
  padding: ${({ $padding }) => $padding};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const IconStyle = css`
  font-size: 3rem;
`;

export const UploadIcon = styled(TbUpload)`
  ${IconStyle}
  color: #5e6f87;
`;

export const FileIcon = styled(FiFileText)`
  ${IconStyle}
  color: #0284C7;
`;

export const UploadText = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  color: #5e6f87;
`;

export const UploadDescription = styled.p`
  margin-top: 0.75rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  column-gap: 0.5rem;
`;

export const Button = styled.button<{ $isBlue: boolean }>`
  padding: 0.75rem 1.2rem;
  border-radius: 0.5rem;
  background-color: ${({ $isBlue, theme }) => ($isBlue ? theme.colors.blue.primary : "white")};
  color: ${({ $isBlue }) => ($isBlue ? "white" : "#5e6f87")};
  border: 2px solid ${({ $isBlue, theme }) => ($isBlue ? "transparent" : theme.colors.border.gray)};
  font-weight: 700;
`;
