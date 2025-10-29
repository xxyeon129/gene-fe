import { CommonUploadFile, CommonWhiteBoxSectionTitle } from "@/shared";
import * as Styles from "./uploadData.styles";
import { FiUpload } from "react-icons/fi";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

export const VerificationUploadData = () => {
  return (
    <S.WhiteBoxSection>
      <S.CommonWhiteBoxSectionTitle>
        <FiUpload /> 데이터 업로드
      </S.CommonWhiteBoxSectionTitle>

      <CommonUploadFile iconType="file" extensions={["FASTA", "BAM", "TSV", "CSV", "VCF", "JSON"]} isButton={false} isBlue={true} padding="3rem 0" />
    </S.WhiteBoxSection>
  );
};
