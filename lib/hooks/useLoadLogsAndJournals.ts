import { getOrCreateLog, previousLogs } from "@/app/actions/log/read";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addLogs,
  setLatestLog,
  updatePageEndedStatus,
  updatePageNumber,
  updateTotalPageNumber,
} from "../features/log/logSlice";
import { getDateTime } from "../services";

function useLoadLogsAndJournals() {
  const dispatch = useAppDispatch();

  const logPageNumber = useAppSelector((state) => state.log.pageNumber);
  const logPageEnded = useAppSelector((state) => state.log.pageEnded);

  const getLatestLog = async () => {
    const { today, now } = getDateTime();

    try {
      const log = await getOrCreateLog({ today, now });

      if ("errorMessage" in log) return null;

      dispatch(setLatestLog({ ...log, latest: true }));

      return { message: "data loaded" };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  const getPreviousLogs = async () => {
    if (logPageEnded === true) return;
    const { today } = getDateTime();

    console.log({ logPageNumber });

    dispatch(updatePageNumber());

    console.log({ logPageNumber });

    try {
      const logs = await previousLogs({ page: logPageNumber, today });

      if ("errorMessage" in logs) return null;

      dispatch(updateTotalPageNumber(logs.meta.totalPages));
      dispatch(addLogs(logs.logs));

      if (logs.meta.currentPage >= logs.meta.totalPages) {
        dispatch(updatePageEndedStatus(true));
      }

      return { message: "data loaded" };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  return { getLatestLog, getPreviousLogs };
}

export default useLoadLogsAndJournals;
