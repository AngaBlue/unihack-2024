// Keep track of all current connections

import InstructARSession from './InstructARSession';

export class InstructarState {
    public sessions: Map<string, InstructARSession> = new Map<string, InstructARSession>();
}

const state = new InstructarState();
export default state;
