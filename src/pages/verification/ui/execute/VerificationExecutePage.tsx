import * as Styles from "./execute.styles";
import { CommonWhiteBoxSection, CommonWhiteBoxSectionTitle } from "@/shared";
import { VerificationUploadData } from "./uploadData";
import { VerificationSelectType } from "./SelectType";
import { VerificationSelectRules } from "./SelectRules";
import { FiPlay } from "react-icons/fi";

const S = { ...Styles, CommonWhiteBoxSection, CommonWhiteBoxSectionTitle };

export const VerificationExecutePage = () => {
  return (
    <S.PageArticle>
      <VerificationUploadData />
      <VerificationSelectType />
      <VerificationSelectRules />

      <S.CommonWhiteBoxSection $alignCenter={true}>
        <S.VerificationStartButton>
          <FiPlay /> 품질 검증 시작
        </S.VerificationStartButton>
      </S.CommonWhiteBoxSection>
    </S.PageArticle>
  );
};
