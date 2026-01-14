import type { Metadata } from "next";
import CompatibilityHeroSection from "@/components/compat-page/CompatibilityHeroSection";
import HowYouMatchSection from "@/components/compat-page/HowYouMatchSection";
import CompatibilityContentSection from "@/components/compat-page/CompatibilityContentSection";
import CompatibilityNextSection from "@/components/compat-page/CompatibilityNextSection";
import CompatibilityShareSection from "@/components/compat-page/CompatibilityShareSection";
import { getReport } from "@/app/actions/reportAction";
import { notFound } from "next/navigation";
import type {
    CompatibilityReport,
    SpecialConnection,
    SharedBehavior,
} from "@/types/report";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    // TODO: Replace with actual API call
    const { code } = await params;
    const response = await getReport(code);
    if (!response || response.type !== "compatibility") {
        notFound();
    }
    const compat = response.data;

    return {
        title: `${compat.person1.identity.title} & ${compat.person2.identity.title} - ${compat.score.overall}/100 Compatibility | PulseMap`,
        description: `${compat.score.headline}. Compatibility score: ${compat.score.overall}/100. ${compat.rarity.description}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function CompatibilityPage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    const response = await getReport(code);
    if (!response || response.type !== "compatibility") {
        notFound();
    }
    const compat = response.data as CompatibilityReport;

    // Map new data structure to component props
    // Person2 is the viewer - write from their perspective
    const strengths = [
        ...(compat.specialConnections || []).map((conn: SpecialConnection) => ({
            title: conn.title,
            emoji: conn.emoji,
            rarity: conn.rarity,
            description: conn.description,
        })),
        ...(compat.sharedBehaviors || []).map((behavior: SharedBehavior) => ({
            title: behavior.title,
            emoji: behavior.emoji,
            description: `${behavior.description} ${behavior.impact || ""}`,
        })),
    ];

    const sharedTraits = compat.sharedTraits
        ? {
              title: "You Both Share",
              items: compat.sharedTraits,
          }
        : undefined;

    return (
        <div className="pb-20 xl:pb-0">
            <CompatibilityHeroSection
                person1={compat.person1}
                person2={compat.person2}
                score={compat.score}
                pairingTitle={compat.pairingTitle}
                rarity={compat.rarity}
            />
            <HowYouMatchSection
                introduction={compat.introduction}
                scoreBreakdown={compat.scoreBreakdown}
                rating={compat.score.rating}
            />
            <CompatibilityContentSection
                overview={compat.overview}
                strengths={strengths}
                sharedTraits={sharedTraits}
            />
            <CompatibilityShareSection
                person1={compat.person1}
                person2={compat.person2}
                score={compat.score}
                rarity={compat.rarity}
                pairingTitle={compat.pairingTitle}
                compatCode={code}
            />
            <CompatibilityNextSection />
        </div>
    );
}
