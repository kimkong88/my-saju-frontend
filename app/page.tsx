import type { Metadata } from "next";
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
    title: "PulseMap - Beyond Astrology",
    description:
        "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
    openGraph: {
        title: "PulseMap - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "PulseMap - Beyond Astrology",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PulseMap - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations.",
        images: ["/opengraph-image"],
    },
};

export default function Home() {
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
