import * as S from "./dataAnalysis.styles";

const omicsData = [
  { type: "DNA", missingRate: "1%", completeness: "99%", color: "#10b981", bg: "#dbeafe" },
  { type: "RNA", missingRate: "20%", completeness: "80%", color: "#f59e0b", bg: "#fef3c7" },
  { type: "PRO", missingRate: "25%", completeness: "75%", color: "#ef4444", bg: "#ede9fe" },
];

export const DataAnalysis = () => {
  return (
    <S.SettingCard>
      <S.SettingHeader>
        <S.SettingIcon>📊</S.SettingIcon>
        <S.SettingTitle>데이터 현황 분석</S.SettingTitle>
      </S.SettingHeader>

      <S.FormGroup>
        <S.FormLabel>프로젝트 선택</S.FormLabel>
        <S.FormSelect>
          <option>암 유전체 프로젝트 - 멀티오믹스</option>
          <option>알츠하이머 연구 - RNA + 메틸화</option>
          <option>심혈관 질환 코호트 - 전체 오믹스</option>
        </S.FormSelect>
      </S.FormGroup>

      <S.StatusContainer>
        <S.StatusTitle>오믹스별 결측 현황</S.StatusTitle>
        {omicsData.map((omics, index) => (
          <S.OmicsItem key={index}>
            <S.OmicsLeft>
              <S.OmicsBadge $bg={omics.bg} $color={omics.color}>{omics.type}</S.OmicsBadge>
              <div>
                <S.OmicsLabel>Missing Rate</S.OmicsLabel>
                <S.OmicsValue $color={omics.color}>{omics.missingRate}</S.OmicsValue>
              </div>
            </S.OmicsLeft>
            <S.OmicsRight>
              <S.OmicsLabel>완전성</S.OmicsLabel>
              <S.OmicsCompleteness $color={omics.color}>{omics.completeness}</S.OmicsCompleteness>
            </S.OmicsRight>
          </S.OmicsItem>
        ))}
        <S.Summary>
          <S.SummaryItem>
            <span>전체 평균 결측률</span>
            <S.SummaryValue $color="#ef4444">15.3%</S.SummaryValue>
          </S.SummaryItem>
          <S.SummaryItem>
            <span>패턴 유형</span>
            <S.SummaryValue $color="#667eea">MAR (무작위 결측)</S.SummaryValue>
          </S.SummaryItem>
        </S.Summary>
      </S.StatusContainer>
    </S.SettingCard>
  );
};



