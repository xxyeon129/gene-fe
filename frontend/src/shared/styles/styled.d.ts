import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        default: string;
        skyBlue: string;
      };
      text: {
        default: string;
        gray: string;
        lightGray: string;
        darkGray: string;
      };
      blue: {
        primary: string;
      };
      border: {
        gray: string;
        lightGray: string;
      };
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    windowSize: {
      small: string;
      base: string;
      large: string;
    };
  }
}
