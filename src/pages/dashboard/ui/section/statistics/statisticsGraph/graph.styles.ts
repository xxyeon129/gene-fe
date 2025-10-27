import styled from "styled-components";
import { CommonSection } from "../../section.styles";

export const GraphContainer = styled(CommonSection)`
  height: 36.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
`;

export const ChartWrapper = styled.div`
  height: 100%;
`;
