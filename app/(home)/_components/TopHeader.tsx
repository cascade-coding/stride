import React from "react";
import AvatarButton from "./AvatarButton";
import MenuDotsY from "@/components/shared/icons/MenuDotsY";

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <AvatarButton />
      <div>
        <MenuDotsY />
      </div>
    </div>
  );
};

export default TopHeader;
