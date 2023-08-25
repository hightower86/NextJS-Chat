import { Icon, Icons } from '@/components/Icons';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

interface SidebarOption {
    id: string | number;
    name: string;
    href: string;
    Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add friend',
        href: '/dashboard/add',
        Icon: 'UserPlus',
    },
    {
        id: 1,
        name: 'Remove friend',
        href: '/dashboard/remove',
        Icon: 'UserPlus',
    },
];

const Layout: FC<LayoutProps> = async ({ children }) => {
    const session = await getServerSession(authOptions);

    if (!session) notFound();

    return (
        <div className="w-full flex h-screen">
            <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <Link
                    href="/dashboard"
                    className="flex h-16 shrink-0 items-center"
                >
                    <Icons.Logo className="h-8 w-auto text-indigo-600" />
                </Link>

                <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your chats
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="fle flex-1 flex-col gap-y-7">
                        <li> chats that this user has</li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>

                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                    const Icon = Icons[option.Icon];
                                    return (
                                        <li key={option.id}>
                                            <Link
                                                href={option.href}
                                                // className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
                                                className="text-gray-400 hover:text-indigo-600 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                            >
                                                <span className="border border-gray-200 h-6 w-6  group-hover:border-indigo-600 group-hover:text-indigo-600 flex items-center justify-center shrink-0 rounded-lg text-[0.625rem] font-medium bg-white">
                                                    <Icon className="h-4 w-4" />
                                                </span>
                                                <span className="truncate  text-gray-500  group-hover:border-indigo-600 group-hover:text-indigo-600">
                                                    {option.name}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </div>
    );
};

export default Layout;
