"use client";

import theme from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

interface LayoutProvidersProps {
  children: React.ReactNode;
}

export const LayoutProviders = ({ children }: LayoutProvidersProps) => {
  return <ChakraProvider value={theme}>{children}</ChakraProvider>;
};
