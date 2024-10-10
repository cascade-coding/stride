import { cn } from "@/lib/utils";
import React from "react";

const MenuDotsX = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        className={cn("w-5 h-5", className)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1667 9.99984C14.1667 9.07934 14.9129 8.33317 15.8333 8.33317C16.7538 8.33317 17.5 9.07934 17.5 9.99984C17.5 10.9203 16.7538 11.6665 15.8333 11.6665C14.9129 11.6665 14.1667 10.9203 14.1667 9.99984Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
        <path
          d="M8.33341 9.99984C8.33341 9.07934 9.07958 8.33317 10.0001 8.33317C10.9206 8.33317 11.6667 9.07934 11.6667 9.99984C11.6667 10.9203 10.9206 11.6665 10.0001 11.6665C9.07958 11.6665 8.33341 10.9203 8.33341 9.99984Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
        <path
          d="M2.49992 9.99984C2.49992 9.07934 3.24609 8.33317 4.16659 8.33317C5.08709 8.33317 5.83325 9.07934 5.83325 9.99984C5.83325 10.9203 5.08709 11.6665 4.16659 11.6665C3.24609 11.6665 2.49992 10.9203 2.49992 9.99984Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
      </svg>
    </>
  );
};

export default MenuDotsX;
