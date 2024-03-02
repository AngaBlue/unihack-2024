// Keep track of all current connections

import { Socket } from "socket.io";


interface NextGenerator {
    get next(): string;
}

class IDGenerator implements NextGenerator {
    constructor(private prefix: string, private current: number = 1){}

    public get next(): string {
        return this.prefix + this.current.toString();
    }
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

function generateRandomString(length: number): string {
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

class CodeGenerator implements NextGenerator {
    constructor(private length: number = 5){}

    public get next(): string {
        return generateRandomString(this.length);
    }
}


export class InstructarSession {
    // TODO: expand this to support and differentiate between multiple connections
    constructor(public established: Date, public viewer: Socket){}

    public genSessionToken: NextGenerator = new CodeGenerator(5);

}

export class InstructarState {
    private sessions: Map<string, InstructarSession> = new Map<string, InstructarSession>();

    public retrieveSession(sessionToken: string): InstructarSession | null {
        let v = this.sessions.get(sessionToken);
        if (v === undefined) return null;
        return v;
    }

    public createSession(viewerSocket: Socket): string {
        // Create new session
        let session = new InstructarSession(new Date(), viewerSocket);
        let token: string | null = null;

        while(token === null || this.sessions.has(token)) {
            token = session.genSessionToken.next
        }
        
        globalState.sessions.set(token, session);

        return token;
    }
}

export const globalState = new InstructarState();

