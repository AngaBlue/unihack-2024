import generateRandomString from './generateRandomString';

/**
 * Manages the streams in the application.
 */
class Streams {
    private streams = new Map<string, Date>();

    public get(code: string) {
        return this.streams.get(code) || null;
    }

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
