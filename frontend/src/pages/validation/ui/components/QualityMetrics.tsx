import * as S from "./qualityMetrics.styles";

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

interface QualityMetricsProps {
  validationResult: ValidationResult | null;
}

export const QualityMetrics = ({ validationResult }: QualityMetricsProps) => {
  if (!validationResult) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        검증을 실행하여 품질 메트릭을 확인하세요.
      </div>
    );
  }

  const getFileMetric = (filename: string) => {
    return validationResult.files.find(f => f.filename.toLowerCase().includes(filename.toLowerCase()));
  };

  const rnaFile = getFileMetric("rna");
  const proteinFile = getFileMetric("protein");
  const methylFile = getFileMetric("methy");

  const metrics = [
    rnaFile && {
      icon: "🧪",
      title: "RNA 완전성",
      value: `${(100 - rnaFile.nan_percentage).toFixed(1)}%`,
      valueColor: rnaFile.nan_percentage < 10 ? "#10b981" : rnaFile.nan_percentage < 30 ? "#f59e0b" : "#ef4444",
      missingRate: `${rnaFile.nan_percentage}%`,
      status: rnaFile.nan_percentage < 10 ? "우수" : rnaFile.nan_percentage < 30 ? "양호" : "주의",
      iconBg: "#fef3c7",
    },
    proteinFile && {
      icon: "🔬",
      title: "Protein 완전성",
      value: `${(100 - proteinFile.nan_percentage).toFixed(1)}%`,
      valueColor: proteinFile.nan_percentage < 10 ? "#10b981" : proteinFile.nan_percentage < 30 ? "#f59e0b" : "#ef4444",
      missingRate: `${proteinFile.nan_percentage}%`,
      status: proteinFile.nan_percentage < 10 ? "우수" : proteinFile.nan_percentage < 30 ? "양호" : "주의",
      iconBg: "#ede9fe",
    },
    methylFile && {
      icon: "🧬",
      title: "Methyl 완전성",
      value: `${(100 - methylFile.nan_percentage).toFixed(1)}%`,
      valueColor: methylFile.nan_percentage < 10 ? "#10b981" : methylFile.nan_percentage < 30 ? "#f59e0b" : "#ef4444",
      missingRate: `${methylFile.nan_percentage}%`,
      status: methylFile.nan_percentage < 10 ? "우수" : methylFile.nan_percentage < 30 ? "양호" : "주의",
      iconBg: "#dbeafe",
    },
    {
      icon: "✅",
      title: "전체 검증 통과",
      value: `${validationResult.passed_files}/${validationResult.total_files}`,
      valueColor: validationResult.all_passed ? "#10b981" : "#ef4444",
      matchingRate: `파일 수: ${validationResult.total_files}`,
      status: validationResult.all_passed ? "통과" : "실패",
      iconBg: "#d1fae5",
    },
  ].filter(Boolean);

  return (
    <S.MetricsGrid>
      {metrics.map((metric, index) => (
        <S.MetricCard key={index}>
          <S.MetricHeader>
            <S.MetricIcon $bg={metric.iconBg}>{metric.icon}</S.MetricIcon>
            <S.MetricTitle>{metric.title}</S.MetricTitle>
          </S.MetricHeader>
          <S.MetricValue $color={metric.valueColor}>{metric.value}</S.MetricValue>
          <S.MetricInfo>
            {metric.missingRate && <span>결측 비율: {metric.missingRate}</span>}
            {metric.matchingRate && <span>{metric.matchingRate}</span>}
            <span>상태: {metric.status}</span>
          </S.MetricInfo>
        </S.MetricCard>
      ))}
    </S.MetricsGrid>
  );
};



