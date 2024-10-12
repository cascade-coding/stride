import SortByTime from "@/components/shared/icons/SortByTime";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import useLoadLogsAndJournals from "@/lib/hooks/useLoadLogsAndJournals";

const SearchAndFilter = () => {
  const { getPreviousLogs } = useLoadLogsAndJournals();

  return (
    <div>
      <div
        className="flex items-center gap-x-2 bg-card p-1 rounded-sm"
        onClick={async () => {
          await getPreviousLogs();
        }}
      >
        <Input
          type="text"
          placeholder="Search logs by day or content"
          className="rounded-sm h-10"
        />

        <div className="h-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-input h-10 block px-2 rounded-sm focus:outline-0">
              <SortByTime />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" sideOffset={8}>
              <DropdownMenuItem>
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="pl-2">Last 7 days</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="pl-2">Last 30 days</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="pl-2">All time</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
