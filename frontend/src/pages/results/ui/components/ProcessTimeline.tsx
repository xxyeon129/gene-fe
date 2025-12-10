import { useState, useEffect } from "react";
import * as S from "./processTimeline.styles";
import { apiClient } from "@/shared/api/client";

interface ProcessTimelineProps {
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

export const ProcessTimeline = ({ selectedProjectId }: ProcessTimelineProps) => {
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
      <S.TimelineCard>
        <S.TimelineTitle>검증 프로세스 타임라인</S.TimelineTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          검증 결과를 불러오는 중...
        </div>
      </S.TimelineCard>
    );
  }

  if (!validationResult) {
    return (
      <S.TimelineCard>
        <S.TimelineTitle>검증 프로세스 타임라인</S.TimelineTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          프로젝트를 선택하여 검증 프로세스를 확인하세요.
        </div>
      </S.TimelineCard>
    );
  }

  // Calculate timeline items from validation result
  const totalSamples = validationResult.files.reduce((acc, file) => {
    return Math.max(acc, file.shape[1] || 0);
  }, 0);

  const totalVariables = validationResult.files.reduce((acc, file) => {
    return acc + (file.shape[0] || 0);
  }, 0);

  const totalNanCount = validationResult.files.reduce((acc, file) => acc + file.nan_count, 0);
  const totalValues = validationResult.files.reduce((acc, file) => acc + file.total_values, 0);
  const overallNanPercentage = totalValues > 0 ? (totalNanCount / totalValues * 100).toFixed(1) : "0.0";

  const currentTime = new Date();
  const formatTime = (offsetSeconds: number) => {
    const time = new Date(currentTime.getTime() - offsetSeconds * 1000);
    return time.toTimeString().split(' ')[0];
  };

  const timelineItems = [
    {
      title: "데이터 로딩 완료",
      time: `${formatTime(3)} - ${totalSamples}개 샘플, ${totalVariables.toLocaleString()}개 변수`,
      status: "completed",
    },
    {
      title: "품질 검증 수행",
      time: `${formatTime(2)} - ${validationResult.total_files}개 파일 검증 완료`,
      status: "completed",
    },
    {
      title: "결측치 분석",
      time: `${formatTime(1)} - 전체 ${overallNanPercentage}% 결측 확인`,
      status: parseFloat(overallNanPercentage) > 10 ? "warning" : "completed",
    },
    {
      title: "최종 검증 완료",
      time: `${formatTime(0)} - ${validationResult.passed_files}/${validationResult.total_files} 파일 통과`,
      status: validationResult.all_passed ? "completed" : "warning",
    },
  ];

  return (
    <S.TimelineCard>
      <S.TimelineTitle>검증 프로세스 타임라인</S.TimelineTitle>
      <S.TimelineContainer>
        {timelineItems.map((item, index) => (
          <S.TimelineItem key={index}>
            <S.TimelineDot $status={item.status as "completed" | "warning" | "pending"} />
            <S.TimelineContent>
              <S.TimelineItemTitle>{item.title}</S.TimelineItemTitle>
              <S.TimelineItemTime>{item.time}</S.TimelineItemTime>
            </S.TimelineContent>
          </S.TimelineItem>
        ))}
      </S.TimelineContainer>
    </S.TimelineCard>
  );
};



