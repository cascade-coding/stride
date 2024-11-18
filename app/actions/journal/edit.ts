"use server";

import prisma from "@/lib/db";
import { JournalType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

async function updateJournalById(
  id: string,
  data: Partial<Omit<JournalType, "id" | "userId" | "createdAt" | "updatedAt">>
) {
  try {
    const authUser = await currentUser();

    if (!authUser) return { errorMessage: "something went wrong" };

    const user = await prisma.user.findFirst({
      where: {
        authId: authUser.id,
      },
    });

    if (!user) return { errorMessage: "something went wrong" };

    const updatedJournal = await prisma.journal.update({
      where: { id },
      data: {
        coverPhotoUrl: data.coverPhotoUrl,
        title: data.title,
        content: data.content,
        favorite: data.favorite,
        favoritedAt: data.favoritedAt,
        trashedAt: data.trashedAt,
      },
    });

    return {
      ...updatedJournal,
      createdAt: updatedJournal.createdAt.toISOString(),
      updatedAt: updatedJournal.updatedAt.toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { errorMessage: "something went wrong" };
  }
}

export { updateJournalById };
