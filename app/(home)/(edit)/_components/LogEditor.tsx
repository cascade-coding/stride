"use client";

import React, { useEffect, useState } from "react";
import LogInfo from "./LogInfo";
import StatusButton from "./StatusButton";
import { statusType } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LogEntryCard from "./LogEntryCard";
import { v4 as uuidv4 } from "uuid";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PlusSquare } from "lucide-react";
import { getLogById } from "@/app/actions/log/read";
import { updateLog } from "@/lib/features/log/logSlice";

const LogEditor = () => {
  const log = useAppSelector((state) =>
    state.log.logs.find((log) => log.id === state.log.showLogId)
  );

  const entryUpdating = useAppSelector((state) => state.log.entryUpdating);

  const [elements, setElements] = useState<
    { id: string; content: JSX.Element }[]
  >([]);

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setElements([]);

    if (log?.latest) {
      setLoading(false);
    }

    if (log && !log.userId) {
      setLoading(true);
      (async () => {
        try {
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

    if (log && log.entries && log.entries.length < 1) {
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
              <LogEntryCard logId={log.id} />
            </div>
          ),
        },
      ]);
    }
  }, [log, dispatch]);

  if (!log) return <></>;

  const addElement = () => {
    const newId = uuidv4();
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

  const removeElement = (id: string) => {
    console.log({ id });
    // Filter out the element with the matching unique ID
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  if (loading) return <>loading...</>;

  return (
    <>
      <div>
        <p className="text-muted-foreground text-xs lg:text-base font-semibold">
          <LogInfo date={log.createdAt} /> – Day {log.dayNumber}
        </p>
      </div>
      <div className="flex justify-between items-center pt-6">
        <p className="text-muted-foreground text-xs md:text-base font-semibold">
          Tracking subjects and disciplines
        </p>
        <StatusButton dayStatus={log.dayStatus as statusType} logId={log.id} />
      </div>

      <div className="mt-7 flex flex-col gap-y-4">
        {log.entries &&
          log.entries.map((entry) => (
            <div key={entry.id}>
              <LogEntryCard logId={log.id} entry={entry} />
            </div>
          ))}

        {elements.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
      <button
        onClick={addElement}
        className="w-full mt-3 disabled:opacity-30 focus-visible:ring-0 focus-visible:outline-none group"
        disabled={entryUpdating}
      >
        <PlusSquare className="text-primary mx-auto group-focus-visible:text-green-600" />
      </button>
    </>
  );
};

export default LogEditor;
