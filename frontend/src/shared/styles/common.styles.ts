import styled, { css } from "styled-components";
import { cssBoxShadow } from "./commonCss.styles";

export const CommonBlueButton = styled.button`
  padding: 0.75rem 1.2rem;
  border-radius: 0.7rem;

  background-color: ${({ theme }) => theme.colors.blue.primary};
  border: 1px solid transparent;

  color: white;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${cssBoxShadow};

  svg {
    font-size: 1.2rem;
  }
`;

export const CommonWhiteBoxSection = styled.section<{ $alignCenter?: boolean }>`
  ${cssBoxShadow};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
  border-radius: 0.85rem;

  ${({ $alignCenter = false }) =>
    $alignCenter &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}
`;

export const GrayBackgroundBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.gray};
`;

export const GrayBackgroundBoxLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.gray};
`;

export const GrayBackgroundBoxValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 700;
`;

export const TopHeaderWrapperWhiteBox = styled(CommonWhiteBoxSection)`
  width: 100%;
  padding: 1rem 1.5rem;
`;

export const CommonWhiteBoxSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  > svg {
    font-size: 1.2rem;
  }
`;
