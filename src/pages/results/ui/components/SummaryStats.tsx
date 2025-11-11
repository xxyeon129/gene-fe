import * as S from "./summaryStats.styles";

const stats = [
  { value: "94.3%", label: "전체 품질 점수", color: "#10b981" },
  { value: "450", label: "검증된 샘플", color: "#3b82f6" },
  { value: "12", label: "발견된 이슈", color: "#f59e0b" },
  { value: "2.3%", label: "최종 결측률", color: "#8b5cf6" },
];

export const SummaryStats = () => {
  return (
    <S.StatsGrid>
      {stats.map((stat, index) => (
        <S.StatItem key={index}>
          <S.StatValue $color={stat.color}>{stat.value}</S.StatValue>
          <S.StatLabel>{stat.label}</S.StatLabel>
        </S.StatItem>
      ))}
    </S.StatsGrid>
  );
};



