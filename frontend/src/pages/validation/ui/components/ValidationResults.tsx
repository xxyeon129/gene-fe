import * as S from "./validationResults.styles";

const results = [
  {
    item: "데이터 타입 검증",
    result: "통과",
    issue: "-",
    action: "-",
    status: "완료",
    statusColor: "#10b981",
  },
  {
    item: "결측치 검사",
    result: "통과",
    issue: "4.8% 결측",
    action: "Imputation 권장",
    status: "완료",
    statusColor: "#10b981",
  },
  {
    item: "이상치 탐지",
    result: "주의",
    issue: "156개 이상치",
    action: "수동 검토 필요",
    status: "주의",
    statusColor: "#f59e0b",
  },
  {
    item: "중복 데이터",
    result: "통과",
    issue: "12개 중복",
    action: "자동 제거됨",
    status: "완료",
    statusColor: "#10b981",
  },
];

export const ValidationResults = () => {
  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <th>검증 항목</th>
            <th>결과</th>
            <th>문제 발견</th>
            <th>권장 조치</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.item}</td>
              <td>{result.result}</td>
              <td>{result.issue}</td>
              <td>{result.action}</td>
              <td>
                <S.Status $color={result.statusColor}>
                  {result.status === "완료" ? "✓ 완료" : "⚠ 주의"}
                </S.Status>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};



