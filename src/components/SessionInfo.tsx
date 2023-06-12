"use client";

import { authOptions } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { FC } from "react";

interface SessionInfoProps {}

const SessionInfo: FC<SessionInfoProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  );
};

export default SessionInfo;
