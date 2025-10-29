import { cssWithoutNavFullPage } from "@/shared";
import styled from "styled-components";

export const MissingValuePageArticle = styled.article`
  ${cssWithoutNavFullPage}

  display: flex;
  row-gap: 1.5rem;
`;

export const ContentWrapper = styled.article`
  display: flex;
  column-gap: 1rem;
`;

export const LeftContentWrapper = styled.section`
  width: 30%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`
export const RightContentWrapper = styled.section`
  width: 70%;
`;