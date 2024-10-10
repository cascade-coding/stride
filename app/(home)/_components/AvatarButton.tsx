"use client";

import { UserButton, SignedIn } from "@clerk/nextjs";
import React from "react";

const AvatarButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default AvatarButton;
