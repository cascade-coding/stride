"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { isCuid } from "@paralleldrive/cuid2";

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

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) {
      return { errorMessage: "User does not exist." };
    }

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

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) {
      return { errorMessage: "User does not exist." };
    }

    const {
      logId,
      entryId,
      title,
      report,
      rating: newRating = 0,
      tagId,
    } = input;

    const rating = +newRating;

    let newEntry;

    // Check if entryId is provided for updating
    if (entryId && isCuid(entryId)) {
      newEntry = await prisma.entry.upsert({
        where: { id: entryId },
        update: { title, report, rating, tagId },
        create: {
          id: entryId,
          title,
          report,
          rating,
          tagId,
          logId,
        },
        include: { tag: true },
      });
    } else {
      newEntry = await prisma.entry.create({
        data: {
          title,
          report,
          rating,
          tagId,
          logId,
        },
        include: { tag: true },
      });
    }

    if (!newEntry) {
      return { errorMessage: "Entry not found" };
    }

    return newEntry;
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

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

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

/*

! delete tags

*/

interface TagInput {
  tagId: string;
}

async function deleteTag(input: TagInput) {
  try {
    const authUser = await currentUser();

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    const { tagId } = input;

    if (!user || !tagId) return { errorMessage: "something went wrong" };

    const tag = await prisma.tag.findFirst({
      where: {
        id: tagId,
        userId: user.id,
      },
    });

    if (!tag) {
      return {
        errorMessage: "Tag not found or unAuthorized request.",
      };
    }

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return { message: "Tag deleted successfully!" };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

/*

! update log note content

*/

interface UpdateLogNoteInput {
  logId: string;
  content?: string;
}

async function updateLogNoteContent(input: UpdateLogNoteInput) {
  try {
    const authUser = await currentUser();

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) {
      return { errorMessage: "User does not exist." };
    }

    const { logId, content } = input;

    const updatedLog = await prisma.log.update({
      where: { id: logId },
      data: { content },
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

! delete log entry by id

*/

async function deleteEntryById(entryid: string) {
  try {
    const authUser = await currentUser();

    if (!authUser) {
      return { errorMessage: "Authentication failed. User not found." };
    }

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) {
      return { errorMessage: "User does not exist." };
    }

    await prisma.entry.delete({
      where: {
        id: entryid,
      },
    });

    return { message: "entry deleted" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export {
  updateStatus,
  createOrUpdateEntry,
  createNewTag,
  updateLogNoteContent,
  deleteEntryById,
  deleteTag,
};
