import { logoutAccount } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const handleLogOut = async () => {
    "use server";
    const loggedOut = await logoutAccount();

    console.log({ loggedOut });

    if (loggedOut) redirect("/signup");
  };
  return (
    <div>
      <form action={handleLogOut}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default LogoutButton;
