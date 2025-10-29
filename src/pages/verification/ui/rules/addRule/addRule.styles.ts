import { cssBoxShadow, cssGradientBlueBackground } from "@/shared";
import { FormControl, Input, Select } from "@mui/material";
import styled from "styled-components";

export const CustomInput = styled(Input)`
  flex: 1;
  border: 2px solid ${({ theme }) => theme.colors.background.skyBlue};
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 1rem;
  background-color: white;

  ::placeholder {
    font-weight: 600;
  }

  &::before,
  &::after {
    display: none;
  }

  &.MuiInput-underline {
    &::before,
    &::after {
      display: none;
    }
  }
`;

export const CustomFormControl = styled(FormControl)`
  && {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
  }
`;

export const CustomSelectFormControl = styled(FormControl)`
  flex: 1;
  min-width: 20rem;
  background-color: white;
`;

export const CustomSelect = styled(Select)`
  && {
    border-radius: 0.5rem;

    & .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.background.skyBlue};
      border-width: 2px;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.background.skyBlue};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.background.skyBlue};
    }
  }
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  ${cssGradientBlueBackground}
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;

  font-weight: 700;

  ${cssBoxShadow};
`;
