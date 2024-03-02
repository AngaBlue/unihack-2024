import { Socket } from 'socket.io';

export default class InstructARSession {
    // TODO: expand this to support and differentiate between multiple connections
    constructor(
        public established: Date,
        public viewer: Socket
    ) {}

    public frames: Buffer[][] = [];
}
