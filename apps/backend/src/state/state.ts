// Keep track of all current connections

import { Socket } from "socket.io";

export class InstructarSession {
    // TODO: expand this to support and differentiate between multiple connections
    constructor(public established: Date, public viewer: Socket){}

    public frames: Buffer[][] = [];
    
}

export class InstructarState {
    public sessions: Map<string, InstructarSession> = new Map<string, InstructarSession>();
}

export let globalState: InstructarState;