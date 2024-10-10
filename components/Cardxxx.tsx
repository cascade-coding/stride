"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import a package for generating unique IDs

function Card() {
  // Each element will have a unique ID and JSX element
  const [elements, setElements] = useState<
    { id: string; content: JSX.Element }[]
  >([]);

  const addElement = () => {
    const newId = uuidv4(); // Generate a unique ID
    setElements([
      ...elements,
      {
        id: newId,
        content: (
          <div key={newId}>
            New Element
            <button onClick={() => removeElement(newId)}> {newId} --- X</button>
          </div>
        ),
      },
    ]);
  };

  const removeElement = (id: string) => {
    console.log({ id });
    // Filter out the element with the matching unique ID
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <div>
      <button onClick={addElement}>Add Element</button>
      <div>
        {elements.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}

export default Card;
