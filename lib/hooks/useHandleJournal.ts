import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";

import { getDateTime } from "../services";
import { useEffect, useState } from "react";
import { getOrCreateJournal } from "@/app/actions/journal/read";
import { setSelectedJournal } from "../features/log/journalSlice";

function useHandleJournal() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const showJournalId = useAppSelector((state) => state.journal.showJournalId);

  const selectedJournal = useAppSelector(
    (state) => state.journal.selectedJournal
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const loadJournal = async () => {
      if (!showJournalId) {
        router.push("/");
        return;
      }

      const { now } = getDateTime();

      try {
        const res = await getOrCreateJournal({ now, journalId: showJournalId });
        if (res && !("errorMessage" in res)) {
          dispatch(setSelectedJournal(res));
        }
        console.log("Journal data:", res);
      } catch (error) {
        console.error("Failed to get or create journal:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJournal();
  }, [showJournalId, router, dispatch]);

  return { loading, selectedJournal };
}

export default useHandleJournal;
