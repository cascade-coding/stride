"use client";
import NoteFavorite from "@/components/shared/icons/NoteFavorite";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface MainCtaProps {
  className?: string;
  text?: string;
  Icon?: React.ReactNode;
  onClick?: () => void;
}

const MainCta = ({
  className = "",
  text = "Card label",
  Icon = <NoteFavorite />,
  onClick,
}: MainCtaProps) => {
  return (
    <>
      <Card
        className="rounded-none flex border-0 cursor-pointer flex-1"
        onClick={onClick}
      >
        <CardContent
          className={cn(
            "h-full w-full flex items-center px-4 py-1.5 justify-between",
            className
          )}
        >
          <span className="font-semibold text-base text-primary">{text}</span>
          {Icon}
        </CardContent>
      </Card>
    </>
  );
};

export default MainCta;
