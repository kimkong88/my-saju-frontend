"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const appRoutes = ["/today", "/forecast", "/compatibility", "/me"];

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAppRoute = appRoutes.some((route) => pathname.startsWith(route));

    return (
        <>
            {!isAppRoute && <Header />}
            {children}
            {!isAppRoute && <Footer />}
        </>
    );
}

