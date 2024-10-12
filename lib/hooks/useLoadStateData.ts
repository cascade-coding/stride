import { useAppSelector } from "../hooks";

function useLoadStateData() {
  const latestLog = useAppSelector((state) =>
    state.log.logs.find((log) => log.latest === true)
  );

  const previousLogs = useAppSelector((state) =>
    state.log.logs.filter((log) => log.latest !== true)
  );

  const logPageNumber = useAppSelector((state) => state.log.pageNumber);

  const logTotalPageNumber = useAppSelector(
    (state) => state.log.totalPageNumber
  );

  const logPageEnded = useAppSelector((state) => state.log.pageEnded);

  const logInitialLoading = useAppSelector((state) => state.log.initialLoading);

  return {
    latestLog,
    logPageNumber,
    logTotalPageNumber,
    logPageEnded,
    previousLogs,
    logInitialLoading,
  };
}

export default useLoadStateData;
