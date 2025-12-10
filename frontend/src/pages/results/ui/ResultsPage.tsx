/**
 * @description 검증 결과 페이지
 */

import { useState, useEffect } from "react";
import * as S from "./resultsPage.styles";
import { SummaryStats } from "./components/SummaryStats";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { Recommendations } from "./components/Recommendations";
import { apiClient } from "@/shared/api/client";

interface Project {
  id: number;
  name: string;
}

export const ResultsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getProjects() as Project[];
      setProjects(data);
      if (data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!selectedProjectId) {
      alert("프로젝트를 먼저 선택해주세요.");
      return;
    }

    try {
      setDownloading(true);
      const url = `http://localhost:8005/api/validation/download-report/${selectedProjectId}`;
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to download report:", err);
      alert("결과 보고서 다운로드에 실패했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>품질 검증 결과 보고서</S.CardTitle>
          <S.HeaderActions>
            <S.Select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              disabled={loading}
            >
              <option value="">프로젝트 선택</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </S.Select>
            <S.Button
              $variant="danger"
              onClick={handleDownloadReport}
              disabled={!selectedProjectId || downloading}
            >
              📥 {downloading ? "다운로드 중..." : "결과보고서 다운로드"}
            </S.Button>
          </S.HeaderActions>
        </S.CardHeader>

        <S.Alert $type="success">
          <span>✅</span>
          <div>
            <div>검증 완료</div>
            <div>품질 검증이 성공적으로 완료되었습니다. 프로젝트를 선택하여 결과를 확인하세요.</div>
          </div>
        </S.Alert>

        <SummaryStats selectedProjectId={selectedProjectId} />
        <ProcessTimeline selectedProjectId={selectedProjectId} />
        <Recommendations selectedProjectId={selectedProjectId} />
      </S.Card>
    </S.Section>
  );
};



