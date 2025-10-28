import styled from "styled-components";

const LogoStyle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.blue.primary};
  font-weight: 700;
`;

export const Logo = () => {
  return <LogoStyle>GENE-QC</LogoStyle>;
};
