import React from "react";
import TopHeader from "./TopHeader";
import TopActoins from "./TopActoins";
import SearchAndFilter from "./SearchAndFilter";
import PreviousLogs from "./PreviousLogs";

const SidebarContent = () => {
  return (
    <>
      <TopHeader />
      <div className="mt-8 px-2">
        <TopActoins />

        <div className="mt-6">
          <SearchAndFilter />
        </div>

        <div className="mt-4">
          <PreviousLogs />
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
