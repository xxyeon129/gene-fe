
import * as S from "./analysis.styles";
import { MissingValueDistribution } from "./distribution";
import { MissingValueSummary } from "./summary";

export const AnalysisMissingValue = () => {
  return (
    <S.WhiteBoxSection>
      <S.H1>📊 현재 데이터 결측치 분석</S.H1>
      
      <MissingValueSummary />
      <MissingValueDistribution />
    </S.WhiteBoxSection>
  );
};