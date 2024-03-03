import { ClickEvent, Vec3 } from './types';

export interface ServerToClientEvents {
    displayIndicator: (event: ClickEvent) => void;

    frame: (framePayload: Buffer, location: Vec3, direction: Vec3) => void;
}

export interface ClientToServerEvents {
    getStreamCode: (callback?: (code: string) => void) => void;

    subscribe: (code: string, callback?: (success: boolean) => void) => void;

    newFrame: (code: string, framePayload: Buffer, location: Vec3, direction: Vec3) => void;

    click: (code: string, event: ClickEvent) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {}
