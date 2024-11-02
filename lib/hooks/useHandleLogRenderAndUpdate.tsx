import { useAppDispatch, useAppSelector } from "../hooks";
import { updateLog } from "../features/log/logSlice";
import { useEffect, useState } from "react";
import { getLogById } from "@/app/actions/log/read";
import { init } from "@paralleldrive/cuid2";

function useHandleLogRenderAndUpdate() {
  const log = useAppSelector((state) =>
    state.log.logs.find((log) => log.id === state.log.showLogId)
  );

  const selectedLog = useAppSelector((state) => state.log.selectedLog);

  const entryUpdating = useAppSelector((state) => state.log.entryUpdating);

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (log) {
      (async () => {
        try {
          setLoading(true);

          const res = await getLogById({ logId: log.id });

          if ("errorMessage" in res) return;
          dispatch(updateLog({ ...res }));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [log, dispatch]);

  useEffect(() => {
    if (selectedLog?.entries && selectedLog.entries.length <= 0) {
      const cuid = init({ length: 25 });

      const addEntry = {
        ...selectedLog,
        entries: [...(selectedLog.entries || [])],
      };

      addEntry.entries.push({ id: cuid(), logId: selectedLog.id, title: "" });

      dispatch(updateLog({ ...addEntry }));
    }
  }, [selectedLog, dispatch]);

  const addElement = () => {
    if (!selectedLog) return;

    const cuid = init({ length: 25 });

    const addEntry = {
      ...selectedLog,
      entries: [...(selectedLog.entries || [])],
    };

    addEntry.entries.push({ id: cuid(), logId: selectedLog.id, title: "" });

    dispatch(updateLog({ ...addEntry }));
  };

  return {
    loading,
    log: selectedLog,
    entryUpdating,
    addElement,
  };
}

export default useHandleLogRenderAndUpdate;
