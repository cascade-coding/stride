import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSaveOrUpdateLogEntry from "@/lib/hooks/useSaveOrUpdateLogEntry";
import { LogEntry } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";
import { MoveRight, Pen, TrendingDown, TrendingUp } from "lucide-react";
import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";

interface LogEntryCardProps {
  logId: string;
  entry: LogEntry;
}

const LogEntryCard = ({ logId, entry }: LogEntryCardProps) => {
  const {
    handleInputChange,
    inputs,
    textareaRef,
    newTag,
    setNewTag,
    addNewTagOnSubmit,
    newTagLoading,
    handleDeleteEntry,
    removeTag,
  } = useSaveOrUpdateLogEntry({
    logId,
    entry,
  });

  const tags = useAppSelector((state) => state.log.tags);

  return (
    <div className="relative">
      <div
        className="right-0 top-0 absolute bg-muted p-1 cursor-pointer"
        onClick={() => handleDeleteEntry(entry.id)}
      >
        <Cross2Icon className="h-4 w-4 text-muted-foreground" />
      </div>
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
            <div className="flex-1 relative">
              <Select
                defaultValue={entry?.tag ? entry.tag.id : undefined}
                autoComplete="off"
                onValueChange={(value) => {
                  const event = {
                    target: {
                      name: "tagId",
                      value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>;

                  handleInputChange(event);
                }}
                name="tagName"
              >
                <SelectTrigger
                  className="w-full border-none rounded-none focus:ring-0 focus:ring-transparent"
                  icon={false}
                >
                  <SelectValue placeholder="Choose a tag name" />
                </SelectTrigger>
                <SelectContent>
                  <div>
                    <form onSubmit={addNewTagOnSubmit} autoComplete="off">
                      <Input
                        placeholder={
                          newTagLoading ? "Adding Tag Name..." : "Add Tag Name"
                        }
                        className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent border-b-border rounded-none flex-1 px-2 bg-transparent"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        disabled={newTagLoading}
                      />
                    </form>
                  </div>

                  <SelectItem
                    value="un"
                    className="hover:!bg-transparent focus:bg-transparent"
                  >
                    uns
                  </SelectItem>

                  {tags.length >= 1 ? (
                    tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex hover:bg-accent rounded-sm focus-within:bg-accent"
                      >
                        <SelectItem
                          value={tag.id}
                          className="hover:!bg-transparent focus:bg-transparent"
                        >
                          {tag.tagName}
                        </SelectItem>
                        <div className="flex gap-x-1 w-16">
                          <button className="flex-1 flex items-center justify-center">
                            <Pen className="w-3.5 h-3.5 my-auto hover:!text-amber-600 cursor-pointer" />
                          </button>
                          <button
                            className="flex-1 flex items-center justify-center"
                            onClick={async () => {
                              await removeTag({
                                tagId: tag.id,
                                entry:
                                  entry.tag && entry.tag.id === tag.id
                                    ? entry
                                    : null,
                              });
                            }}
                          >
                            <Cross1Icon className="w-3.5 h-3.5 my-auto hover:!text-red-600 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground text-center py-4 font-bold">
                        Add some tag names
                      </p>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 flex items-center">
              <Input
                placeholder="Rate out of 10"
                className="focus-visible:ring-0 focus-visible:ring-transparent border-transparent rounded-none w-32"
                type="number"
                name="rating"
                value={inputs.rating}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 10 || value <= 0) return;
                  handleInputChange(e);
                }}
              />
              <div className="flex-1">
                {inputs.rating >= 7 && (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                )}
                {inputs.rating >= 5 && inputs.rating <= 6 && (
                  <MoveRight className="w-4 h-4 text-amber-600" />
                )}
                {inputs.rating < 5 && (
                  <TrendingDown className="w-4 h-4 text-rose-600" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogEntryCard;
