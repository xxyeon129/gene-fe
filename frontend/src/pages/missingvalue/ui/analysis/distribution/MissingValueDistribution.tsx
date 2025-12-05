import { useState, useEffect } from "react";
import * as S from "./distribution.styles";
import { apiClient } from "@/shared/api";

interface MissingValueDistributionData {
  range: "0-10%" | "10-20%" | "20-30%" | "30-50%" | "50%+";
  sampleCount: number;
  geneCount: number;
}

export const MissingValueDistribution = () => {
  const [distribution, setDistribution] = useState<MissingValueDistributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    const storedProjectId = localStorage.getItem("selectedProjectId");
    if (storedProjectId) {
      setProjectId(Number(storedProjectId));
    }
  }, []);

  useEffect(() => {
    if (!projectId) return;

    const fetchDistribution = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getMissingValueDistribution(projectId);
        setDistribution(data as MissingValueDistributionData[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "분포 데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch missing value distribution:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistribution();
  }, [projectId]);

  if (loading) {
    return (
      <S.DistributionContainer>
        <S.H2>결측률 분포</S.H2>
        <div>로딩 중...</div>
      </S.DistributionContainer>
    );
  }

  if (error) {
    return (
      <S.DistributionContainer>
        <S.H2>결측률 분포</S.H2>
        <div>에러: {error}</div>
      </S.DistributionContainer>
    );
  }

  if (!distribution || distribution.length === 0) {
    return (
      <S.DistributionContainer>
        <S.H2>결측률 분포</S.H2>
        <div>데이터가 없습니다.</div>
      </S.DistributionContainer>
    );
  }

  return (
    <S.DistributionContainer>
      <S.H2>결측률 분포</S.H2>
      <S.DistributionList>
        {distribution.map((item) => (
          <S.DistributionItem key={item.range} $range={item.range}>
            <S.DistributionItemRange>{item.range}</S.DistributionItemRange>

            <S.StatusDistributionContainer>
              <S.DistributionItemValueWrapper>
                <S.DistributionItemValue>샘플: {item.sampleCount.toLocaleString()}개</S.DistributionItemValue>
                <S.DistributionItemValue>유전자: {item.geneCount.toLocaleString()}개</S.DistributionItemValue>
              </S.DistributionItemValueWrapper>
              <S.StatusBar>
                <S.StatusBarFill $fillPercentage={(item.sampleCount / item.geneCount) * 600} />
              </S.StatusBar>
            </S.StatusDistributionContainer>
          </S.DistributionItem>
        ))}
      </S.DistributionList>
    </S.DistributionContainer>
  );
};
