import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_HOST);

export default socket;

socket.on('connect', () => {
    console.log('Connected to socket server');
    // Identify as a control socket
    socket.send('identify', 'control');
});
