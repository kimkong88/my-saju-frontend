/**
 * Creates a birthDateTime Date object from date and optional time strings.
 * Strips timezone information and handles missing time (sets to midnight).
 *
 * Parses the date string directly to avoid timezone conversion issues.
 */
export function createBirthDateTime(
    birthDate: string,
    birthTime?: string
): Date {
    // Parse date string directly (format: YYYY-MM-DD)
    // Split to avoid timezone interpretation issues
    const [yearStr, monthStr, dayStr] = birthDate.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1; // Month is 0-indexed in Date
    const day = parseInt(dayStr, 10);

    // Parse time if provided, otherwise default to midnight
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (birthTime && birthTime.trim() !== "") {
        const timeParts = birthTime.split(":");
        hours = parseInt(timeParts[0] || "0", 10);
        minutes = parseInt(timeParts[1] || "0", 10);
        seconds = parseInt(timeParts[2] || "0", 10);
    }

    // Create UTC date directly from parsed components
    // This ensures the date/time is sent exactly as input, without timezone conversion
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

/**
 * Formats a Date object to ISO string without timezone (YYYY-MM-DDTHH:mm:ss)
 * This is the format expected by the backend API
 */
export function formatBirthDateToISO(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
