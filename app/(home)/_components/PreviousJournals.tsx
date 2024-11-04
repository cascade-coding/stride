import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";
import { selectPreviousJournals } from "@/lib/selectors";
import { cn } from "@/lib/utils";
import useLoadMoreJournals from "@/lib/hooks/useLoadMoreJournals";
import SidebarJournalCard from "./SidebarJournalCard";

const PreviousJournals = () => {
  const journals = useAppSelector(selectPreviousJournals);

  const inViewRef = useLoadMoreJournals();

  return (
    <div>
      <ScrollArea
        className={cn(
          "h-[120px]",
          journals.length === 1 && "h-[80px]",
          journals.length >= 3 && "h-[240px]"
        )}
      >
        {journals.map((journal) => (
          <div key={journal.id + Date.now()}>
            <SidebarJournalCard journal={journal} />
          </div>
        ))}

        <div className="-mt-3 h-2 bg-transparent" ref={inViewRef} />
      </ScrollArea>
    </div>
  );
};

export default PreviousJournals;
