import * as S from "./previewResults.styles";

const previewItems = [
  {
    icon: "📉",
    label: "결측률 개선",
    value: "15.3% → 1.2%",
    change: "-14.1% 감소",
    changeType: "positive",
    iconBg: "#d1fae5",
    iconColor: "#10b981",
  },
  {
    icon: "📊",
    label: "데이터 품질",
    value: "97.3%",
    change: "MOCHI 정확도",
    changeType: "positive",
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
  },
  {
    icon: "🔍",
    label: "크로스 모달리티",
    value: "3개 통합",
    change: "DNA+RNA+Protein",
    changeType: "positive",
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
  },
  {
    icon: "⚡",
    label: "예상 처리 시간",
    value: "~3분 45초",
    change: "GPU 가속 사용",
    changeType: "neutral",
    iconBg: "#ede9fe",
    iconColor: "#8b5cf6",
  },
];

export const PreviewResults = () => {
  return (
    <S.PreviewPanel>
      <S.PreviewTitle>
        <span>✨</span> 보간 시뮬레이션 결과
      </S.PreviewTitle>

      <S.PreviewGrid>
        {previewItems.map((item, index) => (
          <S.PreviewItem key={index}>
            <S.PreviewIcon $bg={item.iconBg} $color={item.iconColor}>
              {item.icon}
            </S.PreviewIcon>
            <S.PreviewContent>
              <S.PreviewLabel>{item.label}</S.PreviewLabel>
              <S.PreviewValue>{item.value}</S.PreviewValue>
              <S.PreviewChange $type={item.changeType as "positive" | "negative" | "neutral"}>
                {item.change}
              </S.PreviewChange>
            </S.PreviewContent>
          </S.PreviewItem>
        ))}
      </S.PreviewGrid>

      <S.RecommendationBox>
        <S.RecommendationTitle>🎯 MOCHI 모델 추천</S.RecommendationTitle>
        <S.RecommendationText>
          멀티오믹스 데이터 패턴 분석 결과, <strong>MOCHI Imputation Model</strong>이 가장 적합합니다.
          DNA(99%), RNA(80%), Protein(75%)의 서로 다른 완전성 수준을 고려하여 크로스 모달리티 정보를
          활용한 보간이 가능하며, 예상 정확도는 <strong>97.3%</strong>입니다.
        </S.RecommendationText>
        <S.RecommendationNote>
          <span>✅</span>
          <span>proMODMatcher와 BatchEval을 통한 검증 후 적용을 권장합니다.</span>
        </S.RecommendationNote>
      </S.RecommendationBox>

      <S.ActionButtons>
        <S.Button $primary>🚀 보간 실행</S.Button>
        <S.Button>⚙️ 고급 설정</S.Button>
      </S.ActionButtons>
    </S.PreviewPanel>
  );
};



