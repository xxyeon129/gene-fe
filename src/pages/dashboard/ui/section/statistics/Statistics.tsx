import { StatisticsGraph } from "./statisticsGraph";
import { StatisticsList } from "./statisticsList";
import * as S from "./statistics.styles";

export const Statistics = () => {
  return (
    <S.Section>
      <S.CardArticle>
        <StatisticsList />
      </S.CardArticle>
      <S.CardArticle>
        <StatisticsGraph />
      </S.CardArticle>
    </S.Section>
  );
};
