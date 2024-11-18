import { setShowLogId } from "@/lib/features/log/logSlice";
import { useAppDispatch } from "@/lib/hooks";
import { LogInfoType } from "@/lib/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarLogCard = ({ log }: { log: LogInfoType }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div
      className="bg-gradient-to-r from-green-950 to-stone-900 border-2 border-green-800 mb-4 px-2 py-1 cursor-pointer"
      onClick={() => {
        dispatch(setShowLogId(log.id));
        router.push("/edit-log");
      }}
    >
      <h4 className="font-semibold">Day {log?.dayNumber}</h4>
      <p className="text-xs text-muted-foreground font-semibold">
        {format(log.createdAt, "EEE, MMM d, yyyy")}
      </p>
    </div>
  );
};

export default SidebarLogCard;
