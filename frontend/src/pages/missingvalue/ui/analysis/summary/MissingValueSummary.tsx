import { useState, useEffect } from "react";
import * as S from "./summary.styles";
import { apiClient } from "@/shared/api";

interface MissingValueSummaryData {
  type: string;
  title: string;
  value: number;
  description: string;
}

export const MissingValueSummary = () => {
  const [summary, setSummary] = useState<MissingValueSummaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    // 프로젝트 ID는 URL 파라미터나 상태 관리에서 가져올 수 있습니다
    // 여기서는 예시로 localStorage나 다른 방법으로 가져온다고 가정합니다
    const storedProjectId = localStorage.getItem("selectedProjectId");
    if (storedProjectId) {
      setProjectId(Number(storedProjectId));
    }
  }, []);

  useEffect(() => {
    if (!projectId) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getMissingValueSummary(projectId);
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "요약 데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch missing value summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [projectId]);

  if (loading) {
    return <S.SummaryContainer>로딩 중...</S.SummaryContainer>;
  }

  if (error) {
    return <S.SummaryContainer>에러: {error}</S.SummaryContainer>;
  }

  if (!summary || summary.length === 0) {
    return <S.SummaryContainer>데이터가 없습니다.</S.SummaryContainer>;
  }

  return (
    <S.SummaryContainer>
      {summary.map((item) => (
        <S.SummaryItem key={item.type} $type={item.type}>
          <S.SummaryItemTitle $type={item.type}>{item.title}</S.SummaryItemTitle>
          <S.SummaryItemValue $type={item.type}>
            {item.value.toLocaleString()}{item.type === "all" ? "%" : ""}
          </S.SummaryItemValue>
          <S.SummaryItemDescription $type={item.type}>{item.description}</S.SummaryItemDescription>
        </S.SummaryItem>
      ))}
    </S.SummaryContainer>
  );
};