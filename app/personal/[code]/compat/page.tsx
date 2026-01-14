import type { Metadata } from "next";
import CompatibilityForm from "../../../../components/compat-page/CompatibilityForm";
import { getReport } from "@/app/actions/reportAction";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    const { code } = await params;
    const response = await getReport(code);
    if (!response || response.type !== "personal") {
        notFound();
    }
    const report = response.data;
    return {
        title: `Compatibility Check with ${report.identity.title} | PulseMap`,
        description: `Check compatibility between with ${report.identity.title}.`,
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

    if (!response || response.type !== "personal") {
        notFound();
    }

    const report = response.data;
    const input = response.input;

    return <CompatibilityForm report={report} input={input} />;
}
