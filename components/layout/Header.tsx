"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLandingPage = pathname === "/";

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    const handleHashClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        hash: string
    ) => {
        e.preventDefault();
        setMobileMenuOpen(false);
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
    };

    // Landing page navigation
    const landingNav = (
        <>
            <a
                href="#how-it-works"
                className="hover:text-slate-900 transition-colors"
                onClick={(e) => handleHashClick(e, "#how-it-works")}
            >
                How It Works
            </a>
            <a
                href="#timeline"
                className="hover:text-slate-900 transition-colors"
                onClick={(e) => handleHashClick(e, "#timeline")}
            >
                Timeline
            </a>
            <a
                href="#compatibility"
                className="hover:text-slate-900 transition-colors"
                onClick={(e) => handleHashClick(e, "#compatibility")}
            >
                Compatibility
            </a>
            <a
                href="#faq"
                className="hover:text-slate-900 transition-colors"
                onClick={(e) => handleHashClick(e, "#faq")}
            >
                FAQ
            </a>
            <Link
                href="/signup"
                className="hover:text-slate-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
            >
                Sign Up
            </Link>
            <a
                href="#teaser"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold"
                onClick={(e) => handleHashClick(e, "#teaser")}
            >
                Get Report
            </a>
        </>
    );

    // Report/Compat/Forecast page navigation (simplified)
    const appNav = (
        <>
            <Link
                href="/"
                className="hover:text-slate-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
            >
                Home
            </Link>
            <Link
                href="/#teaser"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold"
                onClick={() => setMobileMenuOpen(false)}
            >
                Get Report
            </Link>
        </>
    );

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-[100]">
            <nav className="w-full bg-white backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 xl:px-0 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" onClick={handleLogoClick}>
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-500">
                        {isLandingPage ? landingNav : appNav}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-900 hover:text-slate-700 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <div className="max-w-7xl mx-auto px-6 py-6 space-y-4 text-sm font-medium text-slate-500">
                            {isLandingPage ? (
                                <>
                                    <a
                                        href="#how-it-works"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={(e) =>
                                            handleHashClick(e, "#how-it-works")
                                        }
                                    >
                                        How It Works
                                    </a>
                                    <a
                                        href="#timeline"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={(e) =>
                                            handleHashClick(e, "#timeline")
                                        }
                                    >
                                        Timeline
                                    </a>
                                    <a
                                        href="#compatibility"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={(e) =>
                                            handleHashClick(e, "#compatibility")
                                        }
                                    >
                                        Compatibility
                                    </a>
                                    <a
                                        href="#faq"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={(e) =>
                                            handleHashClick(e, "#faq")
                                        }
                                    >
                                        FAQ
                                    </a>
                                    <Link
                                        href="/signup"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                    <a
                                        href="#teaser"
                                        className="block mt-4 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold text-center"
                                        onClick={(e) =>
                                            handleHashClick(e, "#teaser")
                                        }
                                    >
                                        Get Report
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/"
                                        className="block py-2 hover:text-slate-900 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/#teaser"
                                        className="block mt-4 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Get Report
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
