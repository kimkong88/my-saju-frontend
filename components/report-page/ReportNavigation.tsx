"use client";

import { useEffect, useState, useRef } from "react";

const chapters = [
    { id: "birth-chart", title: "Birth Chart", shortTitle: "Chart" },
    { id: "introduction", title: "Introduction", shortTitle: "Intro" },
    { id: "who-you-are", title: "Who You Are", shortTitle: "Identity" },
    { id: "strengths", title: "Strengths", shortTitle: "Strengths" },
    { id: "weaknesses", title: "Weaknesses", shortTitle: "Weaknesses" },
    { id: "life-at-a-glance", title: "Life at a Glance", shortTitle: "Life" },
    { id: "conclusion", title: "Conclusion", shortTitle: "End" },
];

export default function ReportNavigation() {
    const [activeSection, setActiveSection] = useState<string>("birth-chart");
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper portion of viewport
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        // Observe all sections
        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            chapters.forEach((chapter) => {
                const element = document.getElementById(chapter.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    // Auto-scroll active item to center on mobile
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        // Only on mobile (xl:hidden)
        if (typeof window !== "undefined" && window.innerWidth >= 1280) return;

        const container = scrollContainerRef.current;

        // Find active item by data attribute or querySelector
        const activeItem = container.querySelector(
            `[data-section-id="${activeSection}"]`
        ) as HTMLAnchorElement;
        if (!activeItem) return;

        const itemLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;

        // Calculate center position
        const itemCenter = itemLeft + itemWidth / 2;
        const containerCenter = scrollLeft + containerWidth / 2;
        const targetScroll = itemCenter - containerWidth / 2;

        // Only scroll if item is not centered (with threshold)
        if (Math.abs(itemCenter - containerCenter) > 20) {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                container.scrollTo({
                    left: Math.max(0, targetScroll),
                    behavior: "smooth",
                });
            }, 50);
        }
    }, [activeSection]);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.scrollY - headerOffset;

            // Update URL hash for bookmarking/sharing
            window.history.pushState(null, "", `#${id}`);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            {/* Desktop Navigation - Right Side */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-5">
                {/* 1. High-Contrast Rail: Darker slate makes it pop against white */}
                <div className="absolute right-[4px] top-0 bottom-0 w-px bg-slate-400" />

                {chapters.map((chapter, index) => {
                    const isActive = activeSection === chapter.id;
                    return (
                        <a
                            key={chapter.id}
                            href={`#${chapter.id}`}
                            onClick={(e) => handleNavClick(e, chapter.id)}
                            className="group relative flex items-center gap-4 py-1"
                        >
                            {/* 2. Solid Tooltip: Visible White background with dark border */}
                            <span className="text-[10px] font-mono text-slate-900 opacity-0 group-hover:opacity-100 uppercase tracking-widest transition-all bg-white px-3 py-1.5 border border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)] -translate-x-2 group-hover:translate-x-0">
                                {chapter.title}
                            </span>

                            <div className="flex items-center gap-3">
                                {/* 3. Weighted Text: Active state styling */}
                                <span
                                    className={`text-[10px] font-mono transition-colors font-bold ${
                                        isActive
                                            ? "text-slate-900"
                                            : "text-slate-600 group-hover:text-slate-900"
                                    }`}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* 4. The Square Anchor: Active state styling */}
                                <div
                                    className={`w-2.5 h-2.5 rounded-full border transition-all z-10 ${
                                        isActive
                                            ? "bg-slate-900 border-slate-900"
                                            : "bg-white border-slate-600 group-hover:bg-slate-900 group-hover:border-slate-900"
                                    }`}
                                />
                            </div>
                        </a>
                    );
                })}
            </nav>

            {/* Mobile Navigation - Bottom Sticky */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 xl:hidden bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide"
                >
                    <div className="flex items-center gap-1 px-4 py-3 min-w-max">
                        {chapters.map((chapter, index) => {
                            const isActive = activeSection === chapter.id;
                            return (
                                <a
                                    key={chapter.id}
                                    data-section-id={chapter.id}
                                    href={`#${chapter.id}`}
                                    onClick={(e) =>
                                        handleNavClick(e, chapter.id)
                                    }
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all min-w-[60px] ${
                                        isActive
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="text-[10px] font-mono font-bold">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={`text-[10px] font-medium uppercase tracking-tight text-center ${
                                            isActive
                                                ? "text-white"
                                                : "text-slate-600"
                                        }`}
                                    >
                                        {chapter.shortTitle}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}
