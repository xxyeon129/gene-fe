import { useState } from "react";
import { CommonWhiteBoxSectionTitle } from "@/shared";
import * as Styles from "./selectType.styles";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

const DATA_TYPE_OPTIONS = ["전체", "RNA-seq", "DNA", "Protein", "Methylation"];

export const VerificationSelectType = () => {
  const [selectedOption, setSelectedOption] = useState<string>("전체");

  return (
    <S.WhiteBoxSection>
      <S.CommonWhiteBoxSectionTitle>데이터 타입 선택</S.CommonWhiteBoxSectionTitle>

      <S.RadioGroup>
        {DATA_TYPE_OPTIONS.map((option) => (
          <S.RadioOption key={option} $isSelected={selectedOption === option} onClick={() => setSelectedOption(option)}>
            <S.RadioInput
              type="radio"
              name="data-type"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <S.RadioLabel $isSelected={selectedOption === option}>{option}</S.RadioLabel>
          </S.RadioOption>
        ))}
      </S.RadioGroup>
    </S.WhiteBoxSection>
  );
};
