import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './io/schemas';
import streams from './state/streams';

// Load environment variables
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

const server = require('http').createServer(app, {
    cors: {
        origin: '*',
        credentials: false
    }
});

// Health check
app.get('/', (_req, res) => {
    res.send('OK');
});

/**
 * Socket.io events
 */
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, { cors: { origin: '*' } });

io.on('connect', socket => {
    console.log('Client connected:', socket.id);

    /**
     * Create a new stream. This is the first step in the process.
     */
    socket.on('getStreamCode', callback => {
        const code = streams.create();
        console.log('Created session with code', code);

        // Add the socket to the room to receive click events
        socket.join(`${code}-headset`);
        callback(code);
    });

    /**
     * Subscribe to a stream.
     */
    socket.on('subscribe', (token, callback) => {
        const session = streams.get(token);
        if (session === null) {
            callback(false);
        } else {
            socket.join(token);
            callback(true);
        }
    });

    /**
     * New frame from the capture device.
     */
    socket.on('newFrame', (code, frame, position, direction) => {
        const session = streams.get(code);
        if (!session) {
            // Can't do any thing. Return
            console.log("Frame was received but the session code wasn't valid.");
        } else {
            // Send to the corresponding room
            io.to(code).emit('frame', frame, position, direction);
        }
    });

    /**
     * Issue an indicator to the view.
     */
    socket.on('click', (code, event) => {
        const session = streams.get(code);
        if (!session) return console.error("Click event was received but the session code wasn't valid.");
        console.log('Received click event:', event);
        socket.to(`${code}-headset`).emit('displayIndicator', event);
    });

    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Listen
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
