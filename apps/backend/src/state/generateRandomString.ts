const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

/**
 * Generates a random alphanumeric string of the given length.
 * @param length The length of the string to generate.
 * @returns The generated string.
 */
export default function generateRandomString(length: number) {
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
