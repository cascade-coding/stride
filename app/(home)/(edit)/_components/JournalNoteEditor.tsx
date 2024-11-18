"use client";

import { JournalType } from "@/lib/types";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { undo, redo } from "prosemirror-history";
import { useEffect } from "react";

export default function JournalNoteEditor({
  content,
  inputs,
  handleJournalUpdate,
}: {
  content: string | null | undefined;
  inputs: JournalType;
  handleJournalUpdate: (data: JournalType) => void;
}) {
  function isValidJSON(str: string) {
    try {
      JSON.parse(str);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  }

  // Create the editor instance
  const editor = useCreateBlockNote();

  const handleUndo = () => {
    if (editor?.prosemirrorView) {
      undo(editor.prosemirrorView.state, editor.prosemirrorView.dispatch);
    }
  };

  const handleRedo = () => {
    if (editor?.prosemirrorView) {
      redo(editor.prosemirrorView.state, editor.prosemirrorView.dispatch);
    }
  };

  useEffect(() => {
    if (content && isValidJSON(content)) {
      editor.replaceBlocks(editor.document, JSON.parse(content));
    }
  }, [editor, content]);

  // Renders the editor instance using a React component.
  return (
    <>
      {/* <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button> */}

      <BlockNoteView
        editor={editor}
        onChange={() => {
          handleJournalUpdate({
            ...inputs,
            content: JSON.stringify(editor.document),
          });
        }}
      />
    </>
  );
}
