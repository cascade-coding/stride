import React from "react";
import TopHeader from "./TopHeader";
import TopActoins from "./TopActoins";
import SearchAndFilter from "./SearchAndFilter";
import PreviousLogs from "./PreviousLogs";
import { ScrollArea } from "@/components/ui/scroll-area";

const SidebarContent = () => {
  return (
    <ScrollArea className="h-dvh sidebar-content">
      <TopHeader />
      <div className="mt-8 px-2">
        <TopActoins />

        <div className="mt-6">
          <SearchAndFilter />
        </div>
      </div>

      <div className="mt-4 px-2">
      <PreviousLogs />
      </div>

      <div className="mt-4 max-h-[300px] overflow-y-auto">
        journals
        <PreviousLogs />
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
