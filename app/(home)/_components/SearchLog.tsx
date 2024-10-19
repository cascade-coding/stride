import { Input } from "@/components/ui/input";
import React from "react";

const SearchLog = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search logs by day or content"
        className="rounded-sm h-10"
      />
    </div>
  );
};

export default SearchLog;
