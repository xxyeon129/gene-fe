import * as S from "./previewResults.styles";

interface ImputationResult {
  jobId: string;
  status: string;
  results?: {
    rna_missing_imputed: number;
    protein_missing_imputed: number;
    methyl_missing_imputed: number;
    total_samples: number;
    output_files: {
      rna: string;
      protein: string;
      methyl: string;
    };
  };
}

interface PreviewResultsProps {
  imputationResult?: ImputationResult | null;
  isExecuting?: boolean;
}

const defaultPreviewItems = [
  {
    icon: "📉",
    label: "결측률 개선",
    value: "15.3% → 1.2%",
    change: "-14.1% 감소",
    changeType: "positive",
    iconBg: "#d1fae5",
    iconColor: "#10b981",
  },
  {
    icon: "📊",
    label: "데이터 품질",
    value: "97.3%",
    change: "MOCHI 정확도",
    changeType: "positive",
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
  },
  {
    icon: "🔍",
    label: "크로스 모달리티",
    value: "3개 통합",
    change: "RNA+Protein+Methyl",
    changeType: "positive",
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
  },
  {
    icon: "⚡",
    label: "예상 처리 시간",
    value: "~3분 45초",
    change: "GPU 가속 사용",
    changeType: "neutral",
    iconBg: "#ede9fe",
    iconColor: "#8b5cf6",
  },
];

export const PreviewResults: React.FC<PreviewResultsProps> = ({
  imputationResult,
  isExecuting,
}) => {
  const hasResult = imputationResult && imputationResult.status === "completed" && imputationResult.results;

  // 보간 작업이 시작되지 않았으면 아무것도 표시하지 않음
  if (!isExecuting && !hasResult) {
    return null;
  }

  return (
    <S.PreviewPanel>
      <S.PreviewTitle>
        <span>✨</span> {hasResult ? "보간 결과" : "보간 시뮬레이션 결과"}
      </S.PreviewTitle>

      {isExecuting && (
        <div style={{ padding: "2rem", textAlign: "center", color: "#1976d2", fontSize: "1.1rem" }}>
          ⏳ 보간 작업이 진행 중입니다...
        </div>
      )}

      {hasResult && (
        <div>
          <div style={{ padding: "1.5rem", backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "12px", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem" }}>✅ 보간 완료!</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.95rem" }}>
              <div>• RNA 결측치: <strong>{imputationResult.results!.rna_missing_imputed}개</strong> 보간</div>
              <div>• Protein 결측치: <strong>{imputationResult.results!.protein_missing_imputed}개</strong> 보간</div>
              <div>• Methyl 결측치: <strong>{imputationResult.results!.methyl_missing_imputed}개</strong> 보간</div>
              <div>• 총 샘플 수: <strong>{imputationResult.results!.total_samples}개</strong></div>
            </div>
          </div>

          <div style={{ padding: "1.5rem", backgroundColor: "#f5f5f5", borderRadius: "12px" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem" }}>📥 보간된 데이터 다운로드</div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationResult.jobId}/rna`;
                  window.open(url, "_blank");
                }}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1976D2"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2196F3"}
              >
                🧬 RNA 데이터
              </button>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationResult.jobId}/protein`;
                  window.open(url, "_blank");
                }}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#388E3C"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
              >
                🔬 Protein 데이터
              </button>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationResult.jobId}/methyl`;
                  window.open(url, "_blank");
                }}
                style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#9C27B0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7B1FA2"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#9C27B0"}
              >
                🧪 Methyl 데이터
              </button>
            </div>
          </div>
        </div>
      )}
    </S.PreviewPanel>
  );
};



