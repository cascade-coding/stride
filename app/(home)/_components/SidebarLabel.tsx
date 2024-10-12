import React from "react";

const SidebarLabel = ({ text }: { text: string }) => {
  return <p className="text-muted-foreground font-semibold text-sm">{text}</p>;
};

export default SidebarLabel;
