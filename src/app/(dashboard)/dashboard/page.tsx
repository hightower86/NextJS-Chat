import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

interface pageProps {}

const page = async ({}) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-28 h-screen flex flex-col items-center justify-center gap-2">
            DAHSBOARD
            <hr />
            <Link href="/dashboard/add">
                <Button variant="outline" size="sm">
                    Button
                </Button>
            </Link>
            <hr />
            <pre>{JSON.stringify(session, null, 4)}</pre>
        </div>
    );
};

export default page;
