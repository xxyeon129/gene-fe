import * as S from "./processTimeline.styles";

const timelineItems = [
  {
    title: "데이터 로딩 완료",
    time: "14:30:12 - 450개 샘플, 20,000개 변수",
    status: "completed",
  },
  {
    title: "품질 검증 수행",
    time: "14:30:45 - 완전성, 정확성, 일관성 검사",
    status: "completed",
  },
  {
    title: "Imputation 처리",
    time: "14:31:20 - KNN 알고리즘 적용, 10.4% 결측 보간",
    status: "warning",
  },
  {
    title: "최종 검증 완료",
    time: "14:32:05 - 품질 점수 94.3% 달성",
    status: "completed",
  },
];

export const ProcessTimeline = () => {
  return (
    <S.TimelineCard>
      <S.TimelineTitle>검증 프로세스 타임라인</S.TimelineTitle>
      <S.TimelineContainer>
        {timelineItems.map((item, index) => (
          <S.TimelineItem key={index}>
            <S.TimelineDot $status={item.status as "completed" | "warning" | "pending"} />
            <S.TimelineContent>
              <S.TimelineItemTitle>{item.title}</S.TimelineItemTitle>
              <S.TimelineItemTime>{item.time}</S.TimelineItemTime>
            </S.TimelineContent>
          </S.TimelineItem>
        ))}
      </S.TimelineContainer>
    </S.TimelineCard>
  );
};



