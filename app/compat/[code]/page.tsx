import type { Metadata } from "next";
import CompatibilityForm from "@/components/compat-page/CompatibilityForm";
import { getUserByCode } from "@/app/actions/userAction";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import type { PersonalReport, ReportInput } from "@/types/report";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    const { code } = await params;

    try {
        const userData = await getUserByCode(code);
        return {
            title: `Compatibility Check with ${userData.identity.title} | Unstar`,
            description: `Check compatibility with ${userData.identity.title}.`,
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch {
        notFound();
    }
}

export default async function CompatibilityPage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    // Check if user is logged in - if so, redirect to /compatibility
    const session = await auth();
    if (session) {
        redirect("/compatibility");
    }

    // Fetch user data - if not found, notFound() will be called
    let userData;
    try {
        userData = await getUserByCode(code);
    } catch {
        notFound();
    }

    // Convert user data to report format for CompatibilityForm
    const report: PersonalReport = {
        identity: userData.identity,
        rarity: userData.rarity
            ? { overall: { oneIn: userData.rarity.oneIn, description: "" } }
            : undefined,
    } as PersonalReport;

    const input: ReportInput = {
        birthDateTime: userData.birthDateTime,
        gender: userData.gender,
        birthTimezone: userData.birthTimezone,
        isTimeKnown: userData.isTimeKnown,
        birthLocation: userData.birthLocation,
        currentLocation: userData.currentLocation,
    };

    // Return JSX outside try/catch to allow proper error boundary handling
    return (
        <CompatibilityForm
            report={report}
            input={input}
            userName={userData.fullName || undefined}
            userCode={code}
        />
    );
}
