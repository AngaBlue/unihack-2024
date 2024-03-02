'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import EmojiButton from '@web/components/EmojiButton';
import { cn } from '@web/lib/utils';

interface StreamPageProps {
    params: {
        code: string;
    };
}

const emojis = ['❗', '⬇️', '✋'];

export default function StreamPage({ params: { code } }: StreamPageProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Connecting to socket');

        const socket = io(process.env.NEXT_PUBLIC_API_HOST, {
            extraHeaders: {
                // Send the code as a bearer token
                Authorization: `Bearer ${code}`
            }
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
            setLoading(false);

            // Identify as a control socket
            socket.send('identify', 'control');
        });

        // Clean up
        return () => {
            console.log('Disconnecting from socket');
            socket.off('connect');
            socket.disconnect();
        };
    }, [code]);

    return (
        <div className='flex justify-center items-center p-6 gap-8'>
            <div>
                <div className='aspect-square w-[80vh] max-w-ful rounded-2xl relative overflow-hidden'>
                    {/* Loading background */}
                    <div className={cn('absolute top-0 left-0 w-full h-full bg-slate-200', loading && 'animate-pulse')} />
                </div>
                <span className='text-lg'>
                    <strong>Stream Code:</strong> {code}
                </span>
            </div>
            <div className='flex space-between flex-col gap-4'>
                {emojis.map(emoji => (
                    <EmojiButton key={emoji} emoji={emoji}>
                        {emoji}
                    </EmojiButton>
                ))}
            </div>
        </div>
    );
}
