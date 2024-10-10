import { cn } from "@/lib/utils";
import React from "react";

const Logo = ({ className = "", fillColor = "" }) => {
  return (
    <>
      <svg
        className={cn("w-56 h-24", className)}
        viewBox="0 0 225 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M159.562 0H222.812L168.187 92H104.938L159.562 0Z"
          fill="#16A34A"
          className={cn("fill-green-600", fillColor)}
        />
        <path
          d="M102.062 0H148.062L93.4375 92H47.4375L102.062 0Z"
          className={cn("fill-lime-600", fillColor)}
        />
        <path
          d="M56.0626 0H90.5626L35.9376 92H1.43762L56.0626 0Z"
          className={cn("fill-amber-600", fillColor)}
        />
      </svg>
    </>
  );
};

export default Logo;
