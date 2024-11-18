import React from "react";
import MenuDotsY from "@/components/shared/icons/MenuDotsY";
import { setShowJournalId } from "@/lib/features/log/journalSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getLastEditedTime } from "@/lib/services";
import { JournalInfoType } from "@/lib/types";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Star, Trash } from "lucide-react";

import Duplicate from "@/components/shared/icons/Duplicate";

const SidebarJournalCard = ({ journal }: { journal: JournalInfoType }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="px-2 cursor-pointer border-b border-border">
      <div className="flex items-center justify-between">
        <div
          className="py-2 flex-1"
          onClick={() => {
            dispatch(setShowJournalId(journal.id));
            router.push("/edit-journal");
          }}
        >
          <h4 className="text-base">
            {journal.title ? journal.title : "New Document"}
          </h4>

          <p className="text-xs text-muted-foreground font-semibold mt-1">
            Last Edited: {getLastEditedTime(journal.updatedAt)}
          </p>
        </div>

        <div className="px-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:border-transparent focus:outline-none focus:outline-transparent">
              <MenuDotsY />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex gap-x-3">
                  <Duplicate />
                  <span>Duplicate</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex gap-x-3">
                  <Star className="w-5 h-5" />
                  <span>Add to Favorite</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex gap-x-3">
                  <Trash className="w-5 h-5" />
                  <span>Move to trash</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex gap-x-3 !text-destructive">
                  <Trash className="w-5 h-5" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default SidebarJournalCard;
