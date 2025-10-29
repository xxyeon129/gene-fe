import { MISSING_VALUE_PAGE_DISTRIBUTION_LIST } from "@/pages/missingvalue/consts";
import * as S from "./distribution.styles";

export const MissingValueDistribution = () => {
  return (
    <S.DistributionContainer>
      <S.H2>결측률 분포</S.H2>
      <S.DistributionList>
        {MISSING_VALUE_PAGE_DISTRIBUTION_LIST.map((distribution) => (
          <S.DistributionItem key={distribution.range} $range={distribution.range}>
            <S.DistributionItemRange>{distribution.range}</S.DistributionItemRange>
            
            <S.StatusDistributionContainer>
              <S.DistributionItemValueWrapper>
                <S.DistributionItemValue>샘플: {distribution.sampleCount.toLocaleString()}개</S.DistributionItemValue>
                <S.DistributionItemValue>유전자: {distribution.geneCount.toLocaleString()}개</S.DistributionItemValue>
              </S.DistributionItemValueWrapper>
              <S.StatusBar>
                <S.StatusBarFill $fillPercentage={(distribution.sampleCount / distribution.geneCount) * 600} />
              </S.StatusBar>
            </S.StatusDistributionContainer>
          </S.DistributionItem>
        ))}
      </S.DistributionList>
    </S.DistributionContainer>
  );
};