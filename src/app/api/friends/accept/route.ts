import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response('You are not logged in.', { status: 401 });
        }

        // verify both users are not already FriendReaquestsSidebarOption
        const isAlreadyFriends = (await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        )) as 0 | 1;

        if (isAlreadyFriends) {
            return new Response('You are already friends with this person.', {
                status: 400,
            });
        }

        const hasFriendRequest = (await fetchRedis(
            'sismember',
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        )) as 0 | 1;

        if (!hasFriendRequest) {
            return new Response('No friend request.', {
                status: 400,
            });
        }

        await db.sadd(`user:${session.user.id}:friends`, idToAdd);

        await db.sadd(`user:${idToAdd}:friends`, session.user.id);

        // await db.srem(`user:${idToAdd}:outbound_friend_requests`, session.user.id);

        await db.srem(
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );

        return new Response('ok', { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request peyload', { status: 422 });
        }

        return new Response('Invalid request', { status: 400 });
    }
}
