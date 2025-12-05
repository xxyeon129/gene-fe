import * as S from "./statCard.styles";

interface StatCardProps {
  value: string;
  label: string;
  trend: { type: "up" | "down"; text: string };
  color: "blue" | "green" | "yellow" | "purple";
}

export const StatCard = ({ value, label, trend, color }: StatCardProps) => {
  return (
    <S.StatCard $color={color}>
      <S.StatValue>{value}</S.StatValue>
      <S.StatLabel>{label}</S.StatLabel>
      <S.StatTrend $type={trend.type}>{trend.text}</S.StatTrend>
    </S.StatCard>
  );
};



