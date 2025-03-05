import { createSystem, defaultConfig } from "@chakra-ui/react";
import colors from "./colors";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      breakpoints: {
        base: { value: "375px" },
        sm: { value: "620px" },
        md: { value: "730px" },
        lg: { value: "900px" },
        xl: { value: "1090px" },
        xxl: { value: "1420px" },
        xxxl: { value: "1850px" },
      },
      colors,
      fonts: {
        body: { value: "Roboto, sans-serif" },
        heading: { value: "Roboto, sans-serif" },
        mono: { value: "Menlo, monospace" },
      },
      fontWeights: {
        thin: { value: 100 },
        normal: { value: 300 },
        medium: { value: 400 },
        bold: { value: 700 },
      },
    },
    components: {
      Text: {
        baseStyle: {
          fontWeight: { value: "normal" },
        },
      },
      Button: {
        baseStyle: {
          fontWeight: { value: "medium" },
          borderWidth: { value: "1px" },
        },
        variants: {
          green: {
            color: { value: "white" },
            borderColor: { value: "emerald" },
            backgroundColor: { value: "emerald" },
            _hover: {
              color: { value: "emerald" },
              backgroundColor: { value: "white" },
            },
          },
          blue: {
            color: { value: "white" },
            borderColor: { value: "pictonBlue" },
            backgroundColor: { value: "pictonBlue" },
            _hover: {
              color: { value: "pictonBlue" },
              backgroundColor: { value: "white" },
            },
          },
          orange: {
            color: { value: "white" },
            borderColor: { value: "xanthous" },
            backgroundColor: { value: "xanthous" },
            _hover: {
              color: { value: "xanthous" },
              backgroundColor: { value: "white" },
            },
          },
          red: {
            color: { value: "white" },
            borderColor: { value: "bittersweet" },
            backgroundColor: { value: "bittersweet" },
            _hover: {
              color: { value: "bittersweet" },
              backgroundColor: { value: "white" },
            },
          },
        },
      },
    },
  },
});

export default theme;
