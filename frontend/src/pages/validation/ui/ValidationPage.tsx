/**
 * @description 품질 검증 페이지
 */

import { useState, useEffect } from "react";
import * as S from "./validationPage.styles";
import { ProgressSteps } from "./components/ProgressSteps";
import { QualityMetrics } from "./components/QualityMetrics";
import { ValidationResults } from "./components/ValidationResults";
import { apiClient } from "@/shared/api/client";

interface Project {
  id: number;
  name: string;
}

interface ValidationResult {
  files: Array<{
    filename: string;
    total_values: number;
    nan_count: number;
    nan_percentage: number;
    shape: number[];
    passed: boolean;
  }>;
  total_files: number;
  passed_files: number;
  all_passed: boolean;
}

export const ValidationPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError("프로젝트 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteValidation = async () => {
    if (!selectedProjectId) {
      alert("프로젝트를 선택해주세요.");
      return;
    }

    try {
      setValidating(true);
      setError(null);
      setValidationResult(null);

      const response: any = await apiClient.executeValidation(selectedProjectId);
      const jobId = response.jobId;

      // Poll for status
      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const status: any = await apiClient.getValidationStatus(jobId);

        if (status.status === "completed") {
          setValidationResult(status.results);
          setValidating(false);
          return;
        } else if (status.status === "failed") {
          setError(status.error || "검증 실패");
          setValidating(false);
          return;
        }

        attempts++;
      }

      setError("검증 시간이 초과되었습니다.");
      setValidating(false);
    } catch (err) {
      console.error("Validation error:", err);
      setError(err instanceof Error ? err.message : "검증 중 오류가 발생했습니다.");
      setValidating(false);
    }
  };

  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>데이터 품질 검증</S.CardTitle>
          <S.HeaderActions>
            <S.Select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              disabled={loading || validating}
            >
              <option value="">프로젝트 선택</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </S.Select>
            <S.Button
              onClick={handleExecuteValidation}
              disabled={!selectedProjectId || validating}
            >
              {validating ? "검증 중..." : "검증 실행"}
            </S.Button>
          </S.HeaderActions>
        </S.CardHeader>

        {error && (
          <div style={{ padding: "1rem", backgroundColor: "#fee", color: "#c00", borderRadius: "4px", margin: "1rem" }}>
            ❌ {error}
          </div>
        )}

        {validating && (
          <div style={{ padding: "1rem", backgroundColor: "#e3f2fd", color: "#1976d2", borderRadius: "4px", margin: "1rem" }}>
            ⏳ 검증 작업이 진행 중입니다...
          </div>
        )}

        <ProgressSteps validationResult={validationResult} />
        <QualityMetrics validationResult={validationResult} />
      </S.Card>

      <S.Card>
        <S.CardHeader>
          <S.CardTitle>검증 상세 결과</S.CardTitle>
        </S.CardHeader>
        <ValidationResults validationResult={validationResult} />
      </S.Card>
    </S.Section>
  );
};



