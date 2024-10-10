import { getOrCreateLog } from "@/app/actions/log/log";
import { useAppDispatch } from "../hooks";
import { setLatestLog } from "../features/log/logSlice";

function useLoadLogsAndJournals() {
  const dispatch = useAppDispatch();
  const getLatestLog = async () => {
    try {
      const log = await getOrCreateLog();

      if ("errorMessage" in log) return null;

      dispatch(setLatestLog({ ...log, latest: true }));

      return { message: "data loaded" };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  return { getLatestLog };
}

export default useLoadLogsAndJournals;
