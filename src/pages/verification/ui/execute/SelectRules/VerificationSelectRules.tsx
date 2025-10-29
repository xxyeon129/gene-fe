import { useState } from "react";
import * as Styles from "./selectRules.styles";
import { CommonWhiteBoxSectionTitle } from "@/shared";
import { VERIFICATION_RULES_SAMPLES } from "../../../consts";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

export const VerificationSelectRules = () => {
  const [selectedRules, setSelectedRules] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (label: string) => {
    setSelectedRules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <S.WhiteBoxSection>
      <S.CommonWhiteBoxSectionTitle>적용할 규칙 선택</S.CommonWhiteBoxSectionTitle>
      <S.RuleList>
        {VERIFICATION_RULES_SAMPLES.map((rule) => (
          <S.RuleItem key={rule.label} $isSelected={selectedRules.has(rule.label)} onClick={() => handleCheckboxChange(rule.label)}>
            <S.RuleItemContent>
              <S.Checkbox
                type="checkbox"
                checked={selectedRules.has(rule.label)}
                onChange={() => handleCheckboxChange(rule.label)}
                onClick={(e) => e.stopPropagation()}
              />
              <S.RuleItemLabel>
                <span className="rule-item-label-text">{rule.label}</span>
                <span className="rule-item-label-category">{rule.category}</span>
              </S.RuleItemLabel>
            </S.RuleItemContent>
          </S.RuleItem>
        ))}
      </S.RuleList>
    </S.WhiteBoxSection>
  );
};
