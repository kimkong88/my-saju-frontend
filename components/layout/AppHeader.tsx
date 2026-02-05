"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";
import { User, Bell, LogOut, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, Dropdown, Label, Button } from "@heroui/react";
import { signOutUser, refreshTokenDirectly } from "@/app/actions/authAction";
import { getActiveBlessings } from "@/app/actions/blessingsAction";
import { getMeOverview } from "@/app/actions/meAction";
import { toast } from "sonner";

const navItems = [
    { href: "/today", label: "Today" },
    { href: "/forecast", label: "Forecast" },
    { href: "/compatibility", label: "Compatibility" },
    { href: "/me", label: "Me" },
];

export default function AppHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeBlessingsCount, setActiveBlessingsCount] = useState(0);
    const [userCode, setUserCode] = useState<string | null>(null);
    const [hasNewBlessings, setHasNewBlessings] = useState(false);

    // Track scroll position for header shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Ensure component is mounted before rendering tabs (prevents hydration mismatch)
    // Initialize mounted state based on client-side check
    useEffect(() => {
        // This is an intentional mount-only effect for hydration safety
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Load user code and blessing indicator state (per user)
    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Get user code
                const meOverview = await getMeOverview();
                const code = meOverview.user.code || meOverview.user.id;
                setUserCode(code);

                // Load blessing indicator state from localStorage (per user)
                const stored = localStorage.getItem("blessingIndicators");
                const indicators: Record<string, string> = stored
                    ? JSON.parse(stored)
                    : {};
                const userLastSeen = indicators[code] || null;

                // Fetch active blessings and check if any are new (created after last seen)
                const blessings = await getActiveBlessings();
                setActiveBlessingsCount(blessings.length);

                // Check if any blessing was created after last seen timestamp
                if (userLastSeen) {
                    const hasNew = blessings.some(
                        (blessing) =>
                            new Date(blessing.createdAt) >
                            new Date(userLastSeen)
                    );
                    setHasNewBlessings(hasNew);
                } else {
                    // If no lastSeenTimestamp, show indicator if there are any blessings
                    setHasNewBlessings(blessings.length > 0);
                }
            } catch {
                // Silently fail - don't show indicator if there's an error
                setActiveBlessingsCount(0);
            }
        };

        loadUserData();
    }, []);

    // Update last seen timestamp when user visits Today page
    useEffect(() => {
        if ((pathname === "/today" || pathname === "/") && userCode) {
            const now = new Date().toISOString();
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasNewBlessings(false); // Hide indicator when user visits Today page

            // Update localStorage (per user)
            const stored = localStorage.getItem("blessingIndicators");
            const indicators: Record<string, string> = stored
                ? JSON.parse(stored)
                : {};
            indicators[userCode] = now;
            localStorage.setItem(
                "blessingIndicators",
                JSON.stringify(indicators)
            );
        }
    }, [pathname, userCode]);

    // Determine active tab key based on pathname
    const getActiveKey = () => {
        if (!mounted) return "today"; // Default during SSR/hydration
        // Don't highlight tabs on marketing/public pages
        if (pathname === "/pricing") {
            return null;
        }
        if (pathname === "/" || pathname === "/today") {
            return "today";
        }
        for (const item of navItems) {
            if (pathname.startsWith(item.href)) {
                return item.href.replace("/", "");
            }
        }
        return "today";
    };
    const activeKey = getActiveKey();

    const handleTabChange = (key: string) => {
        const href = `/${key}`;
        router.push(href);
    };

    // Temporary debug function to manually refresh token
    const handleDebugRefreshToken = async () => {
        try {
            console.log("[DEBUG] Manually triggering refresh token...");

            // First, let's check what we have in the session
            const sessionCheck = await fetch("/api/auth/session");
            const sessionData = await sessionCheck.json();
            console.log("[DEBUG] Current session data:", {
                hasAccessToken: !!sessionData?.accessToken,
                hasRefreshToken: !!sessionData?.refreshToken,
                refreshTokenPreview: sessionData?.refreshToken
                    ? sessionData.refreshToken.substring(0, 20) + "..."
                    : "N/A",
                refreshTokenLength: sessionData?.refreshToken?.length || 0,
                userId: sessionData?.userId,
            });

            const result = await refreshTokenDirectly();
            if (result) {
                console.log("[DEBUG] Refresh token successful:", {
                    accessToken: result.accessToken.substring(0, 20) + "...",
                    refreshToken: result.refreshToken.substring(0, 20) + "...",
                    accessTokenExpires: new Date(
                        result.accessTokenExpires * 1000
                    ).toISOString(),
                    refreshTokenExpires: new Date(
                        result.refreshTokenExpires * 1000
                    ).toISOString(),
                });
                toast.success(
                    "Token refreshed successfully! Check console for details."
                );
            } else {
                console.error(
                    "[DEBUG] Refresh token returned null - check server logs for details"
                );
                toast.error(
                    "Refresh token failed - returned null. Check console and server logs."
                );
            }
        } catch (error) {
            console.error("[DEBUG] Refresh token error:", error);
            toast.error(
                `Refresh token error: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-[100]">
            <nav
                className={`w-full bg-white backdrop-blur-md border-b border-slate-200/50 transition-shadow duration-200 ${
                    isScrolled ? "shadow-sm" : ""
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 xl:px-0">
                    {/* Row 1: Logo + User Actions */}
                    <div className="h-16 md:h-20 flex items-center justify-between">
                        {/* Logo - Left */}
                        <Link
                            href="/today"
                            className="flex items-center flex-shrink-0"
                        >
                            <Logo />
                        </Link>

                        {/* User Actions - Right (Desktop & Mobile) */}
                        <div className="flex items-center gap-4">
                            {/* DEBUG: Refresh Token Button - Temporary */}
                            <button
                                onClick={handleDebugRefreshToken}
                                className="hidden md:flex p-2 text-amber-600 hover:text-amber-700 transition-colors relative"
                                aria-label="Debug: Refresh Token"
                                title="Debug: Manually refresh token"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>

                            {/* Notifications - Desktop only */}
                            <button
                                className="hidden md:flex p-2 text-slate-500 hover:text-slate-900 transition-colors relative"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                            </button>

                            {/* User Menu - Desktop & Mobile */}
                            <Dropdown>
                                <Button
                                    isIconOnly
                                    variant="ghost"
                                    className="text-slate-500 hover:text-slate-900"
                                    aria-label="User menu"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                                <Dropdown.Popover>
                                    <Dropdown.Menu
                                        onAction={async (key) => {
                                            if (key === "signout") {
                                                await signOutUser();
                                            } else if (key === "profile") {
                                                router.push("/me");
                                            } else if (
                                                key === "debug-refresh"
                                            ) {
                                                await handleDebugRefreshToken();
                                            }
                                        }}
                                    >
                                        <Dropdown.Item
                                            id="profile"
                                            textValue="Profile"
                                        >
                                            <Label>Profile</Label>
                                        </Dropdown.Item>
                                        {/* DEBUG: Refresh Token - Temporary */}
                                        <Dropdown.Item
                                            id="debug-refresh"
                                            textValue="Debug: Refresh Token"
                                        >
                                            <div className="flex items-center gap-2">
                                                <RefreshCw className="w-4 h-4" />
                                                <Label>
                                                    Debug: Refresh Token
                                                </Label>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id="signout"
                                            textValue="Sign Out"
                                            variant="danger"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut className="w-4 h-4" />
                                                <Label>Sign Out</Label>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Row 2: Navigation Tabs - Desktop Only */}
                    {activeKey !== null && (
                        <div className="hidden md:block">
                            {mounted ? (
                                <Tabs
                                    key={pathname} // Force re-render when pathname changes
                                    selectedKey={activeKey}
                                    onSelectionChange={(key) =>
                                        handleTabChange(key as string)
                                    }
                                    hideSeparator
                                    className="w-full"
                                >
                                    <Tabs.ListContainer>
                                        <Tabs.List
                                            aria-label="Navigation"
                                            className="!bg-transparent !p-0 gap-1"
                                        >
                                            {navItems.map((item) => {
                                                const isToday =
                                                    item.href === "/today";
                                                const showIndicator =
                                                    isToday && hasNewBlessings;
                                                return (
                                                    <Tabs.Tab
                                                        key={item.href.replace(
                                                            "/",
                                                            ""
                                                        )}
                                                        id={item.href.replace(
                                                            "/",
                                                            ""
                                                        )}
                                                        className="!h-auto !w-auto !rounded-md !bg-transparent px-4 py-3 text-sm font-medium text-slate-500 data-[selected=true]:text-slate-900 relative"
                                                    >
                                                        {item.label}
                                                        {showIndicator && (
                                                            <span className="absolute -top-0 -right-0 min-w-[18px] h-[18px] flex items-center justify-center px-1.5 bg-amber-500 text-white text-[10px] font-inter font-semibold rounded-full">
                                                                {activeBlessingsCount >
                                                                9
                                                                    ? "9+"
                                                                    : activeBlessingsCount}
                                                            </span>
                                                        )}
                                                        <Tabs.Indicator className="!bg-slate-900 !rounded-none !h-0.5 !bottom-0 !top-auto" />
                                                    </Tabs.Tab>
                                                );
                                            })}
                                        </Tabs.List>
                                    </Tabs.ListContainer>
                                </Tabs>
                            ) : (
                                // Placeholder to prevent layout shift during mount
                                <div className="h-12 flex items-center gap-1">
                                    {navItems.map((item) => (
                                        <div
                                            key={item.href.replace("/", "")}
                                            className="px-4 py-3 text-sm font-medium text-slate-500"
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile: Bottom Navigation Footer - Outside header nav */}
            {/* Hide on report detail pages (they use ReportNavigation instead) and marketing pages */}
            {!pathname.match(/^\/me\/[^/]+$/) &&
                !pathname.match(/^\/compatibility\/[^/]+$/) &&
                pathname !== "/pricing" && (
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
                        <div className="flex items-center justify-around h-16">
                            {navItems.map((item) => {
                                const isActive =
                                    pathname === "/"
                                        ? item.href === "/today"
                                        : pathname.startsWith(item.href);
                                const isToday = item.href === "/today";
                                const showIndicator =
                                    isToday && hasNewBlessings;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                    flex flex-col items-center justify-center gap-1 flex-1 h-full
                                    transition-colors text-xs font-medium relative
                                    ${
                                        isActive
                                            ? "text-slate-900"
                                            : "text-slate-500"
                                    }
                                `}
                                    >
                                        {item.label}
                                        {showIndicator && (
                                            <span className="font-inter absolute top-2 right-4 min-w-[16px] h-[16px] flex items-center justify-center px-1 bg-amber-500 text-white text-[9px] font-semibold rounded-full">
                                                {activeBlessingsCount > 9
                                                    ? "9+"
                                                    : activeBlessingsCount}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                )}
        </header>
    );
}
