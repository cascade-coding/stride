import { setShowJournalId } from "@/lib/features/log/journalSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getLastEditedTime } from "@/lib/services";
import { JournalInfoType } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarJournalCard = ({ journal }: { journal: JournalInfoType }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div
      className="bg-muted mb-4 px-2 py-1 cursor-pointer"
      onClick={() => {
        dispatch(setShowJournalId(journal.id));
        router.push("/edit-journal");
      }}
    >
      <h4 className="font-semibold">
        {journal.title ? journal.title : "New Document"}
      </h4>
      <p className="text-xs text-muted-foreground font-semibold">
        Lasted Edited: {getLastEditedTime(journal.updatedAt)}
      </p>
    </div>
  );
};

export default SidebarJournalCard;
