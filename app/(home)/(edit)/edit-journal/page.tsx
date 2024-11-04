import React from "react";
import JournalEditor from "../_components/JournalEditor";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Journal = () => {
  return (
    <ScrollArea className="flex-1 lg:px-10 pt-4 lg:pt-8 px-4 h-dvh">
      <div className="max-w-4xl mx-auto min-h-full flex flex-col">
        <JournalEditor />
      </div>
    </ScrollArea>
  );
};

export default Journal;
