import { useCallback, useEffect, useState } from "react";
import useAdjustTextareaHeight from "./useAdjustTextareaHeight";
import { LogEntry } from "../types";
import { debounce } from "lodash";
import { createNewTag, createOrUpdateEntry } from "@/app/actions/log/edit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addTags, setEntryUpdating, updateLog } from "../features/log/logSlice";

interface LogEntryCardProps {
  logId: string;
  entry?: LogEntry | null; // Entry can be null or LogEntry
}

function useSaveOrUpdateLogEntry({ logId, entry }: LogEntryCardProps) {
  const [inputs, setInputs] = useState({
    title: entry?.title || "",
    report: entry?.report || "",
    tagName: entry?.tag?.tagName || "",
    tagId: entry?.tag?.id || undefined,
    rating: entry?.rating || 0,
  });

  const [newTag, setNewTag] = useState("");
  const [newTagLoading, setNewTagLoading] = useState(false);

  const tags = useAppSelector((state) => state.log.tags);

  const dispatch = useAppDispatch();
  const { textareaRef, adjustHeight } = useAdjustTextareaHeight();

  const updateLogEntry = async ({
    title,
    report,
    rating,
    tagId,
  }: typeof inputs): Promise<void> => {
    try {
      const response = await createOrUpdateEntry({
        title,
        report,
        rating,
        logId,
        tagId,
        entryId: entry?.id,
      });

      if (!("errorMessage" in response)) {
        dispatch(updateLog({ ...response }));
      }
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
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs, adjustHeight]); // Only depend on inputs and adjustHeight

  const addNewTagOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const newTagName = newTag;

      setNewTag("");

      setNewTagLoading(true);

      const itemExists = tags.some(
        (item) => item.tagName.toLowerCase() === newTagName.toLowerCase()
      );

      if (newTagName.trim() === "" || itemExists) return;

      const res = await createNewTag({ tagName: newTagName });

      if (!("errorMessage" in res)) {
        dispatch(addTags([res]));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setNewTagLoading(false);
    }
  };

  return {
    inputs,
    textareaRef,
    handleInputChange,
    newTag,
    setNewTag,
    addNewTagOnSubmit,
    newTagLoading,
  };
}

export default useSaveOrUpdateLogEntry;
