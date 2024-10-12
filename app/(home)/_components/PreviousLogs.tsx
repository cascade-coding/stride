import React from "react";
import SidebarLabel from "./SidebarLabel";
import useLoadStateData from "@/lib/hooks/useLoadStateData";

const PreviousLogs = () => {
  const { previousLogs: logs } = useLoadStateData();
  return (
    <div>
      <div>
        <SidebarLabel text="Logs" />
      </div>

      <div>
        {logs.map((log) => (
          <>
            <h4>{log.dayNumber}</h4>
          </>
        ))}
      </div>
    </div>
  );
};

export default PreviousLogs;
