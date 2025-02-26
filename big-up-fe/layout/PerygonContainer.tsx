"use client";

import { useTheme, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PerygonContatinerProps {
  children: ReactNode;
}

export const PerygonContainer: React.FC<PerygonContatinerProps> = ({
  children,
}) => {
  return (
    <VStack minH="100vh" width="100%" flex={1}>
      {children}
    </VStack>
  );
};
