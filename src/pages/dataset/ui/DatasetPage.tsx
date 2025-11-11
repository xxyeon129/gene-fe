/**
 * @description 데이터셋 관리 페이지
 */

import { useState } from "react";
import * as S from "./datasetPage.styles";
import { ProjectManage } from "./components/ProjectManage";
import { DataInput } from "./components/DataInput";

export const DatasetPage = () => {
  return (
    <S.Section>
      <ProjectManage />
      <DataInput />
    </S.Section>
  );
};



