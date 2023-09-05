'use client';

import { FC, useEffect, useState } from 'react';
import { addFriendValidator } from '@/lib/validations/addFriend';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    });

    if (!mounted) return <>Loading...</>;

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email });

            await axios.post('/api/friends/add', {
                email: validatedEmail,
            });

            setShowSuccessState(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError('email', { message: error.message });
                return;
            }

            if (error instanceof AxiosError) {
                setError('email', { message: error.response?.data });
                // setError('email', { message: error.message });
                return;
            }
            setError('email', { message: 'Something went wrong' });
        }
    };

    const onSubmit = (data: FormData) => {
        addFriend(data.email);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Add friend by E-Mail
            </label>

            <div className="mt-2 flex ">
                <input
                    className="mr-4 block w-full rounded-md py-1.5 text-gray-900 shadow-md ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                />
                <Button>Add</Button>
            </div>
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
            {showSuccessState ? (
                <p className="mt-1 text-sm text-green-600">
                    Friend request sent!
                </p>
            ) : null}
        </form>
    );
};

export default AddFriendButton;
