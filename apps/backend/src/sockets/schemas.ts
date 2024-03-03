export interface ServerToClientEvents {
    displayIndicator: (indicatorId: number, frameId: number, indicatorTypeId: number, screenPoints: number[][]) => void;

    frame: (framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;
}

export interface ClientToServerEvents {
    getStreamCode: (callback: (code: string) => void) => void;

    subscribe: (token: string, callback: (success: boolean) => void) => void;

    newFrame: (token: string, framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;

    click: (indicatorId: number, frameId: number, indicatorTypeId: number, screenPoints: number[][]) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    session: string | null;
}
