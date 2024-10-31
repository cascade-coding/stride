import React from "react"; // Import React and ReactNode
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateLog, setEntryUpdating } from "../features/log/logSlice";
import { useEffect, useState } from "react";
import { getLogById } from "@/app/actions/log/read";
import { v4 as uuidv4 } from "uuid";
import { Cross2Icon } from "@radix-ui/react-icons";
import LogEntryCard from "@/app/(home)/(edit)/_components/LogEntryCard";

function useHandleLogRenderAndUpdate() {
  const log = useAppSelector((state) =>
    state.log.logs.find((log) => log.id === state.log.showLogId)
  );

  const selectedLog = useAppSelector((state) => state.log.selectedLog);

  const entryUpdating = useAppSelector((state) => state.log.entryUpdating);

  const [elements, setElements] = useState<
    { id: string; content: JSX.Element }[]
  >([]);

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setElements([]);

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
    setElements([]);

    if (selectedLog && selectedLog.entries && selectedLog.entries.length <= 0) {
      const newId = uuidv4();

      setElements([
        {
          id: newId,
          content: (
            <div key={newId} className="relative">
              <div
                onClick={() => removeElement(newId)}
                className="right-0 top-0 absolute bg-muted p-1"
              >
                <Cross2Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <LogEntryCard logId={selectedLog.id} />
            </div>
          ),
        },
      ]);
    }
  }, [selectedLog]);

  useEffect(() => {
    if (elements.length >= 1) {
      dispatch(setEntryUpdating(true));
      return;
    } else {
      dispatch(setEntryUpdating(false));
    }
  }, [elements, dispatch]);

  const removeElement = (id: string) => {
    console.log({ id });
    // Filter out the element with the matching unique ID
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const addElement = () => {
    const newId = uuidv4();

    if (!log) return;

    setElements([
      ...elements,
      {
        id: newId,
        content: (
          <div key={newId} className="relative">
            <div
              onClick={() => removeElement(newId)}
              className="right-0 top-0 absolute bg-muted p-1"
            >
              <Cross2Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <LogEntryCard logId={log.id} />
          </div>
        ),
      },
    ]);
  };

  return {
    loading,
    log: selectedLog,
    elements,
    entryUpdating,
    removeElement,
    addElement,
  };
}

export default useHandleLogRenderAndUpdate;
