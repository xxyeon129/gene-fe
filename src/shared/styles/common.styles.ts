import styled from "styled-components";
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
