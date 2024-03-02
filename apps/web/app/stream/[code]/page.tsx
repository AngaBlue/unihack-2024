'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import EmojiButton from '@web/components/EmojiButton';
import { cn } from '@web/lib/utils';
import { FaSpinner } from 'react-icons/fa6';
import cursor from '@web/lib/cursor';

interface StreamPageProps {
    params: {
        code: string;
    };
}

type Vec3 = [number, number, number];
interface Frame {
    image: Buffer;
    location: Vec3;
    direction: Vec3;
}
const emojis = ['❗', '⬇️', '✋', '🔥'];

const socket = io(process.env.NEXT_PUBLIC_API_HOST);

socket.on('connect', () => {
    console.log('Connected to socket server');
});

export default function StreamPage({ params: { code } }: StreamPageProps) {
    const [loading, setLoading] = useState(true);
    const [currentEmoji, setCurrentEmoji] = useState('');
    const [frame, setFrame] = useState<Frame | null>(null);

    useEffect(() => {
        async function connect() {
            // Temp create code
            if (process.env.NODE_ENV === 'development') {
                socket.emit('identify', 'view');
                console.log('Identified as view');
            }

            const subscribed = await socket.emitWithAck('subscribe', code);
            if (!subscribed) {
                console.error('Failed to subscribe to stream');
                return;
            }
            console.log('Subscribed to stream');
            setLoading(false);
        }

        connect();

        socket.on('frame', (image: Buffer, location: Vec3, direction: Vec3) => {
            console.log('Received frame', image, location, direction);

            // Only update the frame if we don't have an emoji selected
            if (!currentEmoji) setFrame({ image, location, direction });
        });

        // Clean up
        return () => {
            if (process.env.NODE_ENV === 'development') return;
            console.log('Disconnecting from socket');
            socket.off('connect');
            socket.disconnect();
        };
    }, [code]);

    function clickEmoji(emoji: string) {
        setCurrentEmoji(emoji);
    }

    function onFrameClick(e: React.MouseEvent<HTMLImageElement>) {
        if (!currentEmoji || !frame) return;
        setCurrentEmoji('');

        // Calculate the percentage of the image the click was at
        const x = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
        const y = e.nativeEvent.offsetY / e.currentTarget.clientHeight;

        // Emit position
        socket.emit('click', { x, y, location: frame.location, direction: frame.direction, emoji: currentEmoji });
    }

    return (
        <div className='flex justify-center items-center p-6 gap-8'>
            <div className='flex flex-col gap-4'>
                <div
                    className='aspect-square w-[80vh] max-w-ful rounded-2xl relative overflow-hidden'
                    style={currentEmoji ? cursor(currentEmoji) : {}}
                >
                    {/* Loading background */}
                    <div className={cn('absolute top-0 left-0 w-full h-full bg-slate-200 flex justify-center items-center')}>
                        {loading && <FaSpinner className='w-16 h-16 text-primary animate-spin' />}
                    </div>
                    {/* Image */}
                    {frame && (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`data:image/jpg;base64,${frame?.image.toString('base64')}`}
                                alt='Stream'
                                onClick={onFrameClick}
                                className='h-full w-full'
                            />
                        </>
                    )}
                </div>
                <span className='text-lg'>
                    <strong>Stream Code:</strong> {code}
                </span>
            </div>
            <div className='flex space-between flex-col gap-4'>
                {emojis.map(emoji => (
                    <EmojiButton key={emoji} emoji={emoji} onClick={() => clickEmoji(emoji)} isActive={currentEmoji === emoji}>
                        {emoji}
                    </EmojiButton>
                ))}
            </div>
        </div>
    );
}
