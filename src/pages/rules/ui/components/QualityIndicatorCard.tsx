import { useState } from "react";
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
}: QualityIndicatorCardProps) => {
  const [thresholdValue, setThresholdValue] = useState(threshold);

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
        <S.FormLabel>Missing Rate 허용 임계값</S.FormLabel>
        <S.FormInput
          type="number"
          value={thresholdValue}
          min="0"
          max="100"
          onChange={(e) => setThresholdValue(Number(e.target.value))}
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.FormLabel>검증 코드</S.FormLabel>
        <S.CodeTextarea rows={4} value={code} readOnly />
      </S.FormGroup>
    </S.SettingCard>
  );
};



