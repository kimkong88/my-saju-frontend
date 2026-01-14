"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";

export default function FloatingShareButton() {
    const [showButton, setShowButton] = useState(false);
    const [isNearShareSection, setIsNearShareSection] = useState(false);

    // Show button after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.45; // Hero is min-h-[45vh]
            setShowButton(window.scrollY > heroHeight);

            // Check if user is near ShareSection
            const shareSection = document.getElementById("share");
            if (shareSection) {
                const rect = shareSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                // Consider "near" if ShareSection is within 2 viewport heights
                setIsNearShareSection(
                    rect.top < viewportHeight * 2 &&
                        rect.bottom > -viewportHeight
                );
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        const shareSection = document.getElementById("share");
        if (shareSection) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = shareSection.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (!showButton) return null;

    // Hide button if user is already in ShareSection
    if (isNearShareSection) return null;

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer fixed bottom-24 right-6 xl:bottom-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-200 button--effect group"
            aria-label="Go to share section"
            title="Share your results"
        >
            <Share2 className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse"></span>
        </button>
    );
}
