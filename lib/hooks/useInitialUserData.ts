import { useCallback, useEffect, useRef } from "react";
import useLoadLogsAndJournals from "./useLoadLogsAndJournals";

function useInitialUserData() {
  const effectRan = useRef(false);
  const { getLatestLog } = useLoadLogsAndJournals();

  const loadData = useCallback(async () => {
    // Load the latest Log
    await getLatestLog();

    // Load previews logs
  }, [getLatestLog]);

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
