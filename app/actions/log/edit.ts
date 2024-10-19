"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

/*
 
! updaet log status

*/

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

/*

! create or update log entry

*/

interface UpsertEntryInput {
  logId: string;
  entryId?: string;
  title: string;
  report?: string;
  rating?: number;
  tagId?: string;
}

async function createOrUpdateEntry(input: UpsertEntryInput) {
  try {
    const {
      logId,
      entryId,
      title,
      report,
      rating: newRating = 0,
      tagId,
    } = input;

    const rating = +newRating;

    // Check if entryId is provided for updating
    if (entryId && entryId !== "") {
      await prisma.entry.upsert({
        where: { id: entryId },
        update: {
          title,
          report,
          rating,
          tagId,
        },
        create: {
          title,
          report,
          rating,
          tagId,
          logId,
        },
      });
    } else {
      // Create a new entry if entryId is not provided
      await prisma.entry.create({
        data: {
          title,
          report,
          rating,
          tagId,
          logId,
        },
      });
    }

    const updatedLog = await prisma.log.findUnique({
      where: { id: logId },
      include: {
        entries: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!updatedLog) {
      return { errorMessage: "something went wrong" };
    }

    return {
      ...updatedLog,
      createdAt: new Date(updatedLog.createdAt).toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { updateStatus, createOrUpdateEntry };
