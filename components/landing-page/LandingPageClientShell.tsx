"use client";

import { useEffect } from "react";
import ResponsiveLayout from "../layout/ResponsiveLayout";
import TeaserSection from "./TeaserSection";

const handleHashClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

    if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const hash = anchor.getAttribute("href");
        if (hash && hash !== "#") {
            e.preventDefault();
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
                // Don't update URL hash - keep URLs clean
            }
        }
    }
};

export default function LandingPageClientShell({
    children,
    afterTeaserSection,
}: {
    children: React.ReactNode;
    afterTeaserSection: React.ReactNode;
}) {
    useEffect(() => {
        // Intercept all hash link clicks on the landing page
        document.addEventListener("click", handleHashClick);

        return () => {
            document.removeEventListener("click", handleHashClick);
        };
    }, []);

    return (
        <>
            {children}
            <div className="border-t border-slate-900/5" />
            <ResponsiveLayout>
                <TeaserSection />
            </ResponsiveLayout>
            {afterTeaserSection}
        </>
    );
}
