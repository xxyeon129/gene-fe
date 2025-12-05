/**
 * @description [품질관리 대시보드 페이지] 통계 섹션 UI 컴포넌트
 */

import { CardTitle } from "@/widgets";
import { FaChartColumn } from "react-icons/fa6";
import * as S from "./styles";

export const StatisticsList = () => {
  return (
    <S.DataStatisticsContainer>
      <CardTitle
        title="데이터 통계량"
        titleIcon={<FaChartColumn />}
        description="데이터 전체 특성 및 수량, 분포 통계"
      />

      <S.DataStatisticsUl>
        <S.DataStatisticsLi>
          <S.DataStatisticsItemTitle>총 유전자 수</S.DataStatisticsItemTitle>
          <S.DataStatisticsItemValue>60,660</S.DataStatisticsItemValue>
        </S.DataStatisticsLi>
        <S.DataStatisticsLi>
          <S.DataStatisticsItemTitle>총 샘플 수</S.DataStatisticsItemTitle>
          <S.DataStatisticsItemValue>1,226</S.DataStatisticsItemValue>
        </S.DataStatisticsLi>

        <S.DataStatisticsLi>
          <S.DataStatisticsItemTitle>데이터 타입</S.DataStatisticsItemTitle>
          <S.DataStatisticsItemValue>
            <S.DataTypeUl>
              <S.DataTypeLi>RNA-seq</S.DataTypeLi>
              <S.DataTypeLi>DNA Methylation</S.DataTypeLi>
              <S.DataTypeLi>Protein</S.DataTypeLi>
            </S.DataTypeUl>
          </S.DataStatisticsItemValue>
        </S.DataStatisticsLi>

        <S.DataStatisticsLi>
          <S.DataStatisticsItemTitle>결측률</S.DataStatisticsItemTitle>
          <S.DataStatisticsItemValue color="#07B67E">3.6%</S.DataStatisticsItemValue>
        </S.DataStatisticsLi>

        <S.DataStatisticsLi>
          <S.StatisticsNumberItem>
            <S.StatisticsNumberItemTitle>평균값</S.StatisticsNumberItemTitle>
            <S.StatisticsNumberItemValue>5.23</S.StatisticsNumberItemValue>
          </S.StatisticsNumberItem>

          <S.StatisticsNumberItem>
            <S.StatisticsNumberItemTitle>표준편차</S.StatisticsNumberItemTitle>
            <S.StatisticsNumberItemValue>2.17</S.StatisticsNumberItemValue>
          </S.StatisticsNumberItem>
        </S.DataStatisticsLi>
      </S.DataStatisticsUl>
    </S.DataStatisticsContainer>
  );
};
