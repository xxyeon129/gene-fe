import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  height: 100vh;
  width: 15rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  padding-top: 2.2rem;
  border-right: 1px solid #f4f7fa;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

// top logo ========================================
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.blue.primary};
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.lightGray};
  font-weight: 600;
`;

// nav list ========================================
export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

// nav list item ========================================
export const Li = styled.li`
  background-color: ${({ theme }) => theme.colors.blue.primary};
  border-radius: 0.5rem;
  padding: 0.75rem 0.85rem;
  box-shadow: rgba(55, 125, 244, 0.5) 1px 3px 7px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 0.7rem;
  color: white;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  text-decoration: none;
`;
