/**
 * @description 메인 대시보드 페이지
 */

import * as S from "./dashboardPage.styles";
import { StatCard } from "./components/StatCard";
import { RecentActivity } from "./components/RecentActivity";
import { QualityTrend } from "./components/QualityTrend";

export const DashboardPage = () => {
  return (
    <S.Section>
      <S.DashboardGrid>
        <StatCard
          value="12"
          label="활성 프로젝트"
          trend={{ type: "up", text: "↑ 20% 이번 달" }}
          color="blue"
        />
        <StatCard
          value="94.3%"
          label="평균 데이터 품질"
          trend={{ type: "up", text: "↑ 2.1% 향상" }}
          color="green"
        />
        <StatCard
          value="2,847"
          label="처리된 데이터셋"
          trend={{ type: "up", text: "↑ 156 신규" }}
          color="yellow"
        />
        <StatCard
          value="5.2%"
          label="평균 결측률"
          trend={{ type: "down", text: "↓ 3.4% 감소" }}
          color="purple"
        />
      </S.DashboardGrid>

      <S.Card>
        <S.CardHeader>
          <S.CardTitle>최근 활동</S.CardTitle>
          <S.Button $variant="secondary">전체 보기</S.Button>
        </S.CardHeader>
        <RecentActivity />
      </S.Card>

      <S.Card>
        <S.CardHeader>
          <S.CardTitle>품질 트렌드</S.CardTitle>
          <S.Select>
            <option>최근 7일</option>
            <option>최근 30일</option>
            <option>최근 90일</option>
          </S.Select>
        </S.CardHeader>
        <QualityTrend />
      </S.Card>
    </S.Section>
  );
};
