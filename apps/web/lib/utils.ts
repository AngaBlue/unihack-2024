import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function arrayBufferToBase64(buffer: ArrayBuffer): Promise<string> {
    // Create a blob from the array buffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Use FileReader to read the blob as a data URL (base64)
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    // Return a promise that resolves with the base64 string
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            // Extract the base64 string (remove the prefix)
            if (!reader.result || typeof reader.result !== 'string') resolve('');
            const base64data = (reader.result! as string).split(',')[1];
            resolve(base64data);
        };

        reader.onerror = error => {
            reject(error);
        };
    });
}
