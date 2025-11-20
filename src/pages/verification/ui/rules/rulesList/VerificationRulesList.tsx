import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { VERIFICATION_RULES_SAMPLES } from "../../../consts";
import * as Styles from "./rulesList.styles";
import { CommonWhiteBoxSectionTitle } from "@/shared";
import { apiClient } from "@/shared/api";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

interface VerificationRule {
  id: number;
  label: string;
  category: string;
  metric: string;
  condition: string;
  threshold: string;
  status: "active" | "inactive";
}

export const VerificationRulesList = () => {
  const [rules, setRules] = useState<VerificationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getVerificationRules(projectId);
        setRules(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "규칙을 불러오는데 실패했습니다.");
        console.error("Failed to fetch verification rules:", err);
        // 에러 발생 시 기본 샘플 데이터 사용
        setRules(VERIFICATION_RULES_SAMPLES as any);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [projectId]);

  if (loading) {
    return (
      <>
        <S.CommonWhiteBoxSectionTitle>
          <IoSettingsOutline /> 품질 검증 규칙 목록
        </S.CommonWhiteBoxSectionTitle>
        <div>로딩 중...</div>
      </>
    );
  }

  if (error && rules.length === 0) {
    return (
      <>
        <S.CommonWhiteBoxSectionTitle>
          <IoSettingsOutline /> 품질 검증 규칙 목록
        </S.CommonWhiteBoxSectionTitle>
        <div>에러: {error}</div>
      </>
    );
  }

  const displayRules = rules.length > 0 ? rules : (VERIFICATION_RULES_SAMPLES as any);

  return (
    <>
      <S.CommonWhiteBoxSectionTitle>
        <IoSettingsOutline /> 품질 검증 규칙 목록
      </S.CommonWhiteBoxSectionTitle>
      <S.VerificationRulesList>
        {displayRules.map((sample: any) => (
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
