"use client";

import useSaveOrUpdateLogEntry from "@/lib/hooks/useSaveOrUpdateLogEntry";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

export default function LogNoteEditor({
  logId,
  content,
}: {
  logId: string;
  content: string | null | undefined;
}) {
  const { handleNoteContentChange } = useSaveOrUpdateLogEntry({ logId });

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
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
          level: 3,
        },
        content: [
          {
            type: "text",
            text: "New discoveries, understanding, experiences",
            styles: {},
          },
        ],
        children: [],
      },
    ],
  });

  useEffect(() => {
    if (content && isValidJSON(content)) {
      editor.replaceBlocks(editor.document, JSON.parse(content));
    }
  }, [editor, content]);

  return (
    <>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          handleNoteContentChange(JSON.stringify(editor.document));
        }}
      />
    </>
  );
}
