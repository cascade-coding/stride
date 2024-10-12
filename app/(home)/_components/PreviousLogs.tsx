import React from "react";
import SidebarLabel from "./SidebarLabel";
import SidebarLogCard from "./SidebarLogCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";

const PreviousLogs = () => {
  const logs = useAppSelector((state) =>
    state.log.logs.filter((log) => log.latest !== true)
  );
  return (
    <div>
      <div>
        <SidebarLabel text="Logs" />
      </div>

      <ScrollArea className="mt-3 h-[300px]">
        {logs.map((log) => (
          <SidebarLogCard key={log.id} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default PreviousLogs;
