import { getReport } from "@/app/actions/reportAction";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

async function loadFont() {
    try {
        const cssResponse = await fetch(
            "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
            { headers: { "User-Agent": "Mozilla/5.0" } }
        );
        if (!cssResponse.ok) return undefined;

        const cssText = await cssResponse.text();
        const urlMatch = cssText.match(
            /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/
        );
        if (!urlMatch?.[1]) return undefined;

        const fontResponse = await fetch(urlMatch[1], {
            headers: { Referer: "https://fonts.googleapis.com/" },
        });
        return fontResponse.ok ? await fontResponse.arrayBuffer() : undefined;
    } catch {
        return undefined;
    }
}

export default async function Image({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    const report = await getReport(code);

    if (!report || report.type !== "personal") {
        notFound();
    }

    const fontData = await loadFont();

    const identity = report.identity;
    const rarity = report.rarity;
    const traits = report.specialTraits.slice(0, 2);

    function getElementEmoji(element: string | undefined): string {
        if (!element) return "";

        const elementLower = element.toLowerCase();
        if (elementLower.includes("fire")) return "🔥";
        if (elementLower.includes("earth")) return "🌍";
        if (elementLower.includes("metal")) return "⚪";
        if (elementLower.includes("water")) return "💧";
        if (elementLower.includes("wood")) return "🌳";

        return "";
    }

    function getElementBgColor(element: string | undefined): string {
        const baseColor = "#0f172a";

        if (!element) return baseColor;

        const elementLower = element.toLowerCase();

        // For OG images, use subtle tinted base colors instead of complex gradients
        // Next.js ImageResponse doesn't support multi-layer gradients well
        if (elementLower.includes("fire")) {
            return "#1a0f0f"; // Dark base with subtle red tint
        }
        if (elementLower.includes("earth")) {
            return "#1a1510"; // Dark base with subtle brown tint
        }
        if (elementLower.includes("metal")) {
            return baseColor; // Keep neutral for metal
        }
        if (elementLower.includes("water")) {
            return "#0f141a"; // Dark base with subtle blue tint
        }
        if (elementLower.includes("wood")) {
            return "#0f1a0f"; // Dark base with subtle green tint
        }

        return baseColor;
    }

    const bgColor = getElementBgColor(identity.element);

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: bgColor,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "60px",
                    color: "white",
                    fontFamily: fontData
                        ? '"Libre Baskerville"'
                        : "Georgia, serif",
                    position: "relative",
                }}
            >
                {/* Top: Code */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "20px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "rgba(255, 255, 255, 0.8)",
                        marginBottom: "20px",
                    }}
                >
                    {getElementEmoji(identity.element) && (
                        <span style={{ fontSize: "18px" }}>
                            {getElementEmoji(identity.element)}
                        </span>
                    )}
                    <span>{identity.code}</span>
                </div>

                {/* Main: Title */}
                <div
                    style={{
                        display: "flex",
                        fontSize: "88px",
                        fontWeight: "700",
                        marginBottom: "20px",
                        lineHeight: "1.1",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {identity.title}
                </div>

                {/* Rarity */}
                <div
                    style={{
                        display: "flex",
                        fontSize: "36px",
                        color: "rgba(255, 255, 255, 0.9)",
                        marginBottom: "0",
                        fontWeight: "400",
                        letterSpacing: "-0.01em",
                    }}
                >
                    1 in {rarity.overall.oneIn.toLocaleString()}
                </div>

                {/* Spacer to push traits down */}
                <div style={{ flex: 1, display: "flex" }}></div>

                {/* Bottom section: Traits and Brand aligned */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "32px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {/* Traits */}
                    {traits.length > 0 ? (
                        <div
                            style={{
                                display: "flex",
                                gap: "32px",
                                fontSize: "24px",
                                color: "rgba(255, 255, 255, 0.7)",
                            }}
                        >
                            {traits.map(
                                (
                                    trait: { emoji: string; name: string },
                                    idx: number
                                ) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <span>{trait.emoji}</span>
                                        <span>{trait.name}</span>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div style={{ display: "none" }}></div>
                    )}

                    {/* Brand */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            fontSize: "20px",
                            fontWeight: "700",
                        }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 48 48"
                            fill="none"
                            style={{
                                display: "flex",
                            }}
                        >
                            {/* Outer rounded square - white background for dark OG image */}
                            <rect width="48" height="48" rx="12" fill="white" />
                            {/* Outer circle - dark for contrast */}
                            <circle
                                cx="24"
                                cy="24"
                                r="12"
                                stroke="#0f172a"
                                strokeWidth="2.5"
                                fill="none"
                            />
                            {/* Filled center dot - dark */}
                            <circle cx="24" cy="24" r="6" fill="#0f172a" />
                        </svg>
                        <span style={{ letterSpacing: "-0.01em" }}>
                            PulseMap
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            ...(fontData && {
                fonts: [
                    {
                        name: "Libre Baskerville",
                        data: fontData,
                        style: "normal",
                    },
                ],
            }),
        }
    );
}
