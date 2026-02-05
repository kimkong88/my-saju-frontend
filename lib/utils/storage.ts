/**
 * Storage utilities for localStorage encryption/decryption
 * 
 * NOTE: Base64 is encoding, NOT encryption. It only obfuscates data.
 * - Prevents casual inspection in DevTools
 * - Does NOT protect against XSS attacks
 * - Does NOT protect against malicious scripts
 * 
 * For real security, consider:
 * - Proper encryption (AES) with a key stored securely
 * - Server-side storage instead of localStorage
 * - HTTPS-only cookies with HttpOnly flag
 */

/**
 * Encode data to base64 for localStorage
 */
export function encodeStorage(data: unknown): string {
    try {
        const jsonString = JSON.stringify(data);
        return btoa(jsonString); // Base64 encode
    } catch (error) {
        console.error("Error encoding storage data:", error);
        throw new Error("Failed to encode data");
    }
}

/**
 * Decode base64 data from localStorage
 */
export function decodeStorage<T>(encodedData: string): T | null {
    try {
        const jsonString = atob(encodedData); // Base64 decode
        return JSON.parse(jsonString) as T;
    } catch (error) {
        console.error("Error decoding storage data:", error);
        return null;
    }
}

/**
 * Save data to localStorage with encoding
 */
export function saveToStorage(key: string, data: unknown): void {
    if (typeof window === "undefined") return;
    try {
        const encoded = encodeStorage(data);
        localStorage.setItem(key, encoded);
    } catch (error) {
        console.error(`Error saving to localStorage (${key}):`, error);
    }
}

/**
 * Load data from localStorage with decoding
 */
export function loadFromStorage<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
        const encoded = localStorage.getItem(key);
        if (!encoded) return null;
        return decodeStorage<T>(encoded);
    } catch (error) {
        console.error(`Error loading from localStorage (${key}):`, error);
        return null;
    }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
}

