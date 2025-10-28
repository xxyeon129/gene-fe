import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Main = styled.main<{ $isNavVisible: boolean }>`
  width: ${({ $isNavVisible }) => ($isNavVisible ? "calc(100% - 15rem)" : "100%")};
  margin-left: ${({ $isNavVisible }) => ($isNavVisible ? "15rem" : "0")};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: ${({ $isNavVisible }) => ($isNavVisible ? "2.5rem 2rem 5rem 2rem" : "0")};
`;
