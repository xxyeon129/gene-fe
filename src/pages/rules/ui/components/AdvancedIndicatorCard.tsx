import { useState } from "react";
import * as S from "./advancedIndicatorCard.styles";

interface AdvancedIndicatorCardProps {
  icon: string;
  title: string;
  description: string;
  tool?: string;
  options?: string[];
  threshold?: number;
  ranges?: { type: string; range: string }[];
}

export const AdvancedIndicatorCard = ({
  icon,
  title,
  description,
  tool,
  options,
  threshold,
  ranges,
}: AdvancedIndicatorCardProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(options || []);
  const [thresholdValue, setThresholdValue] = useState(threshold || 0);
  const [selectedTool, setSelectedTool] = useState(tool || "");

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon>{icon}</S.SettingIcon>
        <S.SettingTitle>{title}</S.SettingTitle>
      </S.SettingHeader>
      <S.SettingDescription>{description}</S.SettingDescription>

      {tool && (
        <S.FormGroup>
          <S.FormLabel>검증 도구</S.FormLabel>
          <S.FormSelect value={selectedTool} onChange={(e) => setSelectedTool(e.target.value)}>
            <option>{tool}</option>
            <option>Custom Matching Algorithm</option>
          </S.FormSelect>
        </S.FormGroup>
      )}

      {options && (
        <S.FormGroup>
          <S.FormLabel>식별자 매칭 기준</S.FormLabel>
          <S.CheckboxContainer>
            {options.map((option) => (
              <S.CheckboxLabel key={option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </S.CheckboxLabel>
            ))}
          </S.CheckboxContainer>
        </S.FormGroup>
      )}

      {threshold !== undefined && (
        <S.FormGroup>
          <S.FormLabel>배치효과 임계값 (%)</S.FormLabel>
          <S.FormInput
            type="number"
            value={thresholdValue}
            min="0"
            max="100"
            onChange={(e) => setThresholdValue(Number(e.target.value))}
          />
        </S.FormGroup>
      )}

      {ranges && (
        <S.FormGroup>
          <S.FormLabel>데이터 타입별 범위 설정</S.FormLabel>
          <S.RangeContainer>
            {ranges.map((range, index) => (
              <S.RangeItem key={index}>
                <span>{range.type}</span>
                <span>{range.range}</span>
              </S.RangeItem>
            ))}
          </S.RangeContainer>
        </S.FormGroup>
      )}
    </S.SettingCard>
  );
};



