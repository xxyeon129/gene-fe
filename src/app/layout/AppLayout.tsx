import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as S from "./appLayout.styles";

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "main", label: "메인", path: "/" },
    { id: "dataset", label: "데이터셋", path: "/dataset" },
    { id: "rules", label: "검증규칙", path: "/rules" },
    { id: "validation", label: "품질검증", path: "/validation" },
    { id: "management", label: "품질관리", path: "/management" },
    { id: "results", label: "검증결과", path: "/results" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <S.Layout>
      <S.Navbar>
        <S.Logo>DataQC</S.Logo>
        <S.NavMenu>
          {navItems.map((item) => (
            <S.NavItem
              key={item.id}
              $active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </S.NavItem>
          ))}
        </S.NavMenu>
      </S.Navbar>
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Layout>
  );
};
