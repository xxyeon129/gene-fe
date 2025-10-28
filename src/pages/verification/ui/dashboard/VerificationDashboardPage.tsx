/**
 * @description 품질검증 대시보드드 페이지
 */

import * as S from "./dashboardPage.styles";
import { VerificationLayout } from "../../layout";

export const VerificationDashboardPage = () => {
  return (
    <VerificationLayout>
      <S.WhiteBoxSection>
        <h1>품질검증 대시보드</h1>
      </S.WhiteBoxSection>
    </VerificationLayout>
  );
};
