import { Outlet, useLocation } from "react-router-dom";
import { AppNav } from "./ui";
import * as S from "./appLayout.styles";

export const AppLayout = () => {
  const isNavVisible = useLocation().pathname === "/";

  return (
    <S.Layout>
      {isNavVisible && <AppNav />}
      <S.Main $isNavVisible={isNavVisible}>
        <Outlet />
      </S.Main>
    </S.Layout>
  );
};
