export const MISSING_VALUE_PAGE_PROJECT_LIST = [
  { label: "Breast Cancer Imputation", sampleCount: 1226, currentMissingValueRate: 18.7 },
  { label: "Lung Cancer QC", sampleCount: 892, currentMissingValueRate: 12.3 },
  { label: "TCGA Pan-Cancer", sampleCount: 5420, currentMissingValueRate: 25.6 },
];

export const MISSING_VALUE_PAGE_SUMMARY_LIST: Array<{
  type: "all" | "sample" | "gene";
  title: string;
  value: number;
  description: string;
}> = [
  { type: "all", title: "전체 결측률", value: 18.7, description: "13,876,348 cells" },
  { type: "sample", title: "결측 샘플", value: 156, description: "/ 1,226 samples" },
  { type: "gene", title: "결측 유전자", value: 4523, description: "features with missing values" },
];

export const MISSING_VALUE_PAGE_DISTRIBUTION_LIST: Array<{
  range: "0-10%" | "10-20%" | "20-30%" | "30-50%" | "50%+";
  sampleCount: number;
  geneCount: number;
}> = [
  { range: "0-10%", sampleCount: 645, geneCount: 42135 },
  { range: "10-20%", sampleCount: 289, geneCount: 12458 },
  { range: "20-30%", sampleCount: 136, geneCount: 3867 },
  { range: "30-50%", sampleCount: 98, geneCount: 1845 },
  { range: "50%+", sampleCount: 58, geneCount: 678 },
];

export const MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST = [
  { label: "보간 임계값", description: "이 값 이하의 결측률을 가진 데이터만 보간", defaultValue: 30 },
  { label: "샘플 제외 기준", description: "이 값 이상 결측된 샘플은 제외", defaultValue: 50 },
  { label: "유전자 제외 기준", description: "이 값 이상 결측된 유전자는 제외", defaultValue: 50 },
];
