// app/api/recognition/route.ts

import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

const isSkipDb = process.env.SKIP_BUILD_DB_CALLS === "true";

export async function POST(request: Request) {
  if (isSkipDb) {
    return NextResponse.json([]);
  }

  try {
    const body = await request.json();
    const { teamMember, category, message } = body;
    const senderId = 1;
    const recipientId = parseInt(teamMember, 10);
    const typeId = parseInt(category, 10);
    const description = message;

    const recognition = await prisma.recognition.create({
      data: {
        message,
        description,
        sender: {
          connect: { id: senderId },
        },
        recipient: {
          connect: { id: recipientId },
        },
        type: {
          connect: { id: typeId },
        },
      },
    });

    return NextResponse.json({ success: true, recognition });
  } catch (error: any) {
    console.error("Error creating recognition:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
