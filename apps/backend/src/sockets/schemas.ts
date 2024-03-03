export interface ServerToClientEvents {
    displayIndicator: (event: ClickEvent) => void;

    frame: (framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;
}

type Vec3 = [number, number, number];

interface ClickEvent {
    x: number;
    y: number;
    position: Vec3;
    direction: Vec3;
    emoji: string;
}

export interface ClientToServerEvents {
    getStreamCode: (callback: (code: string) => void) => void;

    subscribe: (code: string, callback: (success: boolean) => void) => void;

    newFrame: (code: string, framePayload: Buffer, location: [number, number, number], direction: [number, number, number]) => void;

    click: (code: string, event: ClickEvent) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    session: string | null;
}
