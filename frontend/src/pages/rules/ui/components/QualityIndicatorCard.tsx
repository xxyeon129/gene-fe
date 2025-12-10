import { useEffect, useState } from "react";
import * as S from "./qualityIndicatorCard.styles";

interface QualityIndicatorCardProps {
  icon: string;
  title: string;
  description: string;
  completeness: string;
  completenessBg: string;
  completenessColor: string;
  threshold: number;
  code: string;
  onThresholdChange?: (value: number) => void;
}

export const QualityIndicatorCard = ({
  icon,
  title,
  description,
  completeness,
  completenessBg,
  completenessColor,
  threshold,
  code,
  onThresholdChange,
}: QualityIndicatorCardProps) => {
  const [thresholdValue, setThresholdValue] = useState(threshold);

  // threshold prop이 변경되면 로컬 상태 업데이트 (프로젝트 변경 시)
  useEffect(() => {
    setThresholdValue(threshold);
  }, [threshold]);

  const handleChange = (value: number) => {
    setThresholdValue(value);
    if (onThresholdChange) {
      onThresholdChange(value);
    }
  };

  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon $bg={completenessBg} $color={completenessColor}>{icon}</S.SettingIcon>
        <S.SettingTitle>{title}</S.SettingTitle>
      </S.SettingHeader>
      <S.SettingDescription>{description}</S.SettingDescription>

      <S.CompletenessBox $bg={completenessBg} $color={completenessColor}>
        <span>기준 완전성</span>
        <span>{completeness}</span>
      </S.CompletenessBox>

      <S.FormGroup>
        <S.FormLabel>Missing Rate 허용 임계값 (%)</S.FormLabel>
        <S.FormInput
          type="number"
          value={thresholdValue}
          min="0"
          max="100"
          step="0.1"
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.FormLabel>검증 코드</S.FormLabel>
        <S.CodeTextarea rows={4} value={code} readOnly />
      </S.FormGroup>
    </S.SettingCard>
  );
};



