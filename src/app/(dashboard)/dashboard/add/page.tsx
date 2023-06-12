import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

interface pageProps {}

const page: FC = () => {
  return (
    <main className="pt-8">
      <h1 className="font-bold text text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
