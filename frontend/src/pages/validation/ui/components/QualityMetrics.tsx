import * as S from "./qualityMetrics.styles";

const metrics = [
  {
    icon: "🧬",
    title: "DNA 완전성",
    value: "99%",
    valueColor: "#10b981",
    missingRate: "1%",
    status: "우수",
    iconBg: "#dbeafe",
  },
  {
    icon: "🧪",
    title: "RNA 완전성",
    value: "80%",
    valueColor: "#f59e0b",
    missingRate: "20%",
    status: "양호",
    iconBg: "#fef3c7",
  },
  {
    icon: "🔬",
    title: "Protein 완전성",
    value: "75%",
    valueColor: "#ef4444",
    missingRate: "25%",
    status: "주의",
    iconBg: "#ede9fe",
  },
  {
    icon: "✅",
    title: "샘플 정확성",
    value: "98.5%",
    valueColor: "#10b981",
    matchingRate: "443/450",
    status: "우수",
    iconBg: "#d1fae5",
  },
];

export const QualityMetrics = () => {
  return (
    <S.MetricsGrid>
      {metrics.map((metric, index) => (
        <S.MetricCard key={index}>
          <S.MetricHeader>
            <S.MetricIcon $bg={metric.iconBg}>{metric.icon}</S.MetricIcon>
            <S.MetricTitle>{metric.title}</S.MetricTitle>
          </S.MetricHeader>
          <S.MetricValue $color={metric.valueColor}>{metric.value}</S.MetricValue>
          <S.MetricInfo>
            {metric.missingRate && <span>Missing Rate: {metric.missingRate}</span>}
            {metric.matchingRate && <span>매칭률: {metric.matchingRate}</span>}
            <span>상태: {metric.status}</span>
          </S.MetricInfo>
        </S.MetricCard>
      ))}
    </S.MetricsGrid>
  );
};



