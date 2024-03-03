export type IdentityType = 'view' | 'capture' | 'control';

export interface ServerToClientEvents {
    // 2. If view type, they receive a token
    viewerGetSessionToken: (token: string) => void;

    displayIndicator: (x: number, y: number, location: [number, number, number], direction: [number, number, number], emoji: string) => void;

    frame: (framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;
}

export interface ClientToServerEvents {
    // 1. Client identifies as one of IdentityTypes
    identify: (type: IdentityType) => void;

    subscribe: (token: string, callback: (success: boolean) => void) => void;

    // 4. Control tells view to place an indicator
    click: (x: number, y: number, location: [number, number, number], direction: [number, number, number], emoji: string) => void;

    startStream: (token: string) => void;

    // 3. Capture uploads frames to backend
    newFrame: (token: string, framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    session: string | null;
    identity: IdentityType;
}
