import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSaveOrUpdateLogEntry from "@/lib/hooks/useSaveOrUpdateLogEntry";
import { LogEntry } from "@/lib/types";
import React from "react";

interface LogEntryCardProps {
  logId: string;
  entry?: null | LogEntry;
}

const LogEntryCard = ({ logId, entry = null }: LogEntryCardProps) => {
  const { handleInputChange, inputs, textareaRef } = useSaveOrUpdateLogEntry({
    logId,
    entry,
  });
  return (
    <>
      <Card className="rounded-none">
        <CardContent className="px-0 py-0">
          <div>
            <Input
              placeholder="Subject title"
              className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent border-b-border rounded-none h-12"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Textarea
              placeholder="How did you do?"
              className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent border-b-border rounded-none py-1 resize-none overflow-hidden max-h-48"
              data-radix-scroll-area-viewport
              name="report"
              value={inputs.report}
              onChange={handleInputChange}
              ref={textareaRef}
            />
          </div>
          <div className="flex">
            <Input
              placeholder="Tag Name"
              className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent rounded-none flex-1"
              name="tagName"
              value={inputs.tagName}
              onChange={handleInputChange}
            />

            <div className="flex-1">
              <Input
                placeholder="Rate out of 10"
                className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent rounded-none"
                type="number"
                name="rating"
                value={inputs.rating}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LogEntryCard;
