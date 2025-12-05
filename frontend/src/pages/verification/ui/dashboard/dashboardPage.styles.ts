import { CommonWhiteBoxSection } from "@/shared";
import styled from "styled-components";

export const PageArtcile = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const ContentWrapper = styled.article`
  width: 100%;
  display: flex;
  column-gap: 1rem;
`;

const colorMap: Record<number, string> = {
  0: "#3C82F6",
  1: "#079669",
  2: "#D97708",
  3: "#7C3AED",
};

export const WhiteBoxSection = styled(CommonWhiteBoxSection)<{ $isLeftBorder?: boolean; $leftBorderIndex?: number; $padding?: string }>`
  width: 100%;
  padding: ${({ $padding = "2rem" }) => $padding};
  border-left: ${({ $isLeftBorder = false, $leftBorderIndex }) =>
    $isLeftBorder && $leftBorderIndex !== undefined ? `5px solid ${colorMap[$leftBorderIndex]}` : "none"};
`;

// NOTE: 상단 총 검증 샘플, 검증 통과율, 경고 샘플, 활성 규칙 card style ================
export const SampleLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.darkGray};
  font-weight: 600;
`;

export const SampleCount = styled.p<{ $colorIndex: number }>`
  margin-top: 0.3rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ $colorIndex }) => colorMap[$colorIndex]};
`;

export const SampleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;

// NOTE: 품질 지표 현황, 검증 추세 공통 타이틀 style ================================
export const WhiteBoxSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
`;

// NOTE: 품질 지표 현황 상태 아이템 style ================================
export const CurrentStatusItem = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const StatusTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
`;

export const CurrentStatusScoreContainer = styled.div`
  display: flex;
  column-gap: 0.3rem;
  align-items: center;
  margin-bottom: 0.3rem;
`;

export const CurrentStatusBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.border.gray};
  border-radius: 0.5rem;
  position: relative;
`;

export const CurrentStatusBarFill = styled.div<{ $score: number }>`
  height: 100%;
  background-color: #20c48b;
  width: ${({ $score }) => `${($score / 100) * 100}%`};
  border-radius: 0.5rem;
`;

export const CurrentStatusBarStandardLine = styled.div<{ $standard: number }>`
  position: absolute;
  left: ${({ $standard }) => `${($standard / 100) * 100}%`};
  width: 0.1rem;
  height: 100%;
  background-color: black;
`;

export const CurrentStatusLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const CurrentStatusScore = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 800;
  color: #20c48b;
`;

export const CurrentStatusStandard = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;
