import HeroSection from "@/components/landing-page/HeroSection";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import SignatureSection from "@/components/landing-page/SignatureSection";
import DecipherSection from "@/components/landing-page/DecipherSection";
import CompatibilitySection from "@/components/landing-page/CompatibilitySection";
import WaitlistSection from "@/components/landing-page/WaitlistSection";
import LandingPageClientShell from "@/components/landing-page/LandingPageClientShell";

export default function Home() {
    return (
        <main className="overflow-x-hidden">
            <LandingPageClientShell
                afterTeaserSection={
                    <>
                        <SignatureSection />
                        <ResponsiveLayout>
                            <DecipherSection />
                        </ResponsiveLayout>
                        <CompatibilitySection />
                        <WaitlistSection />
                    </>
                }
            >
                <HeroSection />
            </LandingPageClientShell>
        </main>
    );
}
