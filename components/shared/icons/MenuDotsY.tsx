import { cn } from "@/lib/utils";
import React from "react";

const MenuDotsY = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        className={cn("w-5 h-5", className)}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99996 5.83333C9.07946 5.83333 8.33329 5.08714 8.33329 4.16667C8.33329 3.24619 9.07946 2.5 9.99996 2.5C10.9205 2.5 11.6666 3.24619 11.6666 4.16667C11.6666 5.08714 10.9205 5.83333 9.99996 5.83333Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
        <path
          d="M9.99996 11.6666C9.07946 11.6666 8.33329 10.9204 8.33329 9.99992C8.33329 9.07942 9.07946 8.33325 9.99996 8.33325C10.9205 8.33325 11.6666 9.07942 11.6666 9.99992C11.6666 10.9204 10.9205 11.6666 9.99996 11.6666Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
        <path
          d="M9.99996 17.5001C9.07946 17.5001 8.33329 16.7539 8.33329 15.8334C8.33329 14.9129 9.07946 14.1667 9.99996 14.1667C10.9205 14.1667 11.6666 14.9129 11.6666 15.8334C11.6666 16.7539 10.9205 17.5001 9.99996 17.5001Z"
          className={cn("fill-muted-foreground", fillColor)}
        />
      </svg>
    </>
  );
};

export default MenuDotsY;
