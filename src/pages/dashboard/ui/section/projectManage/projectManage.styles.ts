import { cssCard } from "@/shared";
import styled from "styled-components";

export const Section = styled.section`
  ${cssCard}
  margin-top: 2rem;

  background-color: white;
  border: 2px solid ${({ theme }) => theme.colors.border.lightGray};
  box-shadow: rgba(55, 125, 244, 0.05) 1px 3px 6px;

  row-gap: 1rem;
`;

// project list =============================================
