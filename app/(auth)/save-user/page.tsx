import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const saveUser = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  "use server";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("++++++++++++++++++++++++++++");
    console.log({ existingUser });
    console.log("++++++++++++++++++++++++++++");
    return { message: "User already exists!" };
  }

  const newUser = await prisma.user.create({
    data: {
      authId: userId,
      email,
    },
  });

  if (newUser) return { message: "New User has been created!" };
};

export default async function Page() {
  const user = await currentUser();

  if (user) {
    saveUser({ userId: user.id, email: user.emailAddresses[0].emailAddress });
    redirect("/");
  }

  if (!user) return <div>Not signed in</div>;
}
