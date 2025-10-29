import { IoSettingsOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { VERIFICATION_RULES_SAMPLES } from "../../../consts";
import * as Styles from "./rulesList.styles";
import { CommonWhiteBoxSectionTitle } from "@/shared";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

export const VerificationRulesList = () => {
  return (
    <>
      <S.CommonWhiteBoxSectionTitle>
        <IoSettingsOutline /> 품질 검증 규칙 목록
      </S.CommonWhiteBoxSectionTitle>
      <S.VerificationRulesList>
        {VERIFICATION_RULES_SAMPLES.map((sample) => (
          <S.VerificationRulesItem key={sample.label} $category={sample.category}>
            <S.RulesItemHeader>
              <S.VerificationRulesItemStatus $status={sample.status}>
                <FaCheck />
                {sample.status === "active" ? "활성" : "비활성"}
              </S.VerificationRulesItemStatus>
              <S.VerificationRulesItemLabel>{sample.label}</S.VerificationRulesItemLabel>
            </S.RulesItemHeader>

            <S.RulesItemContentUl>
              <S.RulesItemContentLi>
                <S.RulesItemContentLabel>카테고리</S.RulesItemContentLabel>
                <S.RulesItemContentLabelValue>{sample.category}</S.RulesItemContentLabelValue>
              </S.RulesItemContentLi>
              <S.RulesItemContentLi>
                <S.RulesItemContentLabel>지표</S.RulesItemContentLabel>
                <S.RulesItemContentLabelValue>{sample.metric}</S.RulesItemContentLabelValue>
              </S.RulesItemContentLi>
              <S.RulesItemContentLi>
                <S.RulesItemContentLabel>조건</S.RulesItemContentLabel>
                <S.RulesItemContentLabelValue>
                  {sample.condition} {sample.threshold}
                </S.RulesItemContentLabelValue>
              </S.RulesItemContentLi>
              <S.RulesItemContentLi $isButtonList={true}>
                <S.Button>비활성화</S.Button>
                <S.Button $isDelete={true}>삭제</S.Button>
              </S.RulesItemContentLi>
            </S.RulesItemContentUl>
          </S.VerificationRulesItem>
        ))}
      </S.VerificationRulesList>
    </>
  );
};

export default VerificationRulesList;
