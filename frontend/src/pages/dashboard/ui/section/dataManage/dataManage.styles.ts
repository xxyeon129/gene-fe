import styled from "styled-components";
import { TbUpload } from "react-icons/tb";

export const DataManageArticle = styled.article`
  display: flex;
  column-gap: 2rem;
  margin-top: 1rem;
  padding-bottom: 2.5rem;
`;

export const DataManageSection = styled.section`
  width: 100%;
  height: 15rem;
  flex: 1;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
`;

// 데이터 업로드 ================================
export const DataUploadInput = styled.input`
  display: none;
`;

export const DataUploadLabel = styled.label`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.background.default};
  border: 2px dashed #cad4e0;
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const UploadIcon = styled(TbUpload)`
  font-size: 3rem;
  color: #5e6f87;
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

// 업로드된 데이터 ================================
export const UploadedDataList = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(1, 3fr);
  row-gap: 0.75rem;
  margin-top: 1rem;
`;

export const UploadedDataItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  border-radius: 0.75rem;

  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
`;

export const UploadedDataItemLeftContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
`;

export const UploadedDataInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UploadedDataItemName = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;

export const UploadedDataFileInfo = styled.div`
  display: flex;
  column-gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.lightGray};
`;

export const UploadedDataItemSize = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const UploadedDataItemCreatedAt = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const PreviewButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;

  display: flex;
  align-items: center;
  column-gap: 0.35rem;

  background-color: white;
  color: ${({ theme }) => theme.colors.text.gray};
  font-size: 0.85rem;
  border: 2px solid ${({ theme }) => theme.colors.border.gray};
  font-weight: 700;
`;
