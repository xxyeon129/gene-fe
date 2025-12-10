import { useState, useEffect } from "react";
import * as S from "./dataAnalysis.styles";
import { apiClient } from "@/shared/api";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ValidationResult {
  files: Array<{
    filename: string;
    nan_percentage: number;
    nan_count: number;
    total_values: number;
    shape: [number, number];
  }>;
  all_passed: boolean;
}

interface OmicsData {
  type: string;
  missingRate: string;
  completeness: string;
  color: string;
  bg: string;
}

export const DataAnalysis = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [loadingValidation, setLoadingValidation] = useState(false);
  const [omicsData, setOmicsData] = useState<OmicsData[]>([
    { type: "Methyl", missingRate: "1%", completeness: "99%", color: "#10b981", bg: "#dbeafe" },
    { type: "RNA", missingRate: "20%", completeness: "80%", color: "#f59e0b", bg: "#fef3c7" },
    { type: "PRO", missingRate: "25%", completeness: "75%", color: "#ef4444", bg: "#ede9fe" },
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const data = await apiClient.getProjects() as Project[];
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchValidationResult();
    }
  }, [selectedProjectId]);

  const fetchValidationResult = async () => {
    if (!selectedProjectId) return;

    try {
      setLoadingValidation(true);
      const response: any = await apiClient.executeValidation(selectedProjectId);
      const jobId = response.jobId;

      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const status: any = await apiClient.getValidationStatus(jobId);

        if (status.status === "completed") {
          setValidationResult(status.results);
          updateOmicsDataFromValidation(status.results);
          break;
        } else if (status.status === "failed") {
          console.error("Validation failed:", status.error);
          break;
        }

        attempts++;
      }

      if (attempts >= maxAttempts) {
        console.error("Validation timeout");
      }
    } catch (err) {
      console.error("Failed to fetch validation result:", err);
    } finally {
      setLoadingValidation(false);
    }
  };

  const updateOmicsDataFromValidation = (result: ValidationResult) => {
    const getFileMetric = (type: string) => {
      return result.files.find(f =>
        f.filename.toLowerCase().includes(type.toLowerCase())
      );
    };

    const methylFile = getFileMetric("methy") || getFileMetric("methyl") || getFileMetric("methylation");
    const rnaFile = getFileMetric("rna");
    const proteinFile = getFileMetric("protein") || getFileMetric("pro");

    const newOmicsData: OmicsData[] = [];

    if (methylFile) {
      const completeness = 100 - methylFile.nan_percentage;
      newOmicsData.push({
        type: "Methyl",
        missingRate: `${methylFile.nan_percentage.toFixed(1)}%`,
        completeness: `${completeness.toFixed(1)}%`,
        color: methylFile.nan_percentage < 10 ? "#10b981" : methylFile.nan_percentage < 20 ? "#f59e0b" : "#ef4444",
        bg: methylFile.nan_percentage < 10 ? "#dbeafe" : methylFile.nan_percentage < 20 ? "#fef3c7" : "#fee2e2",
      });
    }

    if (rnaFile) {
      const completeness = 100 - rnaFile.nan_percentage;
      newOmicsData.push({
        type: "RNA",
        missingRate: `${rnaFile.nan_percentage.toFixed(1)}%`,
        completeness: `${completeness.toFixed(1)}%`,
        color: rnaFile.nan_percentage < 10 ? "#10b981" : rnaFile.nan_percentage < 20 ? "#f59e0b" : "#ef4444",
        bg: rnaFile.nan_percentage < 10 ? "#dbeafe" : rnaFile.nan_percentage < 20 ? "#fef3c7" : "#fee2e2",
      });
    }

    if (proteinFile) {
      const completeness = 100 - proteinFile.nan_percentage;
      newOmicsData.push({
        type: "PRO",
        missingRate: `${proteinFile.nan_percentage.toFixed(1)}%`,
        completeness: `${completeness.toFixed(1)}%`,
        color: proteinFile.nan_percentage < 10 ? "#10b981" : proteinFile.nan_percentage < 20 ? "#f59e0b" : "#ef4444",
        bg: proteinFile.nan_percentage < 10 ? "#dbeafe" : proteinFile.nan_percentage < 20 ? "#fef3c7" : "#fee2e2",
      });
    }

    if (newOmicsData.length > 0) {
      setOmicsData(newOmicsData);
    }
  };

  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon>📊</S.SettingIcon>
        <S.SettingTitle>데이터 현황 분석</S.SettingTitle>
      </S.SettingHeader>

      <S.FormGroup>
        <S.FormLabel>프로젝트 선택</S.FormLabel>
        <S.FormSelect
          value={selectedProjectId || ""}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
          disabled={loadingProjects}
        >
          <option value="">프로젝트를 선택하세요</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </S.FormSelect>
        {loadingProjects && <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>프로젝트 목록 로딩 중...</div>}
      </S.FormGroup>

      {loadingValidation && (
        <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
          검증 데이터 로딩 중...
        </div>
      )}

      <S.StatusContainer>
        <S.StatusTitle>오믹스별 결측 현황</S.StatusTitle>
        {omicsData.map((omics, index) => (
          <S.OmicsItem key={index}>
            <S.OmicsLeft>
              <S.OmicsBadge $bg={omics.bg} $color={omics.color}>{omics.type}</S.OmicsBadge>
              <div>
                <S.OmicsLabel>Missing Rate</S.OmicsLabel>
                <S.OmicsValue $color={omics.color}>{omics.missingRate}</S.OmicsValue>
              </div>
            </S.OmicsLeft>
            <S.OmicsRight>
              <S.OmicsLabel>완전성</S.OmicsLabel>
              <S.OmicsCompleteness $color={omics.color}>{omics.completeness}</S.OmicsCompleteness>
            </S.OmicsRight>
          </S.OmicsItem>
        ))}
        <S.Summary>
          <S.SummaryItem>
            <span>전체 평균 결측률</span>
            <S.SummaryValue $color={
              validationResult
                ? (validationResult.files.reduce((acc, f) => acc + f.nan_percentage, 0) / validationResult.files.length) < 10
                  ? "#10b981"
                  : (validationResult.files.reduce((acc, f) => acc + f.nan_percentage, 0) / validationResult.files.length) < 20
                    ? "#f59e0b"
                    : "#ef4444"
                : "#ef4444"
            }>
              {validationResult
                ? `${(validationResult.files.reduce((acc, f) => acc + f.nan_percentage, 0) / validationResult.files.length).toFixed(1)}%`
                : "데이터 없음"}
            </S.SummaryValue>
          </S.SummaryItem>
          <S.SummaryItem>
            <span>패턴 유형</span>
            <S.SummaryValue $color="#667eea">
              {validationResult
                ? validationResult.all_passed
                  ? "MCAR (완전 무작위)"
                  : "MAR (무작위 결측)"
                : "분석 필요"}
            </S.SummaryValue>
          </S.SummaryItem>
        </S.Summary>
      </S.StatusContainer>
    </S.SettingCard>
  );
};



