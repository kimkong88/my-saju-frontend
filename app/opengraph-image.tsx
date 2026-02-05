import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";
export const alt = "Unstar - Beyond Astrology";
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
        const urlMatch = cssText.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
        if (!urlMatch?.[1]) return undefined;
        
        const fontResponse = await fetch(urlMatch[1], {
            headers: { "Referer": "https://fonts.googleapis.com/" },
        });
        return fontResponse.ok ? await fontResponse.arrayBuffer() : undefined;
    } catch {
        return undefined;
    }
}

export default async function Image() {
    const fontData = await loadFont();

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: "white",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px",
                    fontFamily: fontData ? '"Libre Baskerville"' : "Georgia, serif",
                }}
            >
                {/* Logo Area */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "40px",
                    }}
                >
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        style={{
                            display: "flex",
                        }}
                    >
                        {/* Outer rounded square */}
                        <rect width="48" height="48" rx="12" fill="#0f172a" />
                        {/* Outer circle */}
                        <circle
                            cx="24"
                            cy="24"
                            r="12"
                            stroke="white"
                            strokeWidth="2.5"
                            fill="none"
                        />
                        {/* Filled center dot */}
                        <circle cx="24" cy="24" r="6" fill="white" />
                    </svg>
                    <span
                        style={{
                            fontSize: "48px",
                            fontWeight: "700",
                            color: "#0f172a",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Unstar
                    </span>
                </div>

                {/* Main Text */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "72px",
                            fontWeight: "700",
                            color: "#0f172a",
                            marginBottom: "20px",
                            lineHeight: "1.1",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Beyond Astrology.
                    </div>
                    <div
                        style={{
                            fontSize: "36px",
                            color: "#64748b",
                            fontWeight: "400",
                            fontStyle: "italic",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Find the Data Behind Who You Are.
                    </div>
                </div>

                {/* Subtext */}
                <div
                    style={{
                        fontSize: "24px",
                        color: "#475569",
                        textAlign: "center",
                        maxWidth: "800px",
                        lineHeight: "1.5",
                    }}
                >
                    Discover your unique personality signature from 10.3 million
                    possible combinations
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

