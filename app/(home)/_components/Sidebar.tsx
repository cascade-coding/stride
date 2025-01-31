"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";
import SidebarMenu from "@/components/shared/icons/SidebarMenu";
import useInitialUserData from "@/lib/hooks/useInitialUserData";
import SidebarSkeleton from "./SidebarSkeleton";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  useInitialUserData();
  const logInitialLoading = useAppSelector((state) => state.log.initialLoading);

  const pathName = usePathname();

  return (
    <>
      {pathName !== "/" && (
        <Sheet>
          <SheetTrigger className="lg:hidden text-left pl-4 pt-2 w-fit" asChild>
            <button>
              <SidebarMenu />
            </button>
          </SheetTrigger>
          <SheetTitle hidden></SheetTitle>
          <SheetDescription hidden>The side bar</SheetDescription>
          <SheetContent side={"left"} className="px-0 pt-0">
            {logInitialLoading ? <SidebarSkeleton /> : <SidebarContent />}
          </SheetContent>
        </Sheet>
      )}

      <div
        className={cn(
          "border-r-0 md:border-r w-full lg:w-80 lg:block h-dvh",
          pathName !== "/" && "hidden"
        )}
      >
        {logInitialLoading ? <SidebarSkeleton /> : <SidebarContent />}
      </div>
    </>
  );
};

export default Sidebar;
