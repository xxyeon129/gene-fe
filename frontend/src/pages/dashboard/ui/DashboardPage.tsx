/**
 * @description 메인 대시보드 페이지
 */

import * as S from "./dashboardPage.styles";
import { StatCard } from "./components/StatCard";
import { RecentActivity } from "./components/RecentActivity";
import { QualityTrend } from "./components/QualityTrend";
import { apiClient } from "@/shared/api";
import type { Project } from "@/entities";
import { useEffect, useState } from "react";

interface DashboardStats {
  activeProjects: number;
  avgQuality: string;
  processedDatasets: number;
  avgMissingRate: string;
}

export const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [projectsData, statsData] = await Promise.all([
        apiClient.getProjects() as Promise<Project[]>,
        apiClient.getDashboardStats() as Promise<DashboardStats>,
      ]);
      setProjects(projectsData);
      setStats(statsData);
    };
    fetchData();
  }, []);

  return (
    <S.Section>
      <S.DashboardGrid>
        <StatCard value={stats?.activeProjects.toString() || "0"} label="활성 프로젝트" color="blue" />
        <StatCard value={stats?.avgQuality || "0%"} label="평균 데이터 품질" color="green" />
        <StatCard value={stats?.processedDatasets.toString() || "0"} label="처리된 데이터셋" color="yellow" />
        <StatCard value={stats?.avgMissingRate || "0%"} label="평균 결측률" color="purple" />
      </S.DashboardGrid>

      {/* 최근 활동 섹션 - 주석처리됨 */}
      {/* <S.Card>
        <S.CardHeader>
          <S.CardTitle>최근 활동</S.CardTitle>
          <S.Button $variant="secondary">전체 보기</S.Button>
        </S.CardHeader>
        <RecentActivity />
      </S.Card> */}

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
