import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.gray};
  font-weight: 600;
`;

export const GoToDashboardButton = styled(Link)`
  background-color: white;
  color: ${({ theme }) => theme.colors.text.gray};
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    font-size: 0.7rem;
  }
`;
