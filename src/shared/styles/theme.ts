const windowSize = {
  small: `screen and (max-width: 600px)`,
  base: `screen and (max-width: 768px)`,
  large: `screen and (max-width: 1024px)`,
};

const fontSize = {
  xs: "0.5rem",
  sm: "0.75rem",
  base: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
};

const colors = {
  background: {
    default: "#F8FAFC",
    skyBlue: "#E4F4FE",
  },
  text: {
    default: "#1C2538",
    gray: "#7583A5",
    lightGray: "#A6B5C6",
  },
  blue: {
    primary: "#377DF4",
  },
  border: {
    gray: "#E8EDF3",
    lightGray: "#F1F4F7",
  },
};

const theme = {
  windowSize,
  fontSize,
  colors,
};

export default theme;
