import { InputLabel, MenuItem } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import * as Styles from "./addRule.styles";
import { CommonWhiteBoxSectionTitle } from "@/shared";

const S = { ...Styles, CommonWhiteBoxSectionTitle };

export const AddRule = () => {
  return (
    <div>
      <S.CommonWhiteBoxSectionTitle>
        <FaPlus /> 새 품질 규칙 추가
      </S.CommonWhiteBoxSectionTitle>

      <S.CustomFormControl>
        <S.CustomInput placeholder="규칙 이름" />

        <S.CustomSelectFormControl>
          <InputLabel>카테고리 선택</InputLabel>
          <S.CustomSelect label="카테고리 선택">
            <MenuItem value="1">카테고리 1</MenuItem>
            <MenuItem value="2">카테고리 2</MenuItem>
            <MenuItem value="3">카테고리 3</MenuItem>
          </S.CustomSelect>
        </S.CustomSelectFormControl>

        <S.CustomInput placeholder="측정 지표" />

        <S.CustomSelectFormControl>
          <InputLabel>{">="}</InputLabel>
          <S.CustomSelect label=">=">
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </S.CustomSelect>
        </S.CustomSelectFormControl>

        <S.CustomInput placeholder="임계값" />
      </S.CustomFormControl>
      <S.Button>
        <FaPlus /> 규칙 추가
      </S.Button>
    </div>
  );
};
