import { io } from 'socket.io-client';
import { useEffect } from 'react';

interface StreamPageProps {
    params: {
        code: string;
    };
}

export default function StreamPage({ params: { code } }: StreamPageProps) {
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

            // Identify as a control socket
            socket.send('identify', 'control');
        });

        // Clean up
        return () => {
            console.log('Disconnecting from socket');
            socket.off('connect');
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Code Parameter</h1>
            <p>The code is: {code}</p>
        </div>
    );
}
