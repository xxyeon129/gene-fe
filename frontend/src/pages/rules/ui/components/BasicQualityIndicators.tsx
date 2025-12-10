import * as S from "./basicQualityIndicators.styles";
import { QualityIndicatorCard } from "./QualityIndicatorCard";

interface ValidationRules {
  dna_threshold: number;
  rna_threshold: number;
  protein_threshold: number;
  methyl_threshold: number;
  batch_effect_threshold: number;
  sample_matching_enabled: boolean;
  range_validation_enabled: boolean;
}

interface BasicQualityIndicatorsProps {
  rules: ValidationRules;
  onRulesChange: (rules: ValidationRules) => void;
}

export const BasicQualityIndicators = ({ rules, onRulesChange }: BasicQualityIndicatorsProps) => {
  const basicIndicators = [
    {
      icon: "🧬",
      title: "DNA 데이터 완전성",
      description: "환자 ID를 기준으로 DNA 데이터의 결측률을 측정합니다.",
      completeness: "99%",
      completenessBg: "#f0f9ff",
      completenessColor: "#3b82f6",
      threshold: rules.dna_threshold,
      thresholdKey: "dna_threshold" as const,
      code: `def check_dna_completeness(data):
    # DNA 데이터 완전성 검증
    missing_rate = data['DNA'].isnull().sum() / len(data)
    completeness = (1 - missing_rate) * 100
    return completeness >= 99`,
    },
    {
      icon: "🧪",
      title: "RNA 데이터 완전성",
      description: "환자 ID를 기준으로 RNA 데이터의 결측률을 측정합니다.",
      completeness: "80%",
      completenessBg: "#fffbeb",
      completenessColor: "#f59e0b",
      threshold: rules.rna_threshold,
      thresholdKey: "rna_threshold" as const,
      code: `def check_rna_completeness(data):
    # RNA 데이터 완전성 검증
    missing_rate = data['RNA'].isnull().sum() / len(data)
    completeness = (1 - missing_rate) * 100
    return completeness >= 80`,
    },
    {
      icon: "🔬",
      title: "Protein 데이터 완전성",
      description: "환자 ID를 기준으로 Protein 데이터의 결측률을 측정합니다.",
      completeness: "75%",
      completenessBg: "#faf5ff",
      completenessColor: "#8b5cf6",
      threshold: rules.protein_threshold,
      thresholdKey: "protein_threshold" as const,
      code: `def check_protein_completeness(data):
    # Protein 데이터 완전성 검증
    missing_rate = data['Protein'].isnull().sum() / len(data)
    completeness = (1 - missing_rate) * 100
    return completeness >= 75`,
    },
  ];

  const handleThresholdChange = (key: keyof ValidationRules, value: number) => {
    onRulesChange({
      ...rules,
      [key]: value,
    });
  };

  return (
    <S.Grid>
      {basicIndicators.map((indicator, index) => (
        <QualityIndicatorCard
          key={index}
          {...indicator}
          onThresholdChange={(value) => handleThresholdChange(indicator.thresholdKey, value)}
        />
      ))}
    </S.Grid>
  );
};



