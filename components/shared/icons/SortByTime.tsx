import { cn } from "@/lib/utils";
import React from "react";

const SortByTime = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        className={cn("w-8 h-8", className)}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M13.3341 9.33325H2.66748"
          className={cn("stroke-muted-foreground", fillColor)}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          opacity="0.5"
          d="M10.6675 16H2.66748"
          className={cn("stroke-muted-foreground", fillColor)}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          opacity="0.5"
          d="M13.3341 22.667H2.66748"
          className={cn("stroke-muted-foreground", fillColor)}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22.6673 22.6666C26.3492 22.6666 29.3339 19.6818 29.3339 15.9999C29.3339 12.318 26.3492 9.33325 22.6673 9.33325C18.9854 9.33325 16.0006 12.318 16.0006 15.9999C16.0006 19.6818 18.9854 22.6666 22.6673 22.6666Z"
          className={cn("stroke-muted-foreground", fillColor)}
          strokeWidth="2"
        />
        <path
          d="M22.6675 13.3333V15.7949L24.0008 17.3333"
          className={cn("stroke-muted-foreground", fillColor)}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default SortByTime;
