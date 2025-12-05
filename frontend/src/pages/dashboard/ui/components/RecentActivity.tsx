import { useEffect, useState } from "react";
import { apiClient } from "@/shared/api/client";
import * as S from "./recentActivity.styles";
import type { Project } from "@/entities";

interface Activity {
  project: string;
  dataType: string;
  quality: string;
  qualityColor: string;
  status: string;
  statusBg: string;
  statusColor: string;
  lastUpdate: string;
}

// 품질 점수에 따른 색상 결정
const getQualityColor = (score: number): string => {
  if (score >= 90) return "#10b981";
  if (score >= 80) return "#f59e0b";
  return "#ef4444";
};

// 검증 상태에 따른 스타일 결정
const getStatusStyle = (status: string): { bg: string; color: string } => {
  switch (status) {
    case "검증완료":
      return { bg: "#d1fae5", color: "#065f46" };
    case "처리중":
      return { bg: "#fef3c7", color: "#92400e" };
    case "작성중":
      return { bg: "#e0e7ff", color: "#3730a3" };
    default:
      return { bg: "#f3f4f6", color: "#374151" };
  }
};

export const RecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = (await apiClient.getProjects()) as Project[];

        // 프로젝트를 Activity 형식으로 변환하고 최신 3개만 선택
        const formattedActivities: Activity[] = projects.slice(0, 3).map((project) => {
          const statusStyle = getStatusStyle(project.validationStatus);
          return {
            project: project.name,
            dataType: project.dataType.join(", "),
            quality: `${project.qualityScore.toFixed(1)}%`,
            qualityColor: getQualityColor(project.qualityScore),
            status: project.validationStatus,
            statusBg: statusStyle.bg,
            statusColor: statusStyle.color,
            lastUpdate: project.lastUpdate,
          };
        });

        setActivities(formattedActivities);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("프로젝트를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <S.TableWrapper>
        <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>데이터를 불러오는 중...</div>
      </S.TableWrapper>
    );
  }

  if (error) {
    return (
      <S.TableWrapper>
        <div style={{ padding: "2rem", textAlign: "center", color: "#ef4444" }}>{error}</div>
      </S.TableWrapper>
    );
  }

  if (activities.length === 0) {
    return (
      <S.TableWrapper>
        <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>등록된 프로젝트가 없습니다.</div>
      </S.TableWrapper>
    );
  }

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <S.TableTh>프로젝트</S.TableTh>
            <S.TableTh>데이터 타입</S.TableTh>
            <S.TableTh>품질 점수</S.TableTh>
            <S.TableTh>상태</S.TableTh>
            <S.TableTh>마지막 업데이트</S.TableTh>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.project}</td>
              <td>{activity.dataType}</td>
              <td>
                <S.QualityScore $color={activity.qualityColor}>{activity.quality}</S.QualityScore>
              </td>
              <td>
                <S.StatusBadge $bg={activity.statusBg} $color={activity.statusColor}>
                  {activity.status}
                </S.StatusBadge>
              </td>
              <td>{activity.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};
