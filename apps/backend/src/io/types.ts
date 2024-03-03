export type Vec3 = [number, number, number];

export interface ClickEvent {
    x: number;
    y: number;
    position: Vec3;
    direction: Vec3;
    emoji: string;
}
