import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import ReportNavigation from "@/components/report-page/ReportNavigation";
import HeroSection from "@/components/report-page/HeroSection";
import BirthChartSection from "@/components/report-page/BirthChartSection";
import IntroductionSection from "@/components/report-page/IntroductionSection";
import NextSection from "@/components/report-page/NextSection";
import WhoYouAreSection from "@/components/report-page/WhoYouAreSection";
import StrengthSection from "@/components/report-page/StrengthSection";
import WeaknessSection from "@/components/report-page/WeaknessSection";
import LifeSection from "@/components/report-page/LifeSection";
import ConclusionSection from "@/components/report-page/ConclusionSection";
import ShareSection from "@/components/report-page/ShareSection";
import FloatingShareButton from "@/components/report-page/FloatingShareButton";
import { getReport } from "@/app/actions/reportAction";
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
        }) - 1 in ${rarity.overall.oneIn.toLocaleString()} | PulseMap`,
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

    return (
        <div className="pb-20 xl:pb-0">
            <ReportNavigation />
            <HeroSection identity={report.identity} rarity={report.rarity} />
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
            <StrengthSection strengths={report.strengths} />
            <WeaknessSection weaknesses={report.weaknesses} />
            <LifeSection lifeThemes={report.lifeThemes} />
            <ConclusionSection conclusion={report.conclusion} />
            <ShareSection
                identity={report.identity}
                rarity={report.rarity}
                specialTraits={report.specialTraits}
                elementDistribution={report.elementDistribution}
                reportCode={code}
            />
            <NextSection />
            <FloatingShareButton />
        </div>
    );
}
