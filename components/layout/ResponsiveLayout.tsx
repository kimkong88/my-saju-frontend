import { cn } from "@heroui/react";

export default function ResponsiveLayout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("max-w-7xl mx-auto", className)}>{children}</div>;
}
