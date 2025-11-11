/**
 * @description 검증 규칙 설정 페이지
 */

import * as S from "./rulesPage.styles";
import { BasicQualityIndicators } from "./components/BasicQualityIndicators";
import { AdvancedQualityIndicators } from "./components/AdvancedQualityIndicators";

export const RulesPage = () => {
  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>품질 검증 규칙 설정</S.CardTitle>
          <S.Button>+ 커스텀 규칙 추가</S.Button>
        </S.CardHeader>

        <S.Alert $type="info">
          <span>💡</span>
          <div>
            <div>기초/심화 품질지표 체계</div>
            <div>바이오뱅크 임상·유전체 데이터 항목 기반 품질지표 지표를 적용하여 데이터 품질을 검증합니다.</div>
          </div>
        </S.Alert>

        <S.SectionTitle>📊 기초품질지표 - 단일 모달리티 공통검증지표</S.SectionTitle>
        <BasicQualityIndicators />

        <S.SectionTitle>🎯 심화품질지표 - 멀티 모달리티 검증지표</S.SectionTitle>
        <AdvancedQualityIndicators />

        <S.SaveButtonContainer>
          <S.Button $fullWidth>💾 검증 규칙 저장 및 적용</S.Button>
        </S.SaveButtonContainer>
      </S.Card>
    </S.Section>
  );
};



