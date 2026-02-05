import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import HeroSection from "@/components/landing-page/HeroSection";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import SampleReportPreview from "@/components/landing-page/SampleReportPreview";
import SignatureSection from "@/components/landing-page/SignatureSection";
import DifferentiatorSection from "@/components/landing-page/DifferentiatorSection";
import DecipherSection from "@/components/landing-page/DecipherSection";
import CompatibilitySection from "@/components/landing-page/CompatibilitySection";
import TrustSignalsSection from "@/components/landing-page/TrustSignalsSection";
import SocialProofSection from "@/components/landing-page/SocialProofSection";
import FAQSection from "@/components/landing-page/FAQSection";
import LandingPageClientShell from "@/components/landing-page/LandingPageClientShell";

export const metadata: Metadata = {
    title: "Unstar - Beyond Astrology",
    description:
        "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
    openGraph: {
        title: "Unstar - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Unstar - Beyond Astrology",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Unstar - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations.",
        images: ["/opengraph-image"],
    },
};

export default async function Home() {
    // Check if user is already authenticated (server-side)
    const session = await auth();

    // Don't redirect if there's a refresh token error (prevents infinite loop)
    // AppLayout will handle the redirect, but if user lands here directly, show landing page
    if (session?.error === "RefreshTokenError") {
        // Clear the error by not redirecting - let user see landing page
        // They can sign in again if needed
        return (
            <main className="overflow-x-hidden">
                <LandingPageClientShell
                    afterTeaserSection={
                        <>
                            <SampleReportPreview />
                            <SignatureSection />
                            <div className="border-t border-slate-900/5" />
                            <ResponsiveLayout>
                                <DecipherSection />
                            </ResponsiveLayout>
                            <DifferentiatorSection />
                            <CompatibilitySection />
                            <TrustSignalsSection />
                            <SocialProofSection />
                            <FAQSection />
                        </>
                    }
                >
                    <HeroSection />
                </LandingPageClientShell>
            </main>
        );
    }

    // Check if session has userId (added in our auth callback)
    if (session && "userId" in session && session.userId) {
        // User is already authenticated, redirect to /today (app home)
        redirect("/today");
    }

    // User is not authenticated, show landing page
    return (
        <main className="overflow-x-hidden">
            <LandingPageClientShell
                afterTeaserSection={
                    <>
                        <SampleReportPreview />
                        <SignatureSection />
                        <div className="border-t border-slate-900/5" />
                        <ResponsiveLayout>
                            <DecipherSection />
                        </ResponsiveLayout>
                        <DifferentiatorSection />
                        <CompatibilitySection />
                        <TrustSignalsSection />
                        <SocialProofSection />
                        <FAQSection />
                    </>
                }
            >
                <HeroSection />
            </LandingPageClientShell>
        </main>
    );
}
