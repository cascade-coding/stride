"use client";
import Loading from "@/components/shared/Loading";
import useHandleJournal from "@/lib/hooks/useHandleJournal";
import React from "react";
import JournalNoteEditor from "./JournalNoteEditor";
import JournalTopSection from "./JournalTopSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const JournalEditor = () => {
  const {
    loading,
    selectedJournal: journal,
    inputs,
    setInputs,
    handleJournalUpdate,
  } = useHandleJournal();

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (!journal) return <p>Something went wrong, please refersh the page.</p>;

  return (
    <div className="">
      <JournalTopSection />
      <Textarea
        className="border-transparent focus-visible:ring-0 focus-visible:ring-transparent font-bold text-3xl px-0 text-muted-foreground h-max"
        placeholder="New Document"
        value={inputs.title ? inputs.title : ""}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, title: e.target.value }));
          handleJournalUpdate({ ...inputs, title: e.target.value });
        }}
      ></Textarea>
      <JournalNoteEditor
        content={journal.content}
        inputs={inputs}
        handleJournalUpdate={handleJournalUpdate}
      />
    </div>
  );
};

export default JournalEditor;
