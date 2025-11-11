import { useState } from "react";
import * as S from "./imputationStrategy.styles";

const methods = [
  { value: "mochi", label: "🚀 MOCHI: Imputation Model (추천)" },
  { value: "mean", label: "Mean/Median Imputation" },
  { value: "knn", label: "KNN Imputation" },
  { value: "mice", label: "MICE (Multiple Imputation)" },
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

export const ImputationStrategy = () => {
  const [selectedMethod, setSelectedMethod] = useState("mochi");

  const description = methodDescriptions[selectedMethod] || methodDescriptions.mochi;

  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon>🎯</S.SettingIcon>
        <S.SettingTitle>보간 전략 설정</S.SettingTitle>
      </S.SettingHeader>

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
          <S.SliderValue>30%</S.SliderValue>
        </S.SliderHeader>
        <S.SliderTrack>
          <S.SliderFill $width={30} />
          <S.SliderThumb $left={30} />
        </S.SliderTrack>
        <S.SliderHelp>이 비율 이하의 결측만 보간합니다</S.SliderHelp>
      </S.SliderGroup>

      <S.SliderGroup>
        <S.SliderHeader>
          <S.SliderLabel>품질 기준</S.SliderLabel>
          <S.SliderValue>85%</S.SliderValue>
        </S.SliderHeader>
        <S.SliderTrack>
          <S.SliderFill $width={85} />
          <S.SliderThumb $left={85} />
        </S.SliderTrack>
        <S.SliderHelp>보간 후 최소 품질 점수</S.SliderHelp>
      </S.SliderGroup>

      <S.FormGroup>
        <S.FormLabel>고급 옵션</S.FormLabel>
        <S.CheckboxContainer>
          <S.CheckboxLabel>
            <input type="checkbox" defaultChecked />
            <span>교차 검증 수행</span>
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input type="checkbox" defaultChecked />
            <span>이상치 자동 처리</span>
          </S.CheckboxLabel>
          <S.CheckboxLabel>
            <input type="checkbox" />
            <span>시계열 패턴 고려</span>
          </S.CheckboxLabel>
        </S.CheckboxContainer>
      </S.FormGroup>
    </S.SettingCard>
  );
};
