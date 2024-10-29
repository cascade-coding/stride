"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";

interface TagSuggestionProps {
  tags: string[];
}

const TagSuggestion: React.FC<TagSuggestionProps> = ({ tags }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(tags);
  const [show, setShow] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    console.log(suggestions, "xxx");

    if (value) {
      // Filter tags based on input and sort them so matches are at the top
      const matchingTags = tags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      );

      // Concatenate matching tags at the top with the rest at the bottom
      const nonMatchingTags = tags.filter(
        (tag) => !tag.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions([...matchingTags, ...nonMatchingTags]);
    } else {
      setSuggestions(tags); // Show all tags when input is cleared
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Type a tag..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShow(true)}
        onBlur={() => {
          setTimeout(() => {
            setShow(false);
          }, 1000);
        }}
        className="input"
      />

      {/* Show suggestions in a popover */}
      <div>
        {show && (
          <>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item bg-red-950 mb-1"
                onClick={() => {
                  console.log(suggestion, "xxxxxx");
                  setInputValue(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TagSuggestion;
