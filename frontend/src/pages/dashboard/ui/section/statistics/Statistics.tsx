import { StatisticsGraph } from "./statisticsGraph";
import { StatisticsList } from "./statisticsList";
import * as S from "./statistics.styles";

export const Statistics = () => {
  return (
    <S.Section>
      <StatisticsList />
      <StatisticsGraph />
    </S.Section>
  );
};
