import React from "react";
import TopHeader from "./TopHeader";
import TopActoins from "./TopActoins";

const SidebarContent = () => {
  return (
    <>
      <TopHeader />
      <div className="mt-8 px-2">
        <TopActoins />
      </div>
    </>
  );
};

export default SidebarContent;
