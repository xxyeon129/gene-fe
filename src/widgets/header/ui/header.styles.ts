import styled from "styled-components";

export const Header = styled.header`
  display: flex;

  justify-content: space-between;
  gap: 0.5rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.gray};
  font-weight: 600;
`;
