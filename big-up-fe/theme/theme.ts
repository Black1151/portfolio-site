import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const perygonTheme = extendTheme({
  config,
  colors: {
    perygonPink: "#ff0070",
    seduloRed: "#B4213D",
    yellow: "#EFC718",
    lightGreen: "#92C01F",
    seduloGreen: "#008000",
  },
  fonts: {
    heading: "Metropolis, sans-serif",
    body: "Metropolis, sans-serif",
    metropolis: "Metropolis, sans-serif",
    bonfire: "Bonfire, sans-serif",
  },
});
