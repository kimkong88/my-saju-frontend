"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingProfileButton() {
    const [showButton, setShowButton] = useState(false);
    const router = useRouter();

    // Show button after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.45; // Hero is min-h-[45vh]
            setShowButton(window.scrollY > heroHeight);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        router.push("/me");
    };

    if (!showButton) return null;

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer fixed bottom-24 right-6 xl:bottom-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-200 button--effect group"
            aria-label="Go to my profile"
            title="Go to my profile"
        >
            <User className="w-5 h-5" strokeWidth={2.5} />
        </button>
    );
}
