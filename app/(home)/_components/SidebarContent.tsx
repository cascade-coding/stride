import React from "react";
import TopHeader from "./TopHeader";
import TopActoins from "./TopActoins";
import SearchLog from "./SearchLog";
import PreviousLogs from "./PreviousLogs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SidebarLabel from "./SidebarLabel";
import PreviousJournals from "./PreviousJournals";

const SidebarContent = () => {
  return (
    <ScrollArea className="h-dvh">
      <TopHeader />
      <div className="mt-8 px-2">
        <TopActoins />

        <div className="mt-6">
          <SearchLog />
        </div>
      </div>

      <div className="mt-4 px-2">
        <Accordion type="multiple" defaultValue={["journals"]}>
          <AccordionItem value="logs" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <SidebarLabel text="Logs" />
            </AccordionTrigger>
            <AccordionContent>
              <PreviousLogs />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="journals" className="border-none">
            <AccordionTrigger className="hover:no-underline">
              <SidebarLabel text="Journals" />
            </AccordionTrigger>
            <AccordionContent>
              <PreviousJournals />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default SidebarContent;
