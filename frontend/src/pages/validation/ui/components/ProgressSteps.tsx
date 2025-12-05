import * as S from "./progressSteps.styles";

const steps = [
  { number: "✓", label: "데이터 로드", status: "completed" },
  { number: "✓", label: "형식 검사", status: "completed" },
  { number: "3", label: "품질 검증", status: "active" },
  { number: "4", label: "보고서 생성", status: "pending" },
];

export const ProgressSteps = () => {
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



