import { statusType } from "@/lib/types";
import { TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

const StatusLabel = ({ dayStatus }: { dayStatus: statusType }) => {
  return (
    <>
      <div className="flex items-center justify-between w-[120px]">
        <span>{dayStatus} day </span>
        {dayStatus === "Great" && (
          <TrendingUp className="w-4 h-4 text-green-600" />
        )}
        {dayStatus === "Good" && (
          <TrendingUp className="w-4 h-4 text-lime-600" />
        )}
        {dayStatus === "Average" && (
          <TrendingDown className="w-4 h-4 text-pink-600" />
        )}
        {dayStatus === "Bad" && (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
      </div>
    </>
  );
};

export default StatusLabel;
