"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

/*
 
! craete the latest log or get the latest one

*/
async function getOrCreateLog({ today, now }: { today: string; now: string }) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const authId = authUser.id;

    const startOfDay = new Date(`${today}T00:00:00.000Z`); // Start of the day in UTC
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    const dateTime = new Date(`${now}Z`); // Add 'Z' to indicate it's in UTC

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
          createdAt: dateTime,
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

/*
 
! fetch all the previous logs for an user

*/
async function previousLogs({
  page = 1,
  limit = 2,
  today,
}: {
  page: number;
  limit?: number;
  today: string;
}) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

    const { id: userId } = user;

    const skip = (page - 1) * limit; // number of records to skip
    const take = limit; // number of records to take

    const startOfDay = new Date(`${today}T00:00:00.000Z`); // Start of the day in UTC
    const endOfDay = new Date(`${today}T23:59:59.999Z`);

    const logs = await prisma.log.findMany({
      select: {
        id: true,
        dayNumber: true,
        createdAt: true,
      },
      skip: skip,
      take: take,
      where: {
        userId,

        NOT: {
          createdAt: {
            lte: endOfDay,
            gt: startOfDay,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalLogs = await prisma.log.count({
      where: {
        userId,
      },
    }); // count total logs for pagination metadata

    const serializedLogs = logs.map((log) => ({
      ...log,
      createdAt: log.createdAt.toISOString(), // Convert Date to string
    }));

    return {
      logs: serializedLogs,
      meta: {
        totalLogs,
        currentPage: page,
        totalPages: Math.ceil(totalLogs / limit),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

/*
 
! get log by id

*/
async function getLogById({ logId }: { logId: string }) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const authId = authUser.id;

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
        id: logId,
        userId: userId,
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
      return { errorMessage: "something went wrong" };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

/*

! get all tags

*/

async function getAllTags() {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

    const tags = await prisma.tag.findMany({
      where: { userId: user.id },
    });

    return tags;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { getOrCreateLog, previousLogs, getLogById, getAllTags };
