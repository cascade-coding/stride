"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { isCuid } from "@paralleldrive/cuid2";

/*
 
! craete a new journal or get by id

*/
async function getOrCreateJournal({
  now,
  journalId,
}: {
  journalId: string;
  now: string;
}) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "Unauthorized" };

    const authId = authUser.id;

    const dateTime = new Date(`${now}Z`);

    const user = await prisma.user.findFirst({
      where: {
        authId,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

    const { id: userId } = user;

    let journal;

    if (journalId && isCuid(journalId)) {
      journal = await prisma.journal.findUnique({
        where: { id: journalId },
      });

      if (!journal) {
        journal = await prisma.journal.create({
          data: {
            id: journalId,
            userId,
            createdAt: dateTime,
            updatedAt: dateTime,
          },
        });
      }
    }
    if (!journal) return { errorMessage: "something went wrong" };

    return {
      ...journal,
      createdAt: journal.createdAt.toISOString(),
      updatedAt: journal.updatedAt.toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    return { errorMessage: "something went wrong" };
  }
}

/*
 
! fetch all the previous journals for an user

*/
async function previousJournals({
  page = 1,
  limit = 2,
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

    const journals = await prisma.journal.findMany({
      select: {
        id: true,
        title: true,
        updatedAt: true,
        createdAt: true,
        favorite: true,
        favoritedAt: true,
        trashedAt: true,
      },
      skip: skip,
      take: take,
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalJournals = await prisma.journal.count({
      where: {
        userId,
      },
    }); // count total logs for pagination metadata

    const serializedJournals = journals.map((journal) => ({
      ...journal,
      createdAt: journal.createdAt.toISOString(),
      updatedAt: journal.updatedAt.toISOString(),
    }));

    return {
      journals: serializedJournals,
      meta: {
        totalJournals,
        currentPage: page,
        totalPages: Math.ceil(totalJournals / limit),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { getOrCreateJournal, previousJournals };
