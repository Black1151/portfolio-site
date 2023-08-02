import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import EmployeeDetailsModal from "@/components/modals/EmployeeDetailsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchEmployeeOverview, fetchEmployee } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";
import { EmployeeOverview } from "@/types";
import OverviewCard from "@/components/other/OverviewCard";
import { useRouter } from "next/router";
import { checkSession } from "@/store/authSlice";

const MotionBox = motion(Box);

const Index = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [displayedCards, setDisplayedCards] = useState<
    EmployeeOverview[] | null
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { data: employees, status: employeesLoading } = useSelector(
    (state: RootState) => state.employee.employeeEntities
  );

  const { executeAction: fetchEmployees } = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Failed to fetch employees",
  });

  const { executeAction: fetchEmployeeDetails } = useAsyncAction({
    action: fetchEmployee,
    errorMessage: "Failed to fetch employee details",
  });

  const { executeAction: checkLoggedIn } = useAsyncAction({
    action: checkSession,
  });

  const employee = useSelector(
    (state: RootState) => state.employee.employeeDetail.data
  );

  useEffect(() => {
    checkLoggedIn();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isAuthenticated.data) {
      router.replace("/login");
    } else {
      fetchEmployees();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (employeesLoading === "succeeded") {
      const setImageTimeout = setTimeout(() => {
        setDisplayedCards(employees);
      }, 1000);
      const fadeInTimeout = setTimeout(() => {
        setFadeIn(true);
      }, 1500);
      return () => {
        clearTimeout(setImageTimeout);
        clearTimeout(fadeInTimeout);
      };
    } else {
      setFadeIn(false);
    }
  }, [employeesLoading]);

  const handleCardClick = (id: number) => {
    fetchEmployeeDetails(id).then(() => {
      onOpen();
    });
  };

  return (
    <MotionBox
      p={5}
      bg="medPBlue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      pt={78}
      height="100%"
      minHeight="100vh"
    >
      <SimpleGrid
        gridTemplateColumns={[
          `repeat(1, 1fr)`,
          `repeat(1, 1fr)`,
          `repeat(2, 1fr)`,
          null,
          `repeat(3, 1fr)`,
          null,
          `repeat(4, 1fr)`,
          `repeat(5, 1fr)`,
        ]}
        spacing={5}
        position="relative"
        justifyContent="center"
      >
        {displayedCards &&
          displayedCards.map((employee) => (
            <OverviewCard
              key={employee.id}
              employee={employee}
              handleCardClick={handleCardClick}
              employeesLoading={employeesLoading}
              showCard={fadeIn}
            />
          ))}
      </SimpleGrid>
      {employee && (
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          employee={employee}
        />
      )}
    </MotionBox>
  );
};

export default Index;
