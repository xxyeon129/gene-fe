import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useMemo, useState } from "react";
import { MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST } from "../../consts";
import * as S from "./interpolate.styles";

export const InterpolateSetting = () => {
  const initialValues = useMemo(
    () => Object.fromEntries(MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST.map((s) => [s.label, s.defaultValue])) as Record<string, number>,
    []
  );
  const [valuesByLabel, setValuesByLabel] = useState<Record<string, number>>(initialValues);

  return (
    <S.WhiteBoxSection>
      <S.Title>🎯 보간 설정</S.Title>
      <S.InterpolateSettingList>
        {MISSING_VALUE_PAGE_INTERPOLATE_SETTING_LIST.map((setting) => (
          <S.InterpolateSettingItem key={setting.label}>
            <S.SliderTextWrapper>
              <S.InterpolateSettingItemLabel>{setting.label}</S.InterpolateSettingItemLabel>
              <S.SliderPercentage $isBlue={setting.label === "보간 임계값"}>
                {valuesByLabel[setting.label] ?? setting.defaultValue}%
              </S.SliderPercentage>
            </S.SliderTextWrapper>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={valuesByLabel[setting.label] ?? setting.defaultValue}
                aria-label="Default"
                valueLabelDisplay="off"
                onChange={(_, newValue) =>
                  setValuesByLabel((prev) => ({
                    ...prev,
                    [setting.label]: Array.isArray(newValue) ? newValue[0] : (newValue as number),
                  }))
                }
                sx={{
                  color: "#606060",
                  height: 7,
                  py: 0,
                }}
              />
            </Box>
            <S.InterpolateSettingItemDescription>{setting.description}</S.InterpolateSettingItemDescription>
          </S.InterpolateSettingItem>
        ))}
      </S.InterpolateSettingList>

      <S.SkyBlueDescriptionBox>
        <S.SkyBlueDescriptionTitle>💡 예상 결과</S.SkyBlueDescriptionTitle>
        <S.SkyBlueDescriptionContent>약 78개의 샘플, 2262개 유전자 보간 예정</S.SkyBlueDescriptionContent>
      </S.SkyBlueDescriptionBox>
    </S.WhiteBoxSection>
  );
};
