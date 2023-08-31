import  Button  from '@/components/ui/Button';
import { db } from '@/lib/db';

export default async function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Button variant="ghost">Hello</Button>
        </div>
    );
}
