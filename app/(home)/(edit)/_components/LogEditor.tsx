"use client";

// import useLoadStateData from "@/lib/hooks/useLoadStateData";
import React from "react";
import LogInfo from "./LogInfo";
import StatusButton from "./StatusButton";
import { statusType } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";

const LogEditor = () => {
  // const { latestLog: log } = useLoadStateData();
  const log = useAppSelector((state) =>
    state.log.logs.find((log) => log.latest === true)
  );

  if (!log) return <></>;

  return (
    <>
      <div>
        <p className="text-muted-foreground text-xs lg:text-base font-semibold">
          <LogInfo date={log.createdAt} /> – Day {log.dayNumber}
        </p>
        {}
      </div>
      <div className="flex justify-between items-center pt-6">
        <p className="text-muted-foreground text-xs md:text-base font-semibold">
          Tracking subjects and disciplines
        </p>
        <StatusButton dayStatus={log.dayStatus as statusType} logId={log.id} />
      </div>
    </>
  );
};

export default LogEditor;
