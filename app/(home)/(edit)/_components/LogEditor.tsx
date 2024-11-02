"use client";

import React from "react";
import LogInfo from "./LogInfo";
import StatusButton from "./StatusButton";
import { statusType } from "@/lib/types";
import LogEntryCard from "./LogEntryCard";
import { PlusSquare } from "lucide-react";
import useHandleLogRenderAndUpdate from "@/lib/hooks/useHandleLogRenderAndUpdate";
import LogNoteEditor from "./LogNoteEditor";
import Loading from "@/components/shared/Loading";
import { Cross2Icon } from "@radix-ui/react-icons";

const LogEditor = () => {
  const { loading, log, entryUpdating, addElement } =
    useHandleLogRenderAndUpdate();

  if (!log) return <></>;

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      <div>
        <div>
          <p className="text-muted-foreground text-xs lg:text-base font-semibold">
            <LogInfo date={log.createdAt} /> – Day {log.dayNumber}
          </p>
        </div>
        <div className="flex justify-between items-center pt-6">
          <p className="text-muted-foreground text-xs md:text-base font-semibold">
            Tracking subjects and disciplines
          </p>
          <StatusButton
            dayStatus={log.dayStatus as statusType}
            logId={log.id}
          />
        </div>

        <div className="mt-7 flex flex-col gap-y-4">
          {log.entries &&
            log.entries.map((entry) => (
              <div key={entry.id} className="relative">
                <div className="right-0 top-0 absolute bg-muted p-1">
                  <Cross2Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <LogEntryCard logId={log.id} entry={entry} />
              </div>
            ))}
        </div>
        <button
          onClick={addElement}
          className="w-full mt-3 disabled:opacity-30 focus-visible:ring-0 focus-visible:outline-none group"
          disabled={entryUpdating}
        >
          <PlusSquare className="text-primary mx-auto group-focus-visible:text-green-600" />
        </button>
      </div>
      <div className="flex-grow py-16">
        <LogNoteEditor logId={log.id} content={log.content} />
      </div>
    </>
  );
};

export default LogEditor;
