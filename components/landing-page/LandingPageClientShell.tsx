"use client";

import ResponsiveLayout from "../layout/ResponsiveLayout";
import TeaserSection from "./TeaserSection";

export default function LandingPageClientShell({
    children,
    afterTeaserSection,
}: {
    children: React.ReactNode;
    afterTeaserSection: React.ReactNode;
}) {
    return (
        <>
            {children}
            <div className="border-t border-slate-900/5"></div>
            <ResponsiveLayout>
                <TeaserSection />
            </ResponsiveLayout>
            {afterTeaserSection}
        </>
    );
}
