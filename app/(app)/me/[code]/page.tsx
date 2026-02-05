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
import ShareSection from "@/components/report-page/ShareSection";
import FloatingProfileButton from "@/components/report-page/FloatingProfileButton";
import ExploreMoreSection from "@/components/report-page/ExploreMoreSection";
import { getReport } from "@/app/actions/reportAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    const response = await getReport(code);

    if (!response || response.type !== "personal") {
        notFound();
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
            index: false,
            follow: false,
        },
        openGraph: {
            title: `${
                identity.title
            } - 1 in ${rarity.overall.oneIn.toLocaleString()}`,
            description: `Discover your unique personality signature. This combination appears in 1 in ${rarity.overall.oneIn.toLocaleString()} people.`,
            images: [
                {
                    url: `/personal/${code}/opengraph-image`,
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
            images: [`/personal/${code}/opengraph-image`],
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

    if (!response || response.type !== "personal") {
        notFound();
    }

    const report = response.data;
    const input = response.input;

    // Get subscription status
    let isPremium = false;
    try {
        const subscription = await getSubscriptionStatus();
        isPremium = subscription?.isSubscribed || false;
    } catch (error) {
        console.error("Error loading subscription status:", error);
        // Default to free user on error
        isPremium = false;
    }

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
                luckCycles={(report as { luckCycles?: { current: { emoji: string; title: string; description: string; expireAt: string; technicalBasis: string[]; }; next?: { emoji: string; title: string; description: string; startsAt: string; technicalBasis: string[]; } } }).luckCycles}
                isPremium={isPremium}
            />
            <IntroductionSection
                introduction={report.introduction}
                visualMetaphor={report.identity.visualMetaphor}
            />
            <ResponsiveLayout>
                <WhoYouAreSection
                    whoYouAre={report.whoYouAre}
                    specialTraits={report.specialTraits}
                    rarity={report.rarity}
                />
            </ResponsiveLayout>
            <CompatibilityPrompt reportCode={code} />
            <StrengthSection
                strengths={report.strengths}
                isPremium={isPremium}
            />
            <WeaknessSection
                weaknesses={report.weaknesses}
                isPremium={isPremium}
            />
            <LifeSection lifeThemes={report.lifeThemes} isPremium={isPremium} />
            <ConclusionSection conclusion={report.conclusion} />
            {/* ShareSection only shown for authenticated users, not on shared links */}
            <ShareSection
                identity={report.identity}
                rarity={report.rarity}
                specialTraits={report.specialTraits}
                elementDistribution={report.elementDistribution}
                reportCode={code}
            />
            {/* Explore More section - links to Today, Forecast, Friends */}
            <ExploreMoreSection />
            <FloatingProfileButton />
        </div>
    );
}
