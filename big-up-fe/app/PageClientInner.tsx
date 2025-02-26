"use client";

import React, { useState } from "react";

import {
  Button,
  Grid,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { BigUpMasonry, BigUpMasonryProps } from "./masonry/BigUpMasonry";
import { PerygonTabs } from "./tabs/PerygonTabs";
import SubmitScoreModal from "./SubmitScoreModal";
import { BigUpCategory, BigUpTeamMember } from "./types";
import { SpringScale } from "./animations/SpringScale";

interface PageClientInnerProps {
  masonryData: BigUpMasonryProps;
  tabsData: { header: string; content: JSX.Element }[];
  modalData: {
    teamMembers: BigUpTeamMember[];
    categories: BigUpCategory[];
  };
}

export const PageClientInner: React.FC<PageClientInnerProps> = ({
  masonryData,
  tabsData,
  modalData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const user = { userId: 12 };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (formData: {
    teamMember: string;
    category: string;
    message: string;
  }) => {
    setIsModalOpen(false);

    try {
      const response = await fetch("/api/auth/big-up/submitBigUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUserId: user?.userId,
          toUserId: formData.teamMember,
          reason: formData.message,
          bigupTypeId: formData.category,
          customerId: "1",
        }),
      });

      const result = await response.json();
      // need to move this into this compoentn as the one above is server.
      // onDataUpdated();
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting BigUp:", error);
    }
  };

  return (
    <>
      <Grid
        width={["100%"]}
        gridTemplateColumns={["1fr", null, null, "1fr 2fr"]}
        gap={5}
        maxWidth={3000}
      >
        <VStack width="100%" gap={5}>
          <BigUpMasonry {...masonryData} />
          <SpringScale delay={Math.random() * 0.5} style={{ width: "100%" }}>
            <Button
              height={75}
              width="100%"
              bg="seduloGreen"
              color="white"
              _hover={{ color: "seduloGreen", bg: "white" }}
              borderRadius="lg"
              fontSize="xl"
              border="2px solid white"
              fontWeight="bold"
              flex={1}
              onClick={handleButtonClick}
            >
              Big Up Someone!
            </Button>
          </SpringScale>
        </VStack>
        <SpringScale delay={0} style={{ width: "100%" }}>
          <PerygonTabs tabs={tabsData} />
        </SpringScale>

        <SubmitScoreModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          teamMembers={modalData.teamMembers}
          categories={modalData.categories}
        />
      </Grid>

      {/* Success modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="pink.500"
          color="white"
          borderRadius="lg"
          textAlign="center"
          p={5}
        >
          <ModalHeader>Recognition sent!</ModalHeader>
          <ModalBody>Thank you for appreciating your colleagues.</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
