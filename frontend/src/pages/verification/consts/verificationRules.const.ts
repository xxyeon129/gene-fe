interface VerificationRulesSample {
  label: string;
  status: "active" | "inactive";
  category: "정렬성" | "정밀성" | "완전성";
  metric: string;
  condition: ">=" | "<=";
  threshold: number;
}

export const VERIFICATION_RULES_SAMPLES: VerificationRulesSample[] = [
  {
    label: "리드 정렬성",
    status: "active",
    category: "정렬성",
    metric: "read_mapping",
    condition: ">=",
    threshold: 90,
  },
  {
    label: "위양성 SNP calls",
    status: "active",
    category: "정렬성",
    metric: "snp_calls",
    condition: "<=",
    threshold: 5,
  },
  {
    label: "동일 준비 동일 LC-MS",
    status: "active",
    category: "정밀성",
    metric: "consistency",
    condition: ">=",
    threshold: 85,
  },
  {
    label: "기기 안정성",
    status: "active",
    category: "완전성",
    metric: "batch_drift",
    condition: "<=",
    threshold: 10,
  },
];
