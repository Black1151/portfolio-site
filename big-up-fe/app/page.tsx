import { Flex } from "@chakra-ui/react";
import { LeaderBoardTabContent } from "./tabs/LeaderBoardTab/LeaderBoardTabContent";
import { RecognitionList } from "./tabs/OtherTabs/RecognitionCardList";
import { PageClientInner } from "./PageClientInner";
import { BigUpData } from "./types";

export default function BigUpPage() {
  const data: BigUpData = {
    totalBigUp: 100,
    averageBigUpMonthly: 10,
    totalCurrentMonthBigUp: 20,
    yourBigUpStats: {
      bigUpGivenPoints: 5,
      bigUpReceivedPoints: 5,
      bigUpTotal: 10,
      bigUpRanking: 1,
      userName: "John Doe",
      userLocation: "New York, NY",
      userImage: "https://via.placeholder.com/150",
    },
    users: [
      {
        id: 1,
        imageUrl: "https://example.com/user1.jpg",
        fullName: "John Doe",
      },
      {
        id: 2,
        imageUrl: "https://example.com/user2.jpg",
        fullName: "Jane Smith",
      },
      {
        id: 3,
        imageUrl: "https://example.com/user3.jpg",
        fullName: "Michael Johnson",
      },
    ],
    bigUpTypes: [
      {
        id: 1,
        name: "Team Player",
      },
      {
        id: 2,
        name: "Innovation",
      },
      {
        id: 3,
        name: "Leadership",
      },
    ],
    bigUpLeaderboard: [
      {
        userId: 2,
        userName: "Jane Smith",
        userUniqueId: "user_jane_smith",
        userImageUrl: "https://example.com/user2.jpg",
        officeName: "San Francisco Office",
        departmentName: "Engineering",
        bigUpReceived: 50,
        bigUpGiven: 20,
        bigUpTotal: 70,
        bigUpRanking: 1,
      },
      {
        userId: 3,
        userName: "Michael Johnson",
        userUniqueId: "user_michael_johnson",
        userImageUrl: "https://example.com/user3.jpg",
        officeName: "Chicago Office",
        departmentName: "Marketing",
        bigUpReceived: 45,
        bigUpGiven: 15,
        bigUpTotal: 60,
        bigUpRanking: 2,
      },
      {
        userId: 1,
        userName: "John Doe",
        userUniqueId: "user_john_doe",
        userImageUrl: "https://example.com/user1.jpg",
        officeName: "New York Office",
        departmentName: "Sales",
        bigUpReceived: 40,
        bigUpGiven: 25,
        bigUpTotal: 65,
        bigUpRanking: 3,
      },
    ],
    bigUpWall: [
      {
        userNameTo: "Jane Smith",
        userImageUrlTo: "https://example.com/user2.jpg",
        userIdUrlTo: 2,
        userUniqueIdUrlTo: "user_jane_smith",
        userNameFrom: "John Doe",
        createdAt: "2025-01-15T10:00:00.000Z",
        bigUpMessage: "Great job on the new feature launch!",
        bigUpCategory: "Innovation",
        bigUpDescription: "Recognizing Jane’s creative problem-solving.",
      },
      {
        userNameTo: "Michael Johnson",
        userImageUrlTo: "https://example.com/user3.jpg",
        userIdUrlTo: 3,
        userUniqueIdUrlTo: "user_michael_johnson",
        userNameFrom: "Jane Smith",
        createdAt: "2025-01-18T09:30:00.000Z",
        bigUpMessage: "Thanks for helping organize the event!",
        bigUpCategory: "Team Player",
        bigUpDescription: "Michael stepped up and coordinated everything.",
      },
    ],
    bigUpToMe: [
      {
        userNameTo: "John Doe",
        userImageUrlTo: "https://example.com/user1.jpg",
        userIdUrlTo: 1,
        userUniqueIdUrlTo: "user_john_doe",
        userNameFrom: "Michael Johnson",
        createdAt: "2025-01-20T14:20:00.000Z",
        bigUpMessage: "Appreciate your support on the sales call!",
        bigUpCategory: "Leadership",
        bigUpDescription: "John led the sales team to a new partnership.",
      },
    ],
    bigUpFromMe: [
      {
        userNameTo: "Jane Smith",
        userImageUrlTo: "https://example.com/user2.jpg",
        userIdUrlTo: 2,
        userUniqueIdUrlTo: "user_jane_smith",
        userNameFrom: "John Doe",
        createdAt: "2025-01-15T10:00:00.000Z",
        bigUpMessage: "Great job on the new feature launch!",
        bigUpCategory: "Innovation",
        bigUpDescription: "Recognizing Jane’s creative problem-solving.",
      },
    ],
  };

  const tabsData = [
    {
      header: "Leader Board",
      content: <LeaderBoardTabContent items={data.bigUpLeaderboard} />,
    },
    {
      header: "The Wall",
      content: <RecognitionList items={data.bigUpWall} />,
    },
    {
      header: "To Me",
      content: <RecognitionList items={data.bigUpToMe} />,
    },
    {
      header: "From Me",
      content: <RecognitionList items={data.bigUpFromMe} />,
    },
  ];

  const masonryData = {
    items: [
      { title: "Company Total", content: data.totalBigUp },
      { title: "Average", content: data.averageBigUpMonthly },
      { title: "This Month", content: data.totalCurrentMonthBigUp },
      { title: "Your Total", content: data.yourBigUpStats.bigUpGivenPoints },
    ],
    userStats: data.yourBigUpStats,
  };

  const modalData = {
    teamMembers: data.users,
    categories: data.bigUpTypes,
  };

  return (
    <Flex
      w="100%"
      minH={["100%", "100vh"]}
      alignItems="center"
      justifyContent="center"
      backgroundImage="url('/big-up-app-bg.webp')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      pt={[91, null, null, 0]}
      pb={[31, 51, null, 0]}
      px={[2, null, null, 5]}
    >
      <PageClientInner
        masonryData={masonryData}
        tabsData={tabsData}
        modalData={modalData}
      />
    </Flex>
  );
}
