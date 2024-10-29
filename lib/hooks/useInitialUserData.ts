import { useCallback, useEffect, useRef } from "react";
import useLoadLogsAndJournals from "./useLoadLogsAndJournals";
import { useAppDispatch } from "../hooks";
import { setInitialLoading } from "../features/log/logSlice";

function useInitialUserData() {
  const effectRan = useRef(false);
  const { getLatestLog, getPreviousLogs, getTags } = useLoadLogsAndJournals();

  const dispatch = useAppDispatch();

  const loadData = useCallback(async () => {
    try {
      // Load all the tags
      await getTags();

      // Load the latest Log
      await getLatestLog();

      // Load previews logs
      await getPreviousLogs();
    } catch (error) {
      console.error("Error loading logs and journals:", error);
    } finally {
      dispatch(setInitialLoading(false));
    }
  }, [getLatestLog, getPreviousLogs, getTags, dispatch]);

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
