"use client";

import React from "react";
import MainCta from "./MainCta";
import NoteFavorite from "@/components/shared/icons/NoteFavorite";
import NoteJournal from "@/components/shared/icons/NoteJournal";
import LineChart from "@/components/shared/icons/LineChart";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setShowLogId } from "@/lib/features/log/logSlice";

const TopActoins = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const log = useAppSelector((state) =>
    state.log.logs.find((log) => log.latest === true)
  );

  if (!log) return <></>;

  return (
    <div>
      <div className="flex md:flex-col gap-x-2 mb-2 md:gap-y-2 justify-between">
        <MainCta
          text="Edit Today’s log"
          Icon={<NoteFavorite className="w-14 h-14 md:w-12 md:h-12" />}
          className="flex-col py-4 md:flex-row md:py-1.5"
          onClick={() => {
            dispatch(setShowLogId(log.id));
            router.push(`/edit-log`);
          }}
        />
        <MainCta
          text="New Journal"
          Icon={<NoteJournal className="w-14 h-14 md:w-12 md:h-12" />}
          className="flex-col py-4 md:flex-row md:py-1.5"
          onClick={() => router.push(`/journal`)}
        />
      </div>
      <MainCta
        text="View Progress"
        Icon={<LineChart />}
        className="justify-center gap-x-4 md:justify-between md:gap-x-0"
      />
    </div>
  );
};

export default TopActoins;
