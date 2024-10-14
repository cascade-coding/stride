import React from "react";
import LogEditor from "../_components/LogEditor";

const LatestLog = async () => {
  return (
    <div className="flex-1 max-w-4xl lg:px-10 pt-4 lg:pt-8 px-4">
      <div className="">
        <LogEditor />
      </div>
    </div>
  );
};

export default LatestLog;
