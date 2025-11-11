/**
 * @description 품질 검증 페이지
 */

import * as S from "./validationPage.styles";
import { ProgressSteps } from "./components/ProgressSteps";
import { QualityMetrics } from "./components/QualityMetrics";
import { ValidationResults } from "./components/ValidationResults";

export const ValidationPage = () => {
  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>데이터 품질 검증</S.CardTitle>
          <S.HeaderActions>
            <S.Select>
              <option>암 유전체 프로젝트</option>
              <option>알츠하이머 연구</option>
              <option>심혈관 질환 코호트</option>
            </S.Select>
            <S.Button>검증 실행</S.Button>
          </S.HeaderActions>
        </S.CardHeader>

        <ProgressSteps />
        <QualityMetrics />
      </S.Card>

      <S.Card>
        <S.CardHeader>
          <S.CardTitle>검증 상세 결과</S.CardTitle>
        </S.CardHeader>
        <ValidationResults />
      </S.Card>
    </S.Section>
  );
};



