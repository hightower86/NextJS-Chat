'use client';

import { FC, useRef, useState } from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import Button from './ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ChatInputProps {
    chatPartner: User;
    chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [input, setinput] = useState('');

    const sendMessage = async () => {
        if (!input) return;
        setIsLoading(true);
        try {
            await axios.post('/api/message/send', { text: input, chatId });
            setinput('');
            textAreaRef.current?.focus();
        } catch {
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <TextAreaAutosize
                    ref={textAreaRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(elsee) => setinput(elsee.target.value)}
                    placeholder={`Message ${chatPartner.name}`}
                    className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                <div
                    onClick={() => textAreaRef.current?.focus()}
                    className="py-2"
                    aria-hidden="true"
                >
                    <div className="py-px">
                        <div className="h-9" />
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                    <div className="flex-shrink-0">
                        <Button
                            isLoading={isLoading}
                            onClick={sendMessage}
                            type="submit"
                            className=" bg-gray-500 hover:bg-indigo-700"
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
