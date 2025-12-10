import * as S from "./progressSteps.styles";

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

interface ProgressStepsProps {
  validationResult: ValidationResult | null;
}

export const ProgressSteps = ({ validationResult }: ProgressStepsProps) => {
  const steps = [
    {
      number: "✓",
      label: "데이터 로드",
      status: validationResult ? "completed" : "pending"
    },
    {
      number: "✓",
      label: "형식 검사",
      status: validationResult ? "completed" : "pending"
    },
    {
      number: validationResult ? "✓" : "3",
      label: "품질 검증",
      status: validationResult ? "completed" : "active"
    },
    {
      number: validationResult ? "✓" : "4",
      label: "보고서 생성",
      status: validationResult ? "completed" : "pending"
    },
  ];

  return (
    <S.ProgressSteps>
      {steps.map((step, index) => (
        <S.ProgressStep key={index} $status={step.status as "completed" | "active" | "pending"}>
          <S.ProgressCircle $status={step.status as "completed" | "active" | "pending"}>
            {step.number}
          </S.ProgressCircle>
          <S.ProgressLabel>{step.label}</S.ProgressLabel>
        </S.ProgressStep>
      ))}
    </S.ProgressSteps>
  );
};



