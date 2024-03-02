export type IdentityType = 'view' | 'capture' | 'control';

export interface ServerToClientEvents {
    // 2. If view type, they receive a token
    viewerGetSessionToken: (token: string) => void;

    // 4. Control tells view to place an indicator
    issueIndicator: (indicatorId: number, frameId: number, indicatorTypeId: number, screenPoints: number[][]) => void;
}

export interface ClientToServerEvents {
    // 1. Client identifies as one of IdentityTypes
    identify: (type: IdentityType) => void;

    // 3. Capture uploads frames to backend
    newFrame: (token: string, frameId: number, framePayload: Buffer, compressed: boolean) => void;
}

export interface SocketData {
    session: string | null;
}
