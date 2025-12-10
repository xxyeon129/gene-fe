import * as S from "./validationResults.styles";

interface ValidationResult {
  files: Array<{
    filename: string;
    total_values: number;
    nan_count: number;
    nan_percentage: number;
    shape: number[];
    passed: boolean;
  }>;
  total_files: number;
  passed_files: number;
  all_passed: boolean;
}

interface ValidationResultsProps {
  validationResult: ValidationResult | null;
}

export const ValidationResults = ({ validationResult }: ValidationResultsProps) => {
  if (!validationResult) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        검증을 실행하여 상세 결과를 확인하세요.
      </div>
    );
  }

  const results = validationResult.files.map(file => ({
    item: file.filename,
    result: file.passed ? "통과" : "실패",
    issue: `${file.nan_percentage}% 결측 (${file.nan_count.toLocaleString()}/${file.total_values.toLocaleString()})`,
    action: file.nan_percentage > 10 ? "보간(Imputation) 권장" : "-",
    status: file.passed ? "완료" : "주의",
    statusColor: file.passed ? "#10b981" : "#ef4444",
    dataSize: `${file.shape[0]} x ${file.shape[1]}`,
  }));

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <th>파일명</th>
            <th>데이터 크기</th>
            <th>결측 정보</th>
            <th>권장 조치</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={{ fontWeight: "500" }}>{result.item}</td>
              <td>{result.dataSize}</td>
              <td>{result.issue}</td>
              <td>{result.action}</td>
              <td>
                <S.Status $color={result.statusColor}>
                  {result.status === "완료" ? "✓ 통과" : "⚠ 주의"}
                </S.Status>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};



