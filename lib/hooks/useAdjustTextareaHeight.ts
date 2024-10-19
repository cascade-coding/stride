import { useRef } from "react";

function useAdjustTextareaHeight() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      // Reset height to auto to measure the scrollHeight correctly
      textareaRef.current.style.height = "auto";
      // Set the height based on the scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return { textareaRef, adjustHeight };
}

export default useAdjustTextareaHeight;
