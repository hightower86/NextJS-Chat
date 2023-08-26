import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z, set } from 'zod';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response('You are not logged in.', { status: 401 });
        }

        const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

        await db.srem(
            `user:${session.user.id}:incoming_friend_requests`,
            idToDeny
        );

        return new Response('ok', { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request peyload', { status: 422 });
        }
        return new Response('Invalid request', { status: 400 });
    }
}
