import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="p-1 flex flex-col h-full">
      <Skeleton className="w-full h-[40px] rounded-none" />
      <Skeleton className="w-full h-[120px] rounded-none mt-5" />
      <Skeleton className="w-full h-full rounded-none mt-5" />
    </div>
  );
};

export default SidebarSkeleton;
