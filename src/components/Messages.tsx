'use client';

import { cn } from '@/lib/utils';
import { Message } from '@/lib/validations/messages';
import { FC, useRef, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

interface MessagesProps {
    initialMessages: Message[];
    sessionId: string;
    sessionImg: string;
    chatPartner: User;
}

const Messages: FC<MessagesProps> = ({
    initialMessages,
    sessionId,
    sessionImg,
    chatPartner,
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const scrolldownRef = useRef<HTMLDivElement | null>(null);

    const formatTimeStamp = (timestamp: number) => {
        return format(timestamp, 'HH:mm');
    };
    return (
        <div className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <div ref={scrolldownRef} />
            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId;

                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;
                return (
                    <div
                        className="chat-message"
                        key={`${message.id}-${message.timestamp}`}
                    >
                        <div
                            className={cn('flex items-end', {
                                'justify-end': isCurrentUser,
                            })}
                        >
                            <div
                                className={cn(
                                    'flex flex-col space-y-2 text-base max-w-xs mx2',
                                    {
                                        'order-1 items-end': isCurrentUser,
                                        'order-2 items-start': !isCurrentUser,
                                    }
                                )}
                            >
                                <span
                                    className={cn(
                                        'px-4 py-2 rounded-lg inline-block',
                                        {
                                            'bg-indigo-600 text-white':
                                                isCurrentUser,
                                            'bg-gray-200 text-gray-900':
                                                !isCurrentUser,
                                            'rounded-br-none':
                                                hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            'rounded-bl-none':
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                >
                                    {message.text}{' '}
                                    <span className="ml-2 text-xs text-gray-400">
                                        {formatTimeStamp(message.timestamp)}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn('relative w-6 h-6', {
                                    'order-2 ml-2': isCurrentUser,
                                    'order-1 mr-2': !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}
                            >
                                <Image
                                    className="rounded-full"
                                    fill
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : (chatPartner.image as string)
                                    }
                                    alt="profile picture"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
