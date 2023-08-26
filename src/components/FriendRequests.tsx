'use client';

import { Check, UserPlus, X } from 'lucide-react';
import { FC, useState } from 'react';

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[];
    sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
    incomingFriendRequests,
    sessionId,
}) => {
    const [friendRequests, setFriendRequests] = useState<
        IncomingFriendRequest[]
    >(incomingFriendRequests);

    return (
        <>
            {friendRequests.length === 0 && (
                <p className="text-sm text-zinc-500">No friend requests</p>
            )}

            {friendRequests.length > 0 &&
                friendRequests.map((friendRequest) => (
                    <div
                        key={friendRequest.senderId}
                        className="flex justify-between gap-4"
                    >
                        <UserPlus className="h-6 w-6 text-black" />
                        <p className="font-medium text-lg">
                            {friendRequest.senderEmail}
                        </p>
                        <button
                            aria-label="accept friend"
                            className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
                        >
                            <Check className="font-semibold text-white w-3/4 h-3/4" />
                        </button>
                        <button
                            aria-label="deny friend"
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
                        >
                            <X className="font-semibold text-white w-3/4 h-3/4" />
                        </button>
                    </div>
                ))}
        </>
    );
};

export default FriendRequests;
