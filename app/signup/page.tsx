import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignUpForm from "@/components/signup-page/SignUpForm";

/**
 * Server component that handles authentication check
 * Redirects authenticated users to /me before rendering the form
 */
export default async function SignUpPage() {
    // Check if user is already authenticated (server-side)
    const session = await auth();

    // Check if session has userId (added in our auth callback)
    if (session && "userId" in session && session.userId) {
        // User is already authenticated, redirect to /me
        redirect("/me");
    }

    // User is not authenticated, render the signup form
    return <SignUpForm />;
}
