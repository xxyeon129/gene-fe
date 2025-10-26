/**
 * @description [품질관리 대시보드 페이지] 통계 섹션 UI 컴포넌트
 */

import * as St from "../section.styles";
import { CardHeader } from "@/widgets";
import { FaChartColumn } from "react-icons/fa6";

export const Statistics = () => {
  return (
    <St.CommonSection>
      <CardHeader
        title="데이터 통계량"
        titleIcon={<FaChartColumn />}
        description="데이터 전체 특성 및 수량, 분포 통계"
      />
    </St.CommonSection>
  );
};
