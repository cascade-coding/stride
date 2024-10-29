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
  tagName?: string;
}

async function createOrUpdateEntry(input: UpsertEntryInput) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

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
    if (entryId) {
      await prisma.entry.update({
        where: { id: entryId },
        data: { title, report, rating, tagId },
      });
    } else {
      // Create a new entry if entryId is not provided
      await prisma.entry.create({
        data: { title, report, rating, tagId, logId },
      });
    }

    const updatedLog = await prisma.log.findUnique({
      where: { id: logId },
      include: {
        entries: { include: { tag: true } },
      },
    });

    if (!updatedLog) {
      return { errorMessage: "Log not found" };
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

/*

! create new tags

*/

interface NewTagInput {
  tagName: string;
}

async function createNewTag(input: NewTagInput) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    const { tagName } = input;

    if (!user || !tagName) return { errorMessage: "something went wrong" };

    const newTag = await prisma.tag.create({
      data: { tagName, userId: user.id },
    });

    return newTag;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { updateStatus, createOrUpdateEntry, createNewTag };
