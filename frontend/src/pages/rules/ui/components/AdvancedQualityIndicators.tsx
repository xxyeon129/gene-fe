import * as S from "./advancedQualityIndicators.styles";
import { AdvancedIndicatorCard } from "./AdvancedIndicatorCard";

interface ValidationRules {
  dna_threshold: number;
  rna_threshold: number;
  protein_threshold: number;
  methyl_threshold: number;
  batch_effect_threshold: number;
  sample_matching_enabled: boolean;
  range_validation_enabled: boolean;
}

interface AdvancedQualityIndicatorsProps {
  rules: ValidationRules;
  onRulesChange: (rules: ValidationRules) => void;
}

export const AdvancedQualityIndicators = ({ rules, onRulesChange }: AdvancedQualityIndicatorsProps) => {
  const advancedIndicators = [
    {
      icon: "✅",
      title: "샘플 정확성 검증",
      description: "유전체-오믹스 데이터의 샘플이 동일 샘플이 맞는지 확인합니다.",
      tool: "proMODMatcher - 멀티오믹스 샘플오류 식별도구",
      options: ["RS Numbers (rsid)", "Ensembl Gene ID", "UniProt ID"],
    },
    {
      icon: "📊",
      title: "배치효과 평가",
      description: "유전체-오믹스 데이터에서의 배치효과를 측정 및 평가합니다.",
      tool: "BatchEval - 멀티오믹스 배치효과 평가 도구",
      threshold: rules.batch_effect_threshold,
    },
    {
      icon: "🔄",
      title: "발현값 범위 검증",
      description: "유전체-오믹스 데이터별 범위, 형식 등 기준준수여부를 확인합니다.",
      ranges: [
        { type: "DNA (Encoded)", range: "-1, 0, 1" },
        { type: "RNA (log2 TPM+1)", range: "-2.0 ~ 2.1" },
        { type: "Protein (abundance)", range: "-5 ~ 20" },
      ],
    },
  ];

  const handleThresholdChange = (value: number) => {
    onRulesChange({
      ...rules,
      batch_effect_threshold: value,
    });
  };

  return (
    <S.Grid>
      {advancedIndicators.map((indicator, index) => (
        <AdvancedIndicatorCard
          key={index}
          {...indicator}
          onThresholdChange={indicator.threshold !== undefined ? handleThresholdChange : undefined}
        />
      ))}
    </S.Grid>
  );
};



