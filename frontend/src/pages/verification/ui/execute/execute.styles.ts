import { cssBoxShadow, cssGradientBlueBackground } from "@/shared";
import styled from "styled-components";

export const PageArticle = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const VerificationStartButton = styled.button`
  padding: 0.7rem 2rem;
  ${cssGradientBlueBackground}
  color: white;
  border-radius: 0.6rem;
  font-size: 0.85rem;
  margin: 1rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${cssBoxShadow};
`;
