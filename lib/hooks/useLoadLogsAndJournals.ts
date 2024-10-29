import {
  getAllTags,
  getOrCreateLog,
  previousLogs,
} from "@/app/actions/log/read";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addLogs,
  addTags,
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
      console.log(error);
      return null;
    }
  };

  const getPreviousLogs = async () => {
    if (logPageEnded === true) return;
    const { today } = getDateTime();

    dispatch(updatePageNumber());

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

  const getTags = async () => {
    try {
      const tags = await getAllTags();

      if ("errorMessage" in tags) return null;

      dispatch(addTags(tags));

      console.log(tags, "qqqqqqqqqqqqqqqq");

      return { message: "data loaded" };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getLatestLog, getPreviousLogs, getTags };
}

export default useLoadLogsAndJournals;
