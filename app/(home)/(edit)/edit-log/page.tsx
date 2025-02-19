import LogEditor from "../_components/LogEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

const LatestLog = async () => {
  return (
    <ScrollArea className="flex-1 lg:px-10 pt-4 lg:pt-8 px-4 h-dvh">
      <div className="max-w-4xl mx-auto min-h-full flex flex-col">
        <LogEditor />
      </div>
    </ScrollArea>
  );
};

export default LatestLog;
