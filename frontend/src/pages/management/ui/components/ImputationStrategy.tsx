import { useState, useEffect } from "react";
import * as S from "./imputationStrategy.styles";
import { apiClient } from "@/shared/api";

interface ImputationMethod {
  value: string;
  label: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
}

const defaultMethods: ImputationMethod[] = [
  { value: "mochi", label: "🚀 MOCHI: Imputation Model (추천)" },
  { value: "mean", label: "Mean/Median Imputation" },
  { value: "knn", label: "KNN Imputation" },
  // { value: "mice", label: "MICE (Multiple Imputation)" }, // TODO: 대용량 데이터 최적화 필요
  { value: "missforest", label: "MissForest" },
  { value: "gain", label: "GAIN (Generative Adversarial)" },
  { value: "vae", label: "VAE (Variational Autoencoder)" },
];

const methodDescriptions: Record<string, { title: string; description: string; color: string }> = {
  mochi: {
    title: "🚀 MOCHI: Multi-Omics Complete Harmonized Imputation",
    description:
      "멀티오믹스 데이터의 특성을 고려한 최신 AI 기반 보간 모델입니다. DNA, RNA, Protein 등 다양한 오믹스 데이터 간의 상관관계를 학습하여 높은 정확도의 보간을 제공합니다. (정확도: ~97.3%)",
    color: "#3b82f6",
  },
  mean: {
    title: "📊 Mean/Median Imputation",
    description:
      "가장 간단한 통계적 방법으로, 각 변수의 평균 또는 중앙값으로 결측치를 대체합니다. 계산이 빠르지만 데이터의 변동성을 감소시킬 수 있습니다. (정확도: ~75%)",
    color: "#6b7280",
  },
  knn: {
    title: "🎯 KNN (K-Nearest Neighbors) Imputation",
    description:
      "유사한 샘플들의 값을 기반으로 결측치를 추정합니다. 데이터의 지역적 패턴을 잘 보존하며, 비선형 관계를 포착할 수 있습니다. (정확도: ~88%)",
    color: "#10b981",
  },
  mice: {
    title: "🔄 MICE (Multiple Imputation by Chained Equations)",
    description: "다중 대체 방법으로 여러 개의 완전한 데이터셋을 생성합니다. 불확실성을 고려한 강건한 추정이 가능합니다. (정확도: ~92%)",
    color: "#8B5CF6",
  },
  missforest: {
    title: "🌲 MissForest",
    description: "Random Forest 알고리즘을 사용한 비모수적 보간 방법입니다. 복잡한 상호작용과 비선형 관계를 잘 처리합니다. (정확도: ~91%)",
    color: "#059669",
  },
  gain: {
    title: "🤖 GAIN (Generative Adversarial Imputation)",
    description: "GAN 기반의 생성 모델로 결측치를 보간합니다. 데이터의 복잡한 분포를 학습하여 현실적인 값을 생성합니다. (정확도: ~94%)",
    color: "#DC2626",
  },
  vae: {
    title: "🔮 VAE (Variational Autoencoder)",
    description: "딥러닝 기반의 생성 모델로, 데이터의 잠재 표현을 학습하여 결측치를 추정합니다. 고차원 데이터에 효과적입니다. (정확도: ~93%)",
    color: "#7C3AED",
  },
};

interface ImputationStrategyProps {
  onImputationComplete?: (result: any) => void;
  onExecutionStart?: () => void;
  onExecutionEnd?: () => void;
}

export const ImputationStrategy: React.FC<ImputationStrategyProps> = ({
  onImputationComplete,
  onExecutionStart,
  onExecutionEnd,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("mochi");
  const [methods, setMethods] = useState<ImputationMethod[]>(defaultMethods);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(30);
  const [qualityThreshold, setQualityThreshold] = useState(85);
  const [crossValidation, setCrossValidation] = useState(true);
  const [outlierHandling, setOutlierHandling] = useState(true);
  const [timeSeriesPattern, setTimeSeriesPattern] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);

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
    const fetchMethods = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getImputationMethods();
        if (data && Array.isArray(data) && data.length > 0) {
          setMethods(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "보간 방법을 불러오는데 실패했습니다.");
        console.error("Failed to fetch imputation methods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  const handleExecute = async () => {
    if (!selectedProjectId) {
      setError("프로젝트를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      onExecutionStart?.();

      let result: any;

      // 선택된 보간 방법에 따라 다른 API 호출
      if (selectedMethod === "mochi") {
        // MOCHI 멀티오믹스 보간 실행
        result = await apiClient.executeMultiOmicsImputation(
          selectedProjectId,
          threshold,
          qualityThreshold
        );
      } else {
        // 다른 보간 방법 실행 (mean, knn, mice, etc.)
        result = await apiClient.executeImputation({
          project_id: selectedProjectId,
          method: selectedMethod,
          threshold: threshold,
          quality_threshold: qualityThreshold,
          options: {
            cross_validation: crossValidation,
            outlier_handling: outlierHandling,
            time_series_pattern: timeSeriesPattern,
          }
        });
      }

      const jobId = result.jobId || result.id;

      // 폴링을 통해 작업 완료 대기
      let attempts = 0;
      const maxAttempts = 60; // 최대 2분 대기

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초마다 체크
        const status: any = await apiClient.getImputationStatus(jobId);

        if (status.status === "completed") {
          onImputationComplete?.({
            jobId,
            status: "completed",
            method: selectedMethod,
            results: status.results,
          });
          setLoading(false);
          onExecutionEnd?.();
          return;
        } else if (status.status === "failed") {
          setError(status.error || "보간 작업이 실패했습니다.");
          setLoading(false);
          onExecutionEnd?.();
          return;
        }

        attempts++;
      }

      // 타임아웃
      setError("보간 작업 시간이 초과되었습니다.");
      setLoading(false);
      onExecutionEnd?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "보간 실행에 실패했습니다.");
      console.error("Failed to execute imputation:", err);
      setLoading(false);
      onExecutionEnd?.();
    }
  };

  const description = methodDescriptions[selectedMethod] || methodDescriptions.mochi;

  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon>🎯</S.SettingIcon>
        <S.SettingTitle>보간 전략 설정</S.SettingTitle>
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

      <S.FormGroup>
        <S.FormLabel>
          보간 방법 선택
          <S.Tooltip>
            ⓘ<S.TooltipText>MOCHI는 멀티오믹스 데이터에 최적화된 AI 보간 모델입니다</S.TooltipText>
          </S.Tooltip>
        </S.FormLabel>
        <S.FormSelect value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
          {methods.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </S.FormSelect>
      </S.FormGroup>

      <S.MethodDescription $color={description.color}>
        <S.MethodTitle>{description.title}</S.MethodTitle>
        <S.MethodText>{description.description}</S.MethodText>
      </S.MethodDescription>

      <S.SliderGroup>
        <S.SliderHeader>
          <S.SliderLabel>보간 임계값</S.SliderLabel>
          <S.SliderValue>{threshold}%</S.SliderValue>
        </S.SliderHeader>
        <S.SliderTrack>
          <S.SliderFill $width={threshold} />
          <S.SliderThumb $left={threshold} />
        </S.SliderTrack>
        <input
          type="range"
          min="0"
          max="100"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ width: "100%", marginTop: "0.5rem" }}
        />
        <S.SliderHelp>이 비율 이하의 결측만 보간합니다</S.SliderHelp>
      </S.SliderGroup>

      <S.SliderGroup>
        <S.SliderHeader>
          <S.SliderLabel>품질 기준</S.SliderLabel>
          <S.SliderValue>{qualityThreshold}%</S.SliderValue>
        </S.SliderHeader>
        <S.SliderTrack>
          <S.SliderFill $width={qualityThreshold} />
          <S.SliderThumb $left={qualityThreshold} />
        </S.SliderTrack>
        <input
          type="range"
          min="0"
          max="100"
          value={qualityThreshold}
          onChange={(e) => setQualityThreshold(Number(e.target.value))}
          style={{ width: "100%", marginTop: "0.5rem" }}
        />
        <S.SliderHelp>보간 후 최소 품질 점수</S.SliderHelp>
      </S.SliderGroup>

      <S.FormGroup>
        <S.FormLabel>고급 옵션</S.FormLabel>
        <S.CheckboxContainer>
          <S.CheckboxLabel>
            <input
              type="checkbox"
              checked={crossValidation}
              onChange={(e) => setCrossValidation(e.target.checked)}
            />
            <span>교차 검증 수행</span>
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input
              type="checkbox"
              checked={outlierHandling}
              onChange={(e) => setOutlierHandling(e.target.checked)}
            />
            <span>이상치 자동 처리</span>
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input
              type="checkbox"
              checked={timeSeriesPattern}
              onChange={(e) => setTimeSeriesPattern(e.target.checked)}
            />
            <span>시계열 패턴 고려</span>
          </S.CheckboxLabel>
        </S.CheckboxContainer>
      </S.FormGroup>

      {error && (
        <div style={{ color: "red", marginTop: "1rem", marginBottom: "1rem" }}>에러: {error}</div>
      )}

      <S.FormGroup>
        <button
          onClick={handleExecute}
          disabled={loading || !selectedProjectId}
          style={{
            width: "100%",
            padding: "12px 24px",
            background: (loading || !selectedProjectId) ? "#9ca3af" : "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: (loading || !selectedProjectId) ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "실행 중..." : "🚀 보간 실행"}
        </button>
      </S.FormGroup>
    </S.SettingCard>
  );
};
