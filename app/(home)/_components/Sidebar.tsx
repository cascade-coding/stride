"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";
import SidebarMenu from "@/components/shared/icons/SidebarMenu";
import useInitialUserData from "@/lib/hooks/useInitialUserData";

const Sidebar = ({ sheet = true }: { sheet?: boolean }) => {
  useInitialUserData();

  return (
    <>
      {sheet && (
        <Sheet>
          <SheetTrigger className="lg:hidden text-left pl-4 pt-2 w-fit" asChild>
            <button>
              <SidebarMenu />
            </button>
          </SheetTrigger>
          <SheetContent side={"left"} className="px-0 pt-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      )}
      <div
        className={cn(
          "border-r-0 md:border-r w-full lg:w-80 lg:block",
          sheet !== false && "hidden"
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
