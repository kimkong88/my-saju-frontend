import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MySaju - Decode Your Time DNA",
    description: "MySaju is a first temporal ...",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased bg-white text-slate-900 overflow-x-hidden`}
            >
                <Header />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
