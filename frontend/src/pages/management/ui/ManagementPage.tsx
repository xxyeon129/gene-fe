/**
 * @description 품질 관리 (Imputation) 페이지
 */

import { useState } from "react";
import * as S from "./managementPage.styles";
import { DataAnalysis } from "./components/DataAnalysis";
import { ImputationStrategy } from "./components/ImputationStrategy";
import { PreviewResults } from "./components/PreviewResults";

interface ImputationResult {
  jobId: string;
  status: string;
  results?: {
    rna_missing_imputed: number;
    protein_missing_imputed: number;
    methyl_missing_imputed: number;
    total_samples: number;
    output_files: {
      rna: string;
      protein: string;
      methyl: string;
    };
  };
}

export const ManagementPage = () => {
  const [imputationResult, setImputationResult] = useState<ImputationResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>🔧 지능형 결측치 보간 시스템</S.CardTitle>
        </S.CardHeader>

        <S.Alert $type="info">
          <span>💡</span>
          <div>
            <div>스마트 Imputation</div>
            <div>AI 기반 알고리즘이 데이터 패턴을 학습하여 최적의 보간 전략을 자동으로 선택합니다.</div>
          </div>
        </S.Alert>

        <S.ImputationContainer>
          <DataAnalysis />
          <ImputationStrategy
            onImputationComplete={setImputationResult}
            onExecutionStart={() => setIsExecuting(true)}
            onExecutionEnd={() => setIsExecuting(false)}
          />
        </S.ImputationContainer>

        <PreviewResults
          imputationResult={imputationResult}
          isExecuting={isExecuting}
        />
      </S.Card>
    </S.Section>
  );
};



