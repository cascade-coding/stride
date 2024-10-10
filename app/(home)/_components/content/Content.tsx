"use client";
import React from "react";
import EmptyContent from "./EmptyContent";
import { useAppSelector } from "@/lib/hooks";
import { selectContent } from "@/lib/features/content/contentSlice";
import CurrentLog from "./CurrentLog";
import Journal from "./Journal";
import { cn } from "@/lib/utils";

const Content = () => {
  const contentType = useAppSelector(selectContent).value;
  return (
    <div
      // className={cn("hidden md:block flex-1", contentType !== null && "block")}
    >
      {contentType === "Empty" && <EmptyContent />}
      {contentType === "Current_Log" && <CurrentLog />}
      {contentType === "Journal" && <Journal />}
    </div>
  );
};

export default Content;
