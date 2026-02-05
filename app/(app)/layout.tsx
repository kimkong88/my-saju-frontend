import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/layout/AppHeader";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check authentication - all routes in (app) group require auth
    const session = await auth();

    // Handle refresh token error (following Auth.js guide pattern)
    // Since we use credentials provider, sign out and redirect to home for re-authentication
    if (session?.error === "RefreshTokenError") {
        console.log(
            "[AppLayout] Refresh token error detected, signing out and redirecting to home for re-authentication"
        );
        // Sign out to clear JWT cookie, then redirect
        await signOut({ redirect: true, redirectTo: "/" });
        // This should not be reached, but just in case
        redirect("/");
    }

    if (!session || !(session as { userId?: string })?.userId) {
        // Not authenticated - redirect to home
        redirect("/");
    }

    return (
        <>
            <AppHeader />
            {/* Add padding-top to account for fixed header (one row on mobile, two rows on desktop) */}
            <main className="pt-16 md:pt-32 min-h-screen bg-white">
                {children}
            </main>
            {/* Add padding-bottom on mobile to account for bottom nav */}
            <div className="md:hidden h-16" />
        </>
    );
}
