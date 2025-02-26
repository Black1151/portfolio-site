import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { Recognition, User } from "@prisma/client";

const isSkipDb = process.env.SKIP_BUILD_DB_CALLS === "true";

export async function GET() {
  if (isSkipDb) {
    return NextResponse.json([]);
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
      uniqueId: true,
      officeName: true,
      departmentName: true,
    },
  });

  const bigUpTypes = await prisma.bigUpType.findMany();

  const recognitions = await prisma.recognition.findMany({
    include: {
      sender: true,
      recipient: true,
      type: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalBigUp = recognitions.length;

  const now = new Date();
  const currentMonthRecognitions = recognitions.filter(
    (r: Recognition) =>
      r.createdAt.getMonth() === now.getMonth() &&
      r.createdAt.getFullYear() === now.getFullYear()
  );
  const totalCurrentMonthBigUp = currentMonthRecognitions.length;

  let averageBigUpMonthly = 0;
  if (recognitions.length > 0) {
    const firstDate = recognitions[recognitions.length - 1].createdAt;
    const months =
      (now.getFullYear() - firstDate.getFullYear()) * 12 +
      now.getMonth() -
      firstDate.getMonth() +
      1;
    averageBigUpMonthly = Math.floor(totalBigUp / months);
  }

  const currentUser = users[0] || null;
  let yourBigUpStats = null;
  if (currentUser) {
    const given = recognitions.filter(
      (r: Recognition) => r.senderId === currentUser.id
    );
    const received = recognitions.filter(
      (r: Recognition) => r.recipientId === currentUser.id
    );
    yourBigUpStats = {
      bigUpGivenPoints: given.length,
      bigUpReceivedPoints: received.length,
      bigUpTotal: given.length + received.length,
      bigUpRanking: 1,
      userName: currentUser.fullName,
      userLocation: currentUser.officeName || "Unknown",
      userImage: currentUser.imageUrl,
    };
  }

  const leaderboardData = await Promise.all(
    users.map(async (user: User) => {
      const bigUpGiven = await prisma.recognition.count({
        where: { senderId: user.id },
      });
      const bigUpReceived = await prisma.recognition.count({
        where: { recipientId: user.id },
      });
      return {
        userId: user.id,
        userName: user.fullName,
        userUniqueId: user.uniqueId,
        userImageUrl: user.imageUrl,
        officeName: user.officeName || "Unknown",
        departmentName: user.departmentName || "Unknown",
        bigUpGiven,
        bigUpReceived,
        bigUpTotal: bigUpGiven + bigUpReceived,
      };
    })
  );

  leaderboardData.sort(
    (a: (typeof leaderboardData)[0], b: (typeof leaderboardData)[0]) =>
      b.bigUpTotal - a.bigUpTotal
  );
  const bigUpLeaderboard = leaderboardData.map(
    (entry: (typeof leaderboardData)[0], index: number) => ({
      ...entry,
      bigUpRanking: index + 1,
    })
  );

  const bigUpWall = recognitions.map(
    (
      r: Recognition & { recipient: User; sender: User; type: { name: string } }
    ) => ({
      userNameTo: r.recipient.fullName,
      userImageUrlTo: r.recipient.imageUrl,
      userIdUrlTo: r.recipient.id,
      userUniqueIdUrlTo: r.recipient.uniqueId,
      userNameFrom: r.sender.fullName,
      createdAt: r.createdAt.toISOString(),
      bigUpMessage: r.message,
      bigUpCategory: r.type.name,
      bigUpDescription: r.description,
    })
  );

  const bigUpToMe = currentUser
    ? bigUpWall.filter(
        (entry: (typeof bigUpWall)[0]) => entry.userIdUrlTo === currentUser.id
      )
    : [];
  const bigUpFromMe = currentUser
    ? bigUpWall.filter(
        (entry: (typeof bigUpWall)[0]) =>
          entry.userNameFrom === currentUser.fullName
      )
    : [];

  const data = {
    users,
    bigUpTypes,
    totalBigUp,
    averageBigUpMonthly,
    totalCurrentMonthBigUp,
    yourBigUpStats,
    bigUpLeaderboard,
    bigUpWall,
    bigUpToMe,
    bigUpFromMe,
  };

  return NextResponse.json(data);
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
