import { useCallback, useEffect, useState } from "react";
import useAdjustTextareaHeight from "./useAdjustTextareaHeight";
import { LogEntry } from "../types";
import { debounce } from "lodash";
import {
  createNewTag,
  createOrUpdateEntry,
  deleteEntryById,
  updateLogNoteContent,
} from "@/app/actions/log/edit";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addTags,
  removeEntry,
  setEntryUpdating,
  updateEntry,
} from "../features/log/logSlice";

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

      if (response && !("errorMessage" in response)) {
        dispatch(updateEntry({ ...response }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setEntryUpdating(false));
    }
  };

  const updateLogNote = async ({
    content,
  }: {
    content: string;
  }): Promise<void> => {
    try {
      const response = await updateLogNoteContent({ content, logId });

      if (!("errorMessage" in response)) {
        console.log("content updated");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateLogEntryDebounce = useCallback(
    debounce(updateLogEntry, 1000),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateLogNoteDebounce = useCallback(debounce(updateLogNote, 1000), []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedInputs = { ...inputs, [name]: value };

    setInputs(updatedInputs);

    dispatch(setEntryUpdating(true));

    updateLogEntryDebounce({ ...updatedInputs });
  };

  const handleNoteContentChange = (content: string) => {
    updateLogNoteDebounce({ content });
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs, adjustHeight]); // Only depend on inputs and adjustHeight

  const addNewTagOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

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

  const handleDeleteEntry = async (entryId: string) => {
    console.log(entryId);

    dispatch(removeEntry(entryId));

    deleteEntryById(entryId).then(() => console.log("entry deleted"));
  };

  return {
    inputs,
    textareaRef,
    handleInputChange,
    newTag,
    setNewTag,
    addNewTagOnSubmit,
    newTagLoading,
    handleNoteContentChange,
    handleDeleteEntry,
  };
}

export default useSaveOrUpdateLogEntry;
