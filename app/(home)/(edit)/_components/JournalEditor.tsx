"use client";
import Loading from "@/components/shared/Loading";
import useHandleJournal from "@/lib/hooks/useHandleJournal";
import React from "react";

const JournalEditor = () => {
  const { loading, selectedJournal } = useHandleJournal();

  if (!selectedJournal) return <></>;

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div>
      <div>JournalEditor</div>
      <div>{selectedJournal.createdAt}</div>
      <div>{selectedJournal.id}</div>
    </div>
  );
};

export default JournalEditor;
