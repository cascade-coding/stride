import { useCallback, useEffect, useRef } from "react";
import useLoadLogs from "./useLoadLogs";
import { useAppDispatch } from "../hooks";
import { setInitialLoading } from "../features/log/logSlice";
import useLoadJournals from "./useLoadJournals";

function useInitialUserData() {
  const effectRan = useRef(false);
  const { getLatestLog, getPreviousLogs, getTags } = useLoadLogs();
  const { getPreviousJournals } = useLoadJournals();

  const dispatch = useAppDispatch();

  const loadData = useCallback(async () => {
    try {
      // Load all the tags
      await getTags();

      // Load the latest Log
      await getLatestLog();

      // Load previews logs
      await getPreviousLogs();

      // Load previews journals
      await getPreviousJournals();
    } catch (error) {
      console.error("Error loading logs and journals:", error);
    } finally {
      dispatch(setInitialLoading(false));
    }
  }, [getLatestLog, getPreviousLogs, getPreviousJournals, getTags, dispatch]);

  useEffect(() => {
    if (effectRan.current === false) {
      loadData();
    }

    return () => {
      effectRan.current = true;
    };
  }, [loadData]);
}

export default useInitialUserData;
