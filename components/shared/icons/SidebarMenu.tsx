import { cn } from "@/lib/utils";
import React from "react";

const SidebarMenu = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className={cn("w-6 h-6", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="Menu / Menu_Alt_02">
            {" "}
            <path
              id="Vector"
              d="M11 17H19M5 12H19M11 7H19"
              className={cn("stroke-muted-foreground", fillColor)}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
    </>
  );
};

export default SidebarMenu;
