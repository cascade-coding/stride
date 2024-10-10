"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

async function getOrCreateLog() {
  try {
    const today = new Date();

    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const authId = authUser.id;

    const startOfDay = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        23,
        59,
        59
      )
    );

    const user = await prisma.user.findFirst({
      where: {
        authId,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

    const { id: userId } = user;

    // Check if the log for today already exists
    const existingLog = await prisma.log.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: {
        entries: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (existingLog) {
      return {
        ...existingLog,
        createdAt: new Date(existingLog.createdAt).toISOString(),
      };
    } else {
      const logCount = await prisma.log.count({
        where: { userId: userId },
      });

      const newLog = await prisma.log.create({
        data: {
          dayNumber: logCount + 1, // Increment day number by 1
          dayStatus: "Good",
          userId: userId, // Associate with the current user
        },
        include: {
          entries: {
            include: {
              tag: true,
            },
          },
        },
      });
      return {
        ...newLog,
        createdAt: new Date(newLog.createdAt).toISOString(),
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

async function updateStatus({
  logId,
  value,
}: {
  logId: string;
  value: string;
}) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const updatedLog = await prisma.log.update({
      where: {
        id: logId,
      },
      data: {
        dayStatus: value,
      },
      include: {
        entries: {
          include: {
            tag: true,
          },
        },
      },
    });

    return {
      ...updatedLog,
      createdAt: new Date(updatedLog.createdAt).toISOString(),
    };

    console.log({ updatedLog });

    console.log({ logId });

    console.log({ updated: value });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { getOrCreateLog, updateStatus };
