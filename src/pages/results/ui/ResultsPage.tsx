/**
 * @description 검증 결과 페이지
 */

import * as S from "./resultsPage.styles";
import { SummaryStats } from "./components/SummaryStats";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { Recommendations } from "./components/Recommendations";

export const ResultsPage = () => {
  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>품질 검증 결과 보고서</S.CardTitle>
          <S.HeaderActions>
            <S.Select>
              <option>암 유전체 프로젝트</option>
              <option>알츠하이머 연구</option>
              <option>심혈관 질환 코호트</option>
            </S.Select>
            <S.Button $variant="danger">📄 PDF 내보내기</S.Button>
          </S.HeaderActions>
        </S.CardHeader>

        <S.Alert $type="success">
          <span>✅</span>
          <div>
            <div>검증 완료</div>
            <div>2024년 1월 15일 14:32에 품질 검증이 성공적으로 완료되었습니다.</div>
          </div>
        </S.Alert>

        <SummaryStats />
        <ProcessTimeline />
        <Recommendations />
      </S.Card>
    </S.Section>
  );
};



