// Admin email constant
export const ADMIN_EMAIL = "salamhani697@gmail.com";

/**
 * Check if a user email is the admin
 */
export function isAdmin(email?: string | null): boolean {
    return email === ADMIN_EMAIL;
}
