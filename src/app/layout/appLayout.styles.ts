import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const Navbar = styled.nav`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-right: 48px;
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

export const NavItem = styled.button<{ $active: boolean }>`
  padding: 8px 20px;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "white" : "#64748b")};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#f1f5f9"};
    color: ${({ $active }) => ($active ? "white" : "#1e293b")};
  }
`;

export const Main = styled.main`
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  background: #f0f2f5;
  padding: 24px;
`;
