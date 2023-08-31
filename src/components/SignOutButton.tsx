'use client';

import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Loader2, LogOut } from 'lucide-react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
    const [isSignOut, setIsSignOut] = useState<boolean>(false);
    return (
        <Button
            {...props}
            variant={'ghost'}
            onClick={async () => {
                try {
                    await signOut({ callbackUrl: '/' });
                } catch (error) {
                    toast.error('Problem with signing out');
                } finally {
                    setIsSignOut(false);
                }
            }}
        >
            {isSignOut ? (
                <Loader2 className="animate-spin h-4 w-4" />
            ) : (
                <LogOut className="h-4 w-4" />
            )}
        </Button>
    );
};

export default SignOutButton;
