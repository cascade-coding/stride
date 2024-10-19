import { useCallback, useEffect, useState } from "react";
import useAdjustTextareaHeight from "./useAdjustTextareaHeight";
import { LogEntry } from "../types";
import { debounce } from "lodash";
import { createOrUpdateEntry } from "@/app/actions/log/edit";
import { useAppDispatch } from "../hooks";
import { setEntryUpdating, updateLog } from "../features/log/logSlice";

interface LogEntryCardProps {
  logId: string;
  entry?: LogEntry | null; // Entry can be null or LogEntry
}

function useSaveOrUpdateLogEntry({ logId, entry }: LogEntryCardProps) {
  const [inputs, setInputs] = useState({
    title: entry?.title || "",
    report: entry?.report || "",
    tagName: entry?.tag?.tagName || "",
    rating: entry?.rating || 0,
  });

  const dispatch = useAppDispatch();
  const { textareaRef, adjustHeight } = useAdjustTextareaHeight();

  const updateLogEntry = async ({
    title,
    report,
    rating,
  }: typeof inputs): Promise<void> => {
    try {
      const response = await createOrUpdateEntry({
        title,
        report,
        rating,
        logId,
        entryId: entry?.id,
      });

      console.log("**********************");
      console.log("params  ", title);
      console.log("API response data:", response);

      if (!("errorMessage" in response)) {
        dispatch(updateLog({ ...response }));
      }

      console.log("**********************");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setEntryUpdating(false));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFun = useCallback(debounce(updateLogEntry, 1000), []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedInputs = { ...inputs, [name]: value };

    setInputs(updatedInputs);

    dispatch(setEntryUpdating(true));

    debouncedFun({ ...updatedInputs });

    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
    console.log({ value });
    console.log({ ...inputs });
    console.log("Updated state:", updatedInputs);
    console.log("xxxxxxxxxxxxxxxxxxxxxxx");
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs, adjustHeight]); // Only depend on inputs and adjustHeight

  return { inputs, textareaRef, handleInputChange };
}

export default useSaveOrUpdateLogEntry;
