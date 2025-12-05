import * as S from "./recommendations.styles";

const recommendations = [
  {
    icon: "⚠️",
    title: "이상치 검토 필요",
    description: "156개의 이상치가 검출되었습니다. 수동 검토 후 처리 방법을 결정하세요.",
    type: "warning",
  },
  {
    icon: "💡",
    title: "추가 샘플 수집 권장",
    description: "통계적 검정력 향상을 위해 50개 이상의 추가 샘플 수집을 권장합니다.",
    type: "info",
  },
  {
    icon: "✅",
    title: "정규화 완료",
    description: "데이터 정규화가 성공적으로 완료되어 분석 준비가 완료되었습니다.",
    type: "success",
  },
];

export const Recommendations = () => {
  return (
    <S.RecommendationsCard>
      <S.RecommendationsTitle>📋 권장 조치 사항</S.RecommendationsTitle>
      <S.RecommendationsList>
        {recommendations.map((rec, index) => (
          <S.RecommendationItem key={index} $type={rec.type as "warning" | "info" | "success"}>
            <S.RecommendationIcon>{rec.icon}</S.RecommendationIcon>
            <S.RecommendationContent>
              <S.RecommendationItemTitle>{rec.title}</S.RecommendationItemTitle>
              <S.RecommendationItemDescription>{rec.description}</S.RecommendationItemDescription>
            </S.RecommendationContent>
          </S.RecommendationItem>
        ))}
      </S.RecommendationsList>
    </S.RecommendationsCard>
  );
};



