import * as S from "./verificationRules.styles";

import { VerificationRulesList } from "./rulesList";
import { AddRule } from "./addRule";

export const VerificationRulesPage = () => {
  return (
    <S.PageArticle>
      <S.BoxSection $isGrayBackgroundColor={true}>
        <AddRule />
      </S.BoxSection>

      <S.BoxSection>
        <VerificationRulesList />
      </S.BoxSection>
    </S.PageArticle>
  );
};
