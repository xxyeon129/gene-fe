import * as S from "./recentActivity.styles";

const activities = [
  {
    project: "암 유전체 연구",
    dataType: "전사체",
    quality: "95.8%",
    qualityColor: "#10b981",
    status: "검증완료",
    statusBg: "#d1fae5",
    statusColor: "#065f46",
    lastUpdate: "10분 전",
  },
  {
    project: "알츠하이머 코호트",
    dataType: "메틸화",
    quality: "87.2%",
    qualityColor: "#f59e0b",
    status: "처리중",
    statusBg: "#fef3c7",
    statusColor: "#92400e",
    lastUpdate: "1시간 전",
  },
  {
    project: "심혈관 질환 연구",
    dataType: "대사체",
    quality: "92.4%",
    qualityColor: "#10b981",
    status: "검증완료",
    statusBg: "#d1fae5",
    statusColor: "#065f46",
    lastUpdate: "3시간 전",
  },
];

export const RecentActivity = () => {
  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <S.TableTh>프로젝트</S.TableTh>
            <S.TableTh>데이터 타입</S.TableTh>
            <S.TableTh>품질 점수</S.TableTh>
            <S.TableTh>상태</S.TableTh>
            <S.TableTh>마지막 업데이트</S.TableTh>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.project}</td>
              <td>{activity.dataType}</td>
              <td>
                <S.QualityScore $color={activity.qualityColor}>{activity.quality}</S.QualityScore>
              </td>
              <td>
                <S.StatusBadge $bg={activity.statusBg} $color={activity.statusColor}>
                  {activity.status}
                </S.StatusBadge>
              </td>
              <td>{activity.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};
