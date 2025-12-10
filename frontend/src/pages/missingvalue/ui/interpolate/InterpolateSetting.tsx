import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useMemo, useState, useEffect } from "react";
import { MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST } from "../../consts";
import * as S from "./interpolate.styles";
import { useMissingValue } from "../../contexts/MissingValueContext";
import { apiClient } from "@/shared/api";

export const InterpolateSetting = () => {
  const initialValues = useMemo(
    () => Object.fromEntries(MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST.map((s) => [s.label, s.defaultValue])) as Record<string, number>,
    []
  );
  const [valuesByLabel, setValuesByLabel] = useState<Record<string, number>>(initialValues);
  const { selectedProjectId, imputationJobId, setImputationJobId, imputationStatus, setImputationStatus } = useMissingValue();
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobResults, setJobResults] = useState<any>(null);

  // Poll job status
  useEffect(() => {
    if (!imputationJobId) return;

    const pollInterval = setInterval(async () => {
      try {
        const statusData = await apiClient.getImputationStatus(imputationJobId);
        setImputationStatus(statusData.status);

        if (statusData.status === "completed") {
          setJobResults(statusData.results);
          clearInterval(pollInterval);
          setExecuting(false);
        } else if (statusData.status === "failed") {
          setError(statusData.error || "보간 작업이 실패했습니다.");
          clearInterval(pollInterval);
          setExecuting(false);
        }
      } catch (err) {
        console.error("Failed to poll job status:", err);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [imputationJobId, setImputationStatus]);

  const handleExecuteImputation = async () => {
    if (!selectedProjectId) {
      setError("프로젝트를 선택해주세요.");
      return;
    }

    try {
      setExecuting(true);
      setError(null);
      setJobResults(null);

      const response = await apiClient.executeMultiOmicsImputation(selectedProjectId);
      setImputationJobId(response.jobId);
      setImputationStatus("processing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "보간 실행에 실패했습니다.");
      setExecuting(false);
      console.error("Failed to execute imputation:", err);
    }
  };

  return (
    <S.WhiteBoxSection>
      <S.Title>🎯 보간 설정</S.Title>
      <S.InterpolateSettingList>
        {MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST.map((setting) => (
          <S.InterpolateSettingItem key={setting.label}>
            <S.SliderTextWrapper>
              <S.InterpolateSettingItemLabel>{setting.label}</S.InterpolateSettingItemLabel>
              <S.SliderPercentage $isBlue={setting.label === "보간 임계값"}>
                {valuesByLabel[setting.label] ?? setting.defaultValue}%
              </S.SliderPercentage>
            </S.SliderTextWrapper>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={valuesByLabel[setting.label] ?? setting.defaultValue}
                aria-label="Default"
                valueLabelDisplay="off"
                onChange={(_, newValue) =>
                  setValuesByLabel((prev) => ({
                    ...prev,
                    [setting.label]: Array.isArray(newValue) ? newValue[0] : (newValue as number),
                  }))
                }
                sx={{
                  color: "#606060",
                  height: 7,
                  py: 0,
                }}
              />
            </Box>
            <S.InterpolateSettingItemDescription>{setting.description}</S.InterpolateSettingItemDescription>
          </S.InterpolateSettingItem>
        ))}
      </S.InterpolateSettingList>

      <S.SkyBlueDescriptionBox>
        <S.SkyBlueDescriptionTitle>💡 예상 결과</S.SkyBlueDescriptionTitle>
        <S.SkyBlueDescriptionContent>약 78개의 샘플, 2262개 유전자 보간 예정</S.SkyBlueDescriptionContent>
      </S.SkyBlueDescriptionBox>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={handleExecuteImputation}
          disabled={!selectedProjectId || executing}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: !selectedProjectId || executing ? "#ccc" : "#4A90E2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: !selectedProjectId || executing ? "not-allowed" : "pointer",
          }}
        >
          {executing ? "보간 진행 중..." : "멀티오믹스 보간 실행"}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#fee", color: "#c00", borderRadius: "4px" }}>
          ❌ {error}
        </div>
      )}

      {imputationStatus === "processing" && (
        <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#e3f2fd", color: "#1976d2", borderRadius: "4px" }}>
          ⏳ 보간 작업이 진행 중입니다...
        </div>
      )}

      {imputationStatus === "completed" && jobResults && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "4px" }}>
            ✅ 보간 완료!
            <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
              <div>• RNA 결측치: {jobResults.rna_missing_imputed}개 보간</div>
              <div>• Protein 결측치: {jobResults.protein_missing_imputed}개 보간</div>
              <div>• Methyl 결측치: {jobResults.methyl_missing_imputed}개 보간</div>
              <div>• 총 샘플 수: {jobResults.total_samples}개</div>
            </div>
          </div>

          <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>📥 보간된 데이터 다운로드</div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationJobId}/rna`;
                  window.open(url, "_blank");
                }}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                🧬 RNA 데이터
              </button>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationJobId}/protein`;
                  window.open(url, "_blank");
                }}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                🔬 Protein 데이터
              </button>
              <button
                onClick={() => {
                  const url = `http://localhost:8005/api/imputation/download/${imputationJobId}/methyl`;
                  window.open(url, "_blank");
                }}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#9C27B0",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                🧪 Methyl 데이터
              </button>
            </div>
          </div>
        </div>
      )}
    </S.WhiteBoxSection>
  );
};
