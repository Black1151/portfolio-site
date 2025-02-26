"use client";

import { Box, Flex, HStack, Image, Text, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Person } from "@mui/icons-material";
import React from "react";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export interface NavBarProps {
  userFirstName: string;
  userImageUrl: string;
  userRole: string;
  logoImageUrl?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  userFirstName,
  userImageUrl,
}) => {
  const theme = useTheme();
  return (
    <HStack
      gap={[5, 20]}
      px={[3, 3, 5]}
      width="100%"
      fontSize={[20, 40]}
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      borderBottom="white 1px solid"
    >
      <MotionBox
        initial={{ x: "-5vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        w="150px"
        display="flex"
      >
        <Link href="/">
          <Text
            fontFamily="bonfire"
            fontSize={[30, 40]}
            bgClip="text"
            color="white"
          >
            Big Up!
          </Text>
        </Link>
      </MotionBox>
      <MotionHStack
        initial={{ x: "5vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        justifyContent="center"
        alignItems="center"
        gap={[2, 8]}
      >
        <Text display={["none", null, "block"]} color="white" fontSize={18}>
          Hello, {userFirstName}!
        </Text>

        <Box borderRadius="50%" overflow="hidden" width="40px" height="40px">
          {userImageUrl ? (
            <Image
              src={userImageUrl}
              alt="profile pic"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          ) : (
            <Flex
              bg={"gray.100"}
              width={"full"}
              height={"full"}
              align={"center"}
              justify={"center"}
            >
              <Person
                sx={{
                  color: "var(--chakra-colors-perygonPink)",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Flex>
          )}
        </Box>
      </MotionHStack>
    </HStack>
  );
};
