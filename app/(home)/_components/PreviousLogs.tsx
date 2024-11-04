import React from "react";
import SidebarLogCard from "./SidebarLogCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";
import { selectPreviousLogs } from "@/lib/selectors";
import { cn } from "@/lib/utils";
import useLoadMoreLogs from "@/lib/hooks/useLoadMoreLogs";

const PreviousLogs = () => {
  const logs = useAppSelector(selectPreviousLogs);

  const { ref: inViewRef, loading } = useLoadMoreLogs();

  return (
    <div>
      <ScrollArea
        className={cn(
          "h-[120px]",
          logs.length === 1 && "h-[80px]",
          logs.length >= 3 && "h-[200px]"
        )}
      >
        {logs.map((log) => (
          <SidebarLogCard key={log.id} log={log} />
        ))}

        {loading && <p>loading...</p>}

        <div className="-mt-3 h-2 bg-transparent" ref={inViewRef} />
      </ScrollArea>
    </div>
  );
};

export default PreviousLogs;
