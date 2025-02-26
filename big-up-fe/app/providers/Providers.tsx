"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { perygonTheme } from "../theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  return <ChakraProvider theme={perygonTheme}>{children}</ChakraProvider>;
}
