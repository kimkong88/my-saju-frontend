import WaitlistSection from "@/components/landing-page/WaitlistSection";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import CheatSheetSection from "@/components/report-page/CheatSheetSection";
import HeroSection from "@/components/report-page/HeroSection";
import IntroductionSection from "@/components/report-page/IntroductionSection";
import TakeawaySection from "@/components/report-page/NextSection";
import TurningPointSection from "@/components/report-page/TurningPointSection";
import VibeCheckSection from "@/components/report-page/VibeCheckSection";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div>
            ReportPage {id}
            <HeroSection />
            <IntroductionSection />
            <ResponsiveLayout>
                <VibeCheckSection />
            </ResponsiveLayout>
            <TurningPointSection />
            <ResponsiveLayout>
                <CheatSheetSection />
            </ResponsiveLayout>
            <TakeawaySection />
            <WaitlistSection />
        </div>
    );
}
