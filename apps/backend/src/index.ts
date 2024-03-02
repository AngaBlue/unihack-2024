// Backend for UniHack24 (Team: Synapps)
// This backend establishes socket connections and forwards traffic for the application

import express, { Express, Request, Response } from 'express';

import { Server } from 'socket.io';

// Import schemas
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./sockets/schemas"

// Import routers
import { controllerRouter } from "./routes/control"

import dotenv from "dotenv";
import { InstructarSession, globalState } from './state/state';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const server = require('http').createServer(app, {
    cors: {
        origin: '*',
        credentials: false
    }
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server);

app.use('/control', controllerRouter);

// Default (use this as server up check perhaps)
app.get('/', (req: Request, res: Response) => {
    res.send('Synapps Backend');
});

// ===============
// SocketIO Handlers


io.on("connect", (socket) => {
    console.log("Connected!");

    socket.on("identify", (type) => {
        socket.data.identity = type;
        switch(type){
            case 'capture':
                console.log("Capture client connected.");

                break;

            case 'view':
                console.log("View client connected.")
                let token: string = globalState.createSession(socket);

                // Send the token back
                socket.emit("viewerGetSessionToken", token);

                break;
            default:
                throw new Error(`Identification not supported for type '${type}'`);
        }
    });

    socket.on("newFrame", (token: string, frameId: number, framePayload: Buffer, compressed: boolean) => {
        if (socket.data.identity != 'capture') throw new Error(`Received new frame from identity '${socket.data.identity}' - must be 'capture' identity`)
        
        let session: InstructarSession | null = globalState.retrieveSession(token);
        if (session === null) {
            // Can't do any thing. Return
            console.log("Warning! New frame was given but the session token wasn't valid")
            return;
        } else {
            if (!compressed) {
                // Do some compression to the payload
            }
            
            // Write the newest frame
            session.frame = [frameId, framePayload];

        }

        

        
        

    });

    socket.on("disconnect", ()=>console.log("Disconnect"));
});




// ===============

server.listen(port, () => {
    console.log(`[server]: Server is at http://localhost:${port}`);
});
