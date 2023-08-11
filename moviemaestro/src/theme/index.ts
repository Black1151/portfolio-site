import { createTheme } from "@mui/material/styles";

const defaultBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 16,
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      lineHeight: 1.1,
      [`@media (max-width:${defaultBreakpoints.values.sm}px)`]: {
        fontSize: "1.25rem",
      },
    },
    h2: {
      fontSize: "2rem",
      lineHeight: 1.2,
      [`@media (max-width:${defaultBreakpoints.values.sm}px)`]: {
        fontSize: "1.4rem",
      },
    },
    h3: {
      fontSize: "1.2rem",
      lineHeight: 1.2,
      [`@media (max-width:${defaultBreakpoints.values.sm}px)`]: {
        fontSize: "1.1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      [`@media (max-width:${defaultBreakpoints.values.sm}px)`]: {
        fontSize: "0.75rem",
      },
    },
  },
  palette: {
    primary: {
      main: "#8f1d59",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
        ":root": {
          width: "100vw",
        },
      },
    },
  },
});

export default theme;
