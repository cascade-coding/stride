import React from "react";

import { format } from "date-fns";

const LogInfo = ({ date }: { date: string }) => {
  return <span>{format(new Date(date), "EEEE, MMMM d, yyyy")}</span>;
};

export default LogInfo;
