import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { Message, messageValidator } from '@/lib/validations/messages';
import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

export async function POST(req: Request) {
    try {
        console.log('I am in ...');
        const { text, chatId } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response('You are not logged in.', { status: 401 });
        }

        const [userId1, userId2] = chatId.split('--');

        if (session.user.id !== userId1 && session.user.id !== userId2) {
            return new Response(
                'You are not authorized to send messages here.',
                {
                    status: 401,
                }
            );
        }

        const friendId = session.user.id === userId1 ? userId2 : userId1;

        const friendList: string[] = await fetchRedis(
            'smembers',
            `user:${session.user.id}:friends`
        );

        const isFriend = friendList.includes(friendId);

        if (!isFriend) {
            return new Response('You are not friends with this person.', {
                status: 401,
            });
        }

        const rawSender: string = await fetchRedis(
            'get',
            `user:${session.user.id}`
        );
        const sender = JSON.parse(rawSender);

        const timeStamp = Date.now();

        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            receiverId: friendId,
            text,
            timestamp: timeStamp,
        };

        const message = messageValidator.parse(messageData);

        // notify all connected chat room clients
        pusherServer.trigger(
            toPusherKey(`chat:${chatId}`),
            'incoming-message',
            message
        );

        // all valid, send the message
        await db.zadd(`chat:${chatId}:messages`, {
            score: timeStamp,
            member: JSON.stringify(message),
        });

        return new Response('OK');
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response('Unknown error', { status: 500 });
    }
}
