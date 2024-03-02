// Backend for UniHack24 (Team: Synapps)
// This backend establishes socket connections and forwards traffic for the application

import express, { 
    Express, Request, Response
} from 'express';

import { Server } from "socket.io";

// Import schemas
import { ClientToServerEvents, ServerToClientEvents, SocketData } from "./communication/schemas"

// Import routers
import { controllerRouter } from "./routes/control"

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const server = require('http').createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>();

app.use("/control", controllerRouter);

// Default (use this as server up check perhaps)
app.get("/", (req: Request, res: Response) => {
    res.send("Synapps Backend");
});

app.listen(port, () => {
    console.log(`[server]: Server is at http://localhost:${port}`);
});