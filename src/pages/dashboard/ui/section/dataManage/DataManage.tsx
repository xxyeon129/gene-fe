/**
 * @description [품질관리 대시보드 페이지] 데이터 업로드 및 관리 섹션 UI 컴포넌트
 */

import { CardTitle } from "@/widgets";
// icons
import { TbDatabase } from "react-icons/tb";
import { FiFileText } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
// styles
import * as St from "../section.styles";
import * as S from "./dataManage.styles";
import { useTheme } from "styled-components";
// const
import { UPLOADED_DATA } from "./const";

export const DataManage = () => {
  const theme = useTheme();

  return (
    <St.CommonSection>
      <CardTitle
        title="데이터 업로드 및 관리"
        titleIcon={<TbDatabase />}
        description="연결/업로드 데이터 리스트 조회 및 새 데이터 업로드"
      />

      <S.DataManageArticle>
        <S.DataManageSection>
          <S.Title>데이터 업로드</S.Title>
          <S.DataUploadInput type="file" multiple id="dataUploadInput" />
          <S.DataUploadLabel htmlFor="dataUploadInput">
            <S.UploadIcon />
            <S.UploadText>파일을 드래그하거나 클릭하여 업로드</S.UploadText>
            <S.UploadDescription>지원 형식: TSV, CSV</S.UploadDescription>
            <S.ButtonWrapper>
              <S.Button $isBlue={false}>파일 선택</S.Button>
              <S.Button $isBlue={true}>API 연결</S.Button>
            </S.ButtonWrapper>
          </S.DataUploadLabel>
        </S.DataManageSection>

        <S.DataManageSection>
          <S.Title>업로드된 데이터 (0개)</S.Title>
          <S.UploadedDataList>
            {UPLOADED_DATA.map((data) => (
              <S.UploadedDataItem key={data.id}>
                <S.UploadedDataItemLeftContainer>
                  <FiFileText size={22} color={theme.colors.blue.primary} />
                  <S.UploadedDataInfo>
                    <S.UploadedDataItemName>{data.name}</S.UploadedDataItemName>
                    <S.UploadedDataFileInfo>
                      <S.UploadedDataItemSize>{data.size}</S.UploadedDataItemSize>
                      <S.UploadedDataItemCreatedAt>{data.createdAt}</S.UploadedDataItemCreatedAt>
                    </S.UploadedDataFileInfo>
                  </S.UploadedDataInfo>
                </S.UploadedDataItemLeftContainer>

                <S.PreviewButton>
                  <FiEye size={18} color={theme.colors.text.gray} />
                  <span>미리보기</span>
                </S.PreviewButton>
              </S.UploadedDataItem>
            ))}
          </S.UploadedDataList>
        </S.DataManageSection>
      </S.DataManageArticle>
    </St.CommonSection>
  );
};
