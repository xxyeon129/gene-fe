import { CommonBlueButton } from "@/shared";
import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DateText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
  font-weight: 700;
  margin-top: 0.25rem;
`;

export const ButtonContainer = styled.section`
  display: flex;
  gap: 0.75rem;
`;

export const WhiteButton = styled(CommonBlueButton)`
  background-color: white;
  color: ${({ theme }) => theme.colors.text.gray};
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
`;
