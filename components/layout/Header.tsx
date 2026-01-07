"use client";

import { usePathname } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-[100]">
            <nav className="w-full bg-white/60 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 xl:px-0 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" onClick={handleLogoClick}>
                        <Logo />
                    </Link>
                    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-500">
                        <a
                            href="#teaser"
                            className="text-slate-900 font-semibold px-4 py-1.5 bg-slate-100 rounded-full"
                        >
                            Try Teaser
                        </a>
                        <a
                            href="#how-it-works"
                            className="hover:text-slate-900 transition-colors"
                        >
                            How It Works
                        </a>
                        <a
                            href="#timeline"
                            className="hover:text-slate-900 transition-colors"
                        >
                            Timeline
                        </a>
                        <a
                            href="#compatibility"
                            className="hover:text-slate-900 transition-colors"
                        >
                            Compatibility
                        </a>
                        <a
                            href="#waitlist"
                            className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all"
                        >
                            Pre-Register
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
