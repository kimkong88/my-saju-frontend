import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import ReportNavigation from "@/components/report-page/ReportNavigation";
import HeroSection from "@/components/report-page/HeroSection";
import AccuracyAlert from "@/components/report-page/AccuracyAlert";
import BirthChartSection from "@/components/report-page/BirthChartSection";
import IntroductionSection from "@/components/report-page/IntroductionSection";
import WhoYouAreSection from "@/components/report-page/WhoYouAreSection";
import CompatibilityPrompt from "@/components/report-page/CompatibilityPrompt";
import StrengthSection from "@/components/report-page/StrengthSection";
import WeaknessSection from "@/components/report-page/WeaknessSection";
import LifeSection from "@/components/report-page/LifeSection";
import ConclusionSection from "@/components/report-page/ConclusionSection";
import NextSection from "@/components/report-page/NextSection";
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
}) {
    const { code } = await params;

    const response = await getReport(code);

    if (!response) {
        notFound();
    }

    if (response.type === "compatibility") {
        const compat = response.data;
        return {
            title: `${compat.person1.identity.title} & ${compat.person2.identity.title} - ${compat.score.overall}/100 Compatibility | Unstar`,
            description: `${compat.score.headline}. Compatibility score: ${compat.score.overall}/100. ${compat.rarity.description}`,
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const report = response.data;
    const identity = report.identity;
    const rarity = report.rarity;

    return {
        title: `${identity.title} (${
            identity.code
        }) - 1 in ${rarity.overall.oneIn.toLocaleString()} | Unstar`,
        description: `I'm ${identity.title} (${
            identity.code
        }) - 1 in ${rarity.overall.oneIn.toLocaleString()}. Discover your unique personality signature from 10.3 million possible combinations.`,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: `${
                identity.title
            } - 1 in ${rarity.overall.oneIn.toLocaleString()}`,
            description: `Discover your unique personality signature. This combination appears in 1 in ${rarity.overall.oneIn.toLocaleString()} people.`,
            images: [
                {
                    url: `/s/${code}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: `${identity.title} Bazi Report`,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${
                identity.title
            } - 1 in ${rarity.overall.oneIn.toLocaleString()}`,
            description: `Discover your unique personality signature.`,
            images: [`/s/${code}/opengraph-image`],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    const response = await getReport(code);

    if (!response) {
        notFound();
    }

    // Handle compatibility reports
    if (response.type === "compatibility") {
        const compat = response.data as CompatibilityReport;

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

    // Handle personal reports
    const report = response.data;
    const input = response.input;

    return (
        <div className="pb-20 xl:pb-0">
            <ReportNavigation />
            <HeroSection identity={report.identity} rarity={report.rarity} />
            {/* Accuracy Alert - Before first content section */}
            <div className="px-6 xl:px-0 py-8">
                <div className="max-w-7xl mx-auto">
                    <AccuracyAlert input={input} />
                </div>
            </div>
            <BirthChartSection
                fourPillars={report.technicalBasis.fourPillars}
                elementDistribution={report.elementDistribution}
                identity={report.identity}
                rarity={report.rarity}
                chartMeaning={report.chartMeaning}
            />
            <IntroductionSection
                introduction={report.introduction}
                visualMetaphor={report.identity.visualMetaphor}
            />
            <ResponsiveLayout>
                <WhoYouAreSection
                    whoYouAre={report.whoYouAre}
                    specialTraits={report.specialTraits}
                />
            </ResponsiveLayout>
            <CompatibilityPrompt reportCode={code} />
            <StrengthSection strengths={report.strengths} />
            <WeaknessSection weaknesses={report.weaknesses} />
            <LifeSection lifeThemes={report.lifeThemes} />
            <ConclusionSection conclusion={report.conclusion} />
            {/* Note: ShareSection is intentionally omitted for shared reports */}
            <NextSection />
            {/* Note: FloatingShareButton is intentionally omitted for shared reports */}
        </div>
    );
}

