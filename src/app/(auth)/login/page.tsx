'use client';

import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import GoogleIcon from '@/assets/icons/google.svg';
import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Icons } from '@/components/Icons';

const Page: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn('google');
        } catch (error) {
            // display error message to user
            toast.error('Something went wrong with your login.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col items-center justify-center max-w-md space-y-8 border px-4 py-8 rounded-lg shadow-slate-400 shadow-lg">
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex gap-2">
                            <Icons.Logo className="h-8 w-auto text-indigo-600" />
                            <span className="text-2xl font-bold text-indigo-800">
                                RAPID CHAT
                            </span>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <Button
                        type="button"
                        className="max-w-sm mx-auto w-full"
                        onClick={loginWithGoogle}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <GoogleIcon className="mr-2 h-4 w-4" />
                        )}
                        Google
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Page;
