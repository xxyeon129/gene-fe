import { useState, useEffect } from "react";
import * as S from "./recommendations.styles";
import { apiClient } from "@/shared/api/client";

interface RecommendationsProps {
  selectedProjectId: number | null;
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

interface Recommendation {
  icon: string;
  title: string;
  description: string;
  type: "warning" | "info" | "success";
}

export const Recommendations = ({ selectedProjectId }: RecommendationsProps) => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      fetchValidationResult();
    }
  }, [selectedProjectId]);

  const fetchValidationResult = async () => {
    if (!selectedProjectId) return;

    try {
      setLoading(true);
      const response: any = await apiClient.executeValidation(selectedProjectId);
      const jobId = response.jobId;

      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const status: any = await apiClient.getValidationStatus(jobId);

        if (status.status === "completed") {
          setValidationResult(status.results);
          setLoading(false);
          return;
        } else if (status.status === "failed") {
          setLoading(false);
          return;
        }
        attempts++;
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch validation result:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <S.RecommendationsCard>
        <S.RecommendationsTitle>📋 권장 조치 사항</S.RecommendationsTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          권장사항을 불러오는 중...
        </div>
      </S.RecommendationsCard>
    );
  }

  if (!validationResult) {
    return (
      <S.RecommendationsCard>
        <S.RecommendationsTitle>📋 권장 조치 사항</S.RecommendationsTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          프로젝트를 선택하여 권장사항을 확인하세요.
        </div>
      </S.RecommendationsCard>
    );
  }

  // Generate recommendations based on validation result
  const recommendations: Recommendation[] = [];

  // Check for files needing imputation
  const filesNeedingImputation = validationResult.files.filter(f => f.nan_percentage > 10);
  if (filesNeedingImputation.length > 0) {
    const fileList = filesNeedingImputation.map(f => f.filename).join(", ");
    recommendations.push({
      icon: "⚠️",
      title: "데이터 보간 필요",
      description: `${filesNeedingImputation.length}개 파일에서 10% 이상의 결측치가 발견되었습니다. (${fileList}) Missing Value 페이지에서 멀티오믹스 보간을 실행하세요.`,
      type: "warning",
    });
  }

  // Check for high missing rate
  const totalNanCount = validationResult.files.reduce((acc, file) => acc + file.nan_count, 0);
  const totalValues = validationResult.files.reduce((acc, file) => acc + file.total_values, 0);
  const overallNanPercentage = totalValues > 0 ? (totalNanCount / totalValues * 100) : 0;

  if (overallNanPercentage > 30) {
    recommendations.push({
      icon: "💡",
      title: "데이터 품질 개선 권장",
      description: `전체 결측률이 ${overallNanPercentage.toFixed(1)}%로 높습니다. 원본 데이터의 측정 과정을 검토하거나 추가 샘플 수집을 고려하세요.`,
      type: "info",
    });
  }

  // Check if all passed
  if (validationResult.all_passed && filesNeedingImputation.length === 0) {
    recommendations.push({
      icon: "✅",
      title: "검증 완료",
      description: `모든 파일이 품질 기준을 통과했습니다. 데이터가 분석에 사용 가능한 상태입니다.`,
      type: "success",
    });
  }

  // Check for files with low missing rate
  const filesWithLowMissing = validationResult.files.filter(f => f.nan_percentage < 5);
  if (filesWithLowMissing.length > 0) {
    recommendations.push({
      icon: "✅",
      title: "우수한 데이터 품질",
      description: `${filesWithLowMissing.length}개 파일의 결측률이 5% 미만으로 매우 우수합니다. 추가 전처리 없이 분석에 활용할 수 있습니다.`,
      type: "success",
    });
  }

  // Default message if no specific recommendations
  if (recommendations.length === 0) {
    recommendations.push({
      icon: "📊",
      title: "검증 결과 확인",
      description: "검증이 완료되었습니다. 상세 결과를 확인하여 필요한 조치를 결정하세요.",
      type: "info",
    });
  }

  return (
    <S.RecommendationsCard>
      <S.RecommendationsTitle>📋 권장 조치 사항</S.RecommendationsTitle>
      <S.RecommendationsList>
        {recommendations.map((rec, index) => (
          <S.RecommendationItem key={index} $type={rec.type}>
            <S.RecommendationIcon>{rec.icon}</S.RecommendationIcon>
            <S.RecommendationContent>
              <S.RecommendationItemTitle>{rec.title}</S.RecommendationItemTitle>
              <S.RecommendationItemDescription>{rec.description}</S.RecommendationItemDescription>
            </S.RecommendationContent>
          </S.RecommendationItem>
        ))}
      </S.RecommendationsList>
    </S.RecommendationsCard>
  );
};



