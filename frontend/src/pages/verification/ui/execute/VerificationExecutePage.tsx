import * as Styles from "./execute.styles";
import { CommonWhiteBoxSection, CommonWhiteBoxSectionTitle } from "@/shared";
import { VerificationProvider, useVerification } from "../../contexts/VerificationContext";
import { VerificationSelectProject } from "./SelectProject";
import { VerificationUploadData } from "./uploadData";
import { VerificationSelectType } from "./SelectType";
import { VerificationSelectRules } from "./SelectRules";
import { FiPlay, FiCheckCircle, FiXCircle } from "react-icons/fi";

const S = { ...Styles, CommonWhiteBoxSection, CommonWhiteBoxSectionTitle };

const VerificationContent = () => {
  const {
    selectedProjectId,
    isValidating,
    validationResult,
    validationError,
    executeValidation
  } = useVerification();

  const handleStartValidation = () => {
    if (!selectedProjectId) {
      alert("프로젝트를 선택해주세요.");
      return;
    }
    executeValidation();
  };

  return (
    <S.PageArticle>
      <VerificationSelectProject />
      <VerificationUploadData />
      <VerificationSelectType />
      <VerificationSelectRules />

      <S.CommonWhiteBoxSection $alignCenter={true}>
        <S.VerificationStartButton
          onClick={handleStartValidation}
          disabled={isValidating || !selectedProjectId}
        >
          <FiPlay /> {isValidating ? "검증 진행 중..." : "품질 검증 시작"}
        </S.VerificationStartButton>
      </S.CommonWhiteBoxSection>

      {/* 검증 오류 표시 */}
      {validationError && (
        <S.CommonWhiteBoxSection>
          <S.CommonWhiteBoxSectionTitle>
            <FiXCircle /> 검증 오류
          </S.CommonWhiteBoxSectionTitle>
          <div style={{ color: "red", padding: "20px" }}>
            {validationError}
          </div>
        </S.CommonWhiteBoxSection>
      )}

      {/* 검증 결과 표시 */}
      {validationResult && (
        <S.CommonWhiteBoxSection>
          <S.CommonWhiteBoxSectionTitle>
            {validationResult.all_passed ? <FiCheckCircle /> : <FiXCircle />} 검증 결과
          </S.CommonWhiteBoxSectionTitle>
          <div style={{ padding: "20px" }}>
            <p>
              전체 파일: {validationResult.total_files}개 |
              통과: {validationResult.passed_files}개 |
              전체 통과: {validationResult.all_passed ? "✅" : "❌"}
            </p>

            {validationResult.files.map((file, index) => (
              <div key={index} style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: file.passed ? "#f0f9ff" : "#fff5f5"
              }}>
                <h4>{file.filename} {file.passed ? "✅" : "❌"}</h4>
                <ul style={{ marginTop: "10px" }}>
                  <li>전체 값: {file.total_values.toLocaleString()}개</li>
                  <li>NaN 개수: {file.nan_count.toLocaleString()}개</li>
                  <li>NaN 비율: {file.nan_percentage}%</li>
                  <li>데이터 크기: {file.shape[0]} x {file.shape[1]}</li>
                  <li>최대 행 NaN 비율: {file.max_row_nan_percentage}%</li>
                  <li>최대 열 NaN 비율: {file.max_col_nan_percentage}%</li>
                </ul>
              </div>
            ))}
          </div>
        </S.CommonWhiteBoxSection>
      )}
    </S.PageArticle>
  );
};

export const VerificationExecutePage = () => {
  return (
    <VerificationProvider>
      <VerificationContent />
    </VerificationProvider>
  );
};
