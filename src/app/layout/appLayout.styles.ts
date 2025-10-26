import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Main = styled.main<{ $isNavVisible: boolean }>`
  width: ${({ $isNavVisible }) => ($isNavVisible ? "calc(100% - 15rem)" : "100%")};
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 2rem;
  padding-top: 2.5rem;
`;
