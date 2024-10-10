"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusLabel from "./StatusLabel";
import { statusType } from "@/lib/types";
import useEditLog from "@/lib/hooks/useEditLog";

const StatusButton = ({
  dayStatus,
  logId,
}: {
  dayStatus: statusType;
  logId: string;
}) => {
  const { handleStatusChange } = useEditLog();

  return (
    <div>
      <Select onValueChange={(value) => handleStatusChange(value, logId)}>
        <SelectTrigger
          className="w-[140px] md:w-[180px] statusGradient font-semibold focus:ring-0 focus:ring-transparent h-8 px-2"
          icon={false}
        >
          <SelectValue placeholder={<StatusLabel dayStatus={dayStatus} />} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Great">
            <StatusLabel dayStatus={"Great"} />
          </SelectItem>
          <SelectItem value="Good">
            <StatusLabel dayStatus={"Good"} />
          </SelectItem>
          <SelectItem value="Average">
            <StatusLabel dayStatus={"Average"} />
          </SelectItem>
          <SelectItem value="Bad">
            <StatusLabel dayStatus={"Bad"} />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusButton;
