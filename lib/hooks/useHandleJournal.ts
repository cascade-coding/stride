import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getDateTime } from "../services";
import { useCallback, useEffect, useState } from "react";
import { getOrCreateJournal } from "@/app/actions/journal/read";
import {
  setSelectedJournal,
  updateJournal,
} from "../features/log/journalSlice";
import { JournalType } from "../types";
import { debounce } from "lodash";
import { updateJournalById } from "@/app/actions/journal/edit";

function useHandleJournal() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const showJournalId = useAppSelector((state) => state.journal.showJournalId);

  const selectedJournal = useAppSelector(
    (state) => state.journal.selectedJournal
  );

  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState<JournalType>({
    id: "",
    coverPhotoUrl: null,
    title: null,
    content: null,
    favorite: false,
    favoritedAt: null,
    trashedAt: null,
    userId: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    console.log(showJournalId, " xxxxx");

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

  useEffect(() => {
    if (selectedJournal && !loading) {
      setInputs({
        id: selectedJournal.id,
        coverPhotoUrl: selectedJournal.coverPhotoUrl ?? null,
        title: selectedJournal.title ?? null,
        content: selectedJournal.content ?? null,
        favorite: selectedJournal.favorite,
        favoritedAt: selectedJournal.favoritedAt ?? null,
        trashedAt: selectedJournal.trashedAt ?? null,
        userId: selectedJournal.userId,
        createdAt: selectedJournal.createdAt,
        updatedAt: selectedJournal.updatedAt,
      });
    }
  }, [selectedJournal, loading]);

  const updateLogEntry = async (data: JournalType): Promise<void> => {
    try {
      const response = await updateJournalById(data.id, data);

      if (response && !("errorMessage" in response)) {
        // dispatch(setSelectedJournal({ ...response, content: null }));
        dispatch(
          updateJournal({
            id: response.id,
            title: response.title,
            updatedAt: response.updatedAt,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // dispatch(setEntryUpdating(false));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateJournalDebounce = useCallback(debounce(updateLogEntry, 1000), []);

  const handleJournalUpdate = (data: JournalType) => {
    updateJournalDebounce({ ...data });
  };

  return { loading, selectedJournal, handleJournalUpdate, inputs, setInputs };
}

export default useHandleJournal;
