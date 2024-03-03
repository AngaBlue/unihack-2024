import generateRandomString from './generateRandomString';

/**
 * Manages the streams in the application.
 */
class Streams {
    private streams = new Map<string, Date>();

    /**
     * Returns the timestamp of the stream with the given code.
     * @param code The stream code.
     * @returns The timestamp of the stream, or null if it doesn't exist.
     */
    public get(code: string) {
        return this.streams.get(code) || null;
    }

    /**
     * Creates a new stream and returns the code.
     * @returns The code of the new stream.
     */
    public create() {
        // Create new session
        const timestamp = new Date();
        const code = generateRandomString(5);

        // Add to the list
        this.streams.set(code, timestamp);

        // Return the code
        return code;
    }
}

const streams = new Streams();
export default streams;
