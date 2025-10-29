/**
 * @description 데이터 결측치 보간 페이지
 */

import { SelectProject } from "./selectProject";
import { InterpolateSetting } from "./interpolate";
import { AnalysisMissingValue } from "./analysis";
import * as Styled from "./missingValue.styles";
import { PageHeader } from "@/widgets";
import { TopHeaderWrapperWhiteBox } from "@/shared";

const S = { ...Styled, TopHeaderWrapperWhiteBox };

export const MissingValuePage = () => {
  return (
    <S.MissingValuePageArticle>
      <S.TopHeaderWrapperWhiteBox>
        <PageHeader />
      </S.TopHeaderWrapperWhiteBox>

      <S.ContentWrapper>
        <S.LeftContentWrapper>
          <SelectProject />
          <InterpolateSetting />
        </S.LeftContentWrapper>

        <S.RightContentWrapper>
          <AnalysisMissingValue />
        </S.RightContentWrapper>
      </S.ContentWrapper>
    </S.MissingValuePageArticle>
  );
};
