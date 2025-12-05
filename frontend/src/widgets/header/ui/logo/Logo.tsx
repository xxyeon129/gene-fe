import styled from "styled-components";

const LogoStyle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  background: linear-gradient(to right, #39b7f8, #3a85f6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

export const Logo = () => {
  return <LogoStyle>GENE-QC</LogoStyle>;
};
