import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "PulseMap - Beyond Astrology",
    description:
        "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
        apple: "/icon.svg",
    },
    openGraph: {
        title: "PulseMap - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations. Beyond astrology—find the data behind who you are.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "PulseMap - Beyond Astrology",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PulseMap - Beyond Astrology",
        description:
            "Discover your unique personality signature from 10.3 million possible combinations.",
        images: ["/opengraph-image"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${libre.variable} ${inter.variable} antialiased bg-white text-slate-900 overflow-x-hidden`}
            >
                <Header />
                <div
                    className="fixed inset-0 z-50 pointer-events-none opacity-[0.05]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
                {children}

                <Footer />
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
