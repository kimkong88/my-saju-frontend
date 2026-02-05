"use client";

interface MeIdentityHeaderProps {
    identity: {
        code: string;
        title: string;
        element: string;
        polarity: "Yin" | "Yang";
    };
    rarity?: {
        oneIn: number;
    };
    userCode?: string; // User code for sharing
}

function getElementEmoji(element: string | undefined): string {
    if (!element) return "";
    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";
    return "✨";
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    // Subtle radial gradient overlays with dark base (matching ShareSection)
    if (elementLower.includes("fire")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(234, 88, 12, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(148, 163, 184, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(203, 213, 225, 0.08) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }

    return { backgroundColor: baseColor };
}

export default function MeIdentityHeader({
    identity,
    rarity,
    userCode,
}: MeIdentityHeaderProps) {
    return (
        <section className="pt-12 md:pt-20 pb-12 md:pb-20 px-6 xl:px-0 border-b border-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Share Card Inspired Design */}
                <div
                    className="text-white p-8 md:p-10 border-2 border-slate-900"
                    style={getElementBgStyle(identity?.element)}
                >
                    <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                        {getElementEmoji(identity?.element) && (
                            <span className="text-sm">
                                {getElementEmoji(identity?.element)}
                            </span>
                        )}
                        <span>{identity.code}</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-3">
                        {identity.title}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        {rarity && (
                            <div className="text-base md:text-lg text-white/80">
                                1 in {rarity.oneIn.toLocaleString()}
                            </div>
                        )}
                        {userCode && (
                            <>
                                {rarity && (
                                    <span className="text-white/40">•</span>
                                )}
                                <div className="text-sm text-white/70">
                                    Your Code: <span className="font-semibold text-white">{userCode}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

