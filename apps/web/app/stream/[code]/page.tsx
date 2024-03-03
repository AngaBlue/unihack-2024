'use client';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import EmojiButton from '@web/components/EmojiButton';
import { arrayBufferToBase64, cn } from '@web/lib/utils';
import { FaSpinner } from 'react-icons/fa6';
import cursor from '@web/lib/cursor';

interface StreamPageProps {
    params: {
        code: string;
    };
}

type Vec3 = [number, number, number];
interface Frame {
    image: string;
    position: Vec3;
    direction: Vec3;
}
const emojis = ['⬇️', '✋', '⚠️', '🔧'];

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
                // In development, identify as a view to generate a steam code
                socket.emit('identify', 'view');
                console.log('Identified as view');
            }

            // Subscribe to stream
            const subscribed = await socket.emitWithAck('subscribe', code);
            if (!subscribed) return console.error('Failed to subscribe to stream: ', code);
            console.log('Subscribed to stream', code);
            setLoading(false);
        }

        connect();

        // Clean up
        return () => {
            if (process.env.NODE_ENV === 'development') return;
            console.log('Disconnecting from socket');
            socket.off('connect');
            socket.disconnect();
        };
    }, [code]);

    useEffect(() => {
        socket.on('frame', async (image: Buffer, location: Vec3, direction: Vec3) => {
            // Only update the frame if we don't have an emoji selected
            if (currentEmoji) return;
            setFrame({ image: await arrayBufferToBase64(image), position: location, direction });
        });

        return () => {
            socket.off('frame');
        };
    }, [currentEmoji]);

    function onFrameClick(e: React.MouseEvent<HTMLImageElement>) {
        if (!currentEmoji || !frame) return;
        setCurrentEmoji('');

        // Calculate the percentage of the image the click was at
        const x = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
        const y = e.nativeEvent.offsetY / e.currentTarget.clientHeight;

        // Emit position
        socket.emit('click', { x, y, position: frame.position, direction: frame.direction, emoji: currentEmoji });
    }

    return (
        <div className='flex justify-center items-center p-6 gap-8 max-w-full overflow-hidden'>
            <div className='flex flex-col gap-4 max-w-full overflow-hidden min-w-0'>
                <div
                    className='aspect-square w-[80vh] max-w-[80vw] rounded-2xl relative overflow-hidden'
                    style={currentEmoji ? cursor(currentEmoji) : {}}
                >
                    {/* Image */}
                    {frame && (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`data:image/jpeg;base64,${frame?.image}`}
                                alt='Stream'
                                onClick={onFrameClick}
                                className='h-full w-full z-10'
                            />
                        </>
                    )}
                    {/* Loading background */}
                    {!frame && (
                        <div className={cn('absolute top-0 left-0 w-full h-full bg-slate-200 flex justify-center items-center')}>
                            {loading && <FaSpinner className='w-16 h-16 text-primary animate-spin' />}
                        </div>
                    )}
                </div>
                <span className='text-lg'>
                    <strong>Stream Code:</strong> {code}
                </span>
            </div>
            <div className='flex space-between flex-col gap-4'>
                {emojis.map(emoji => (
                    <EmojiButton key={emoji} emoji={emoji} onClick={() => setCurrentEmoji(emoji)} isActive={currentEmoji === emoji}>
                        {emoji}
                    </EmojiButton>
                ))}
            </div>
        </div>
    );
}
