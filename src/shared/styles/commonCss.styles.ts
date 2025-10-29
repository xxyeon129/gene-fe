import { css } from "styled-components";

export const cssBoxShadow = css`
  box-shadow: rgba(55, 125, 244, 0.2) 1px 3px 7px;
`;

export const cssGradientBlueBackground = css`
  background: linear-gradient(to right, #39b7f8, #3a85f6);
`;

export const cssCard = css`
  border-radius: 1rem;
  padding: 1.75rem;

  display: flex;
  flex-direction: column;
`;

export const cssWithoutNavFullPage = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  row-gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background.skyBlue};
`;
