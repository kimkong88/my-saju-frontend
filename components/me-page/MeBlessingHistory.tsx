"use client";

import { useState, useEffect } from "react";
import { Heart, Lock, Sparkles, Clock, UserPlus, Ban } from "lucide-react";
import { Modal } from "@heroui/react";
import { toast } from "sonner";
import { addFriend } from "@/app/actions/friendAction";
import type { RelationshipType } from "@/types/friend";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface ReceivedBlessing {
    id: string;
    fromName: string;
    fromElement?: string; // For avatar styling
    fromIdentity?: {
        code?: string;
        element?: string;
        title?: string;
    };
    fromRarity?: {
        oneIn?: number;
    };
    personalMessage?: string;
    sentAt: string; // ISO string
    expiresAt: string; // ISO string
}

interface MeBlessingHistoryProps {
    totalCount: number; // Total blessings received (including expired)
    activeBlessings?: ReceivedBlessing[]; // Active blessings (within 24h) - visible to all users
    blessings?: ReceivedBlessing[]; // Full history (premium only)
    isPremium?: boolean;
}

// Helper functions (same as FriendCard and TodayReceivedBlessings)
function getElementEmoji(element: string | undefined): string {
    if (!element) return "✨";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    }
}

/**
 * Simple countdown hook for hours/minutes (24h expiration)
 */
function useBlessingCountdown(expiresAt: string) {
    const [remaining, setRemaining] = useState({ hours: 0, minutes: 0 });
    const [endDate] = useState(() => new Date(expiresAt));

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = endDate.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining({ hours: 0, minutes: 0 });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setRemaining({
                hours: Math.max(0, hours),
                minutes: Math.max(0, minutes),
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [endDate]);

    return remaining;
}

function formatBlessingTime(remaining: {
    hours: number;
    minutes: number;
}): string {
    if (remaining.hours === 0 && remaining.minutes === 0) {
        return "expired";
    }
    if (remaining.hours > 0) {
        return `${remaining.hours}h ${remaining.minutes}m left`;
    }
    return `${remaining.minutes}m left`;
}

/**
 * Check if blessing is still active (not expired)
 */
function isActive(blessing: ReceivedBlessing): boolean {
    const now = new Date();
    const expiresAt = new Date(blessing.expiresAt);
    return expiresAt.getTime() > now.getTime();
}

/**
 * Individual blessing card component (needed to use hooks)
 */
function BlessingCard({
    blessing,
    isPremium,
    onClick,
}: {
    blessing: ReceivedBlessing;
    isPremium: boolean;
    onClick: () => void;
}) {
    const hasMessage = !!blessing.personalMessage;
    const active = isActive(blessing);
    const remaining = useBlessingCountdown(blessing.expiresAt);
    const timeText = formatBlessingTime(remaining);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasMessage = !!blessing.personalMessage;

    return (
        <div
            onClick={onClick}
            className="bg-white border border-slate-200 rounded-sm p-4 md:p-6 group hover:border-slate-900 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
            {/* Row 1: Avatar + Name + Metadata + Timestamp (same row) */}
            <div className="flex items-start gap-3 mb-3">
                {/* Avatar - Same as mobile friend card */}
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 border-slate-900 flex-shrink-0"
                    style={getElementBgStyle(
                        blessing.fromElement || blessing.fromIdentity?.element
                    )}
                >
                    {getElementEmoji(
                        blessing.fromElement || blessing.fromIdentity?.element
                    )}
                </div>

                {/* Name and Identity - Same layout as mobile friend card */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-slate-900 mb-1 line-clamp-2">
                        {blessing.fromName}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                        {blessing.fromIdentity?.code && (
                            <span className="text-xs text-slate-500">
                                {blessing.fromIdentity.code}
                            </span>
                        )}
                        {blessing.fromRarity?.oneIn && (
                            <>
                                {blessing.fromIdentity?.code && (
                                    <span className="text-xs text-slate-500">
                                        •
                                    </span>
                                )}
                                <span className="text-xs text-slate-500">
                                    1 in{" "}
                                    {blessing.fromRarity.oneIn.toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Time remaining - for active blessings (free users) - top aligned */}
                {active && !isPremium && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0 pt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{timeText}</span>
                    </div>
                )}
            </div>

            {/* Row 2: Message (separate) */}
            <div className="pl-[68px]">
                <p className="text-sm text-slate-700 italic leading-relaxed line-clamp-3">
                    &ldquo;{blessing.personalMessage || "Have a good day"}
                    &rdquo;
                </p>
            </div>
        </div>
    );
}

export default function MeBlessingHistory({
    totalCount,
    activeBlessings = [],
    blessings = [],
    isPremium = false,
}: MeBlessingHistoryProps) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [selectedBlessing, setSelectedBlessing] =
        useState<ReceivedBlessing | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);

    // For premium users, use full history; for free users, show active blessings
    const displayedBlessings = isPremium ? blessings : activeBlessings;
    const expiredCount =
        totalCount - (isPremium ? blessings.length : activeBlessings.length);

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        setSubscriptionModalOpen(false);
    };

    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleViewPast = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
        // TODO: For premium users, could navigate to full history page or expand view
    };

    const handleBlessingClick = (blessing: ReceivedBlessing) => {
        setSelectedBlessing(blessing);
        setIsModalOpen(true);
    };

    // Don't show section if no blessings received
    if (totalCount === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 border-t border-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                            Blessings You&apos;ve Received
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 max-w-3xl">
                            {isPremium
                                ? "All the kindness and messages people have sent you, saved forever."
                                : activeBlessings.length > 0
                                ? `You have ${
                                      activeBlessings.length
                                  } active blessing${
                                      activeBlessings.length > 1 ? "s" : ""
                                  } right now. You've received ${totalCount} blessing${
                                      totalCount > 1 ? "s" : ""
                                  } in total.`
                                : `You've received ${totalCount} blessing${
                                      totalCount > 1 ? "s" : ""
                                  } in total.`}
                        </p>
                    </div>
                    {expiredCount > 0 && (
                        <button
                            onClick={handleViewPast}
                            className="flex-shrink-0 text-sm font-medium text-slate-900 underline hover:text-slate-700 transition-colors self-start sm:self-auto"
                        >
                            View Past Blessings
                        </button>
                    )}
                </div>

                {/* Cards Grid - Similar to Special Traits */}
                {displayedBlessings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {displayedBlessings.map((blessing) => (
                            <BlessingCard
                                key={blessing.id}
                                blessing={blessing}
                                isPremium={isPremium}
                                onClick={() => handleBlessingClick(blessing)}
                            />
                        ))}

                        {/* Unlock Card - Appended at the end for free users */}
                        {!isPremium && expiredCount > 0 && (
                            <button
                                onClick={handleUnlock}
                                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 flex flex-col group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-xl transition-all">
                                        <span className="group-hover:hidden">
                                            🔒
                                        </span>
                                        <span className="hidden group-hover:inline">
                                            🔓
                                        </span>
                                    </div>
                                    <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                </div>

                                <h4 className="text-base font-medium text-white tracking-tight mb-1.5">
                                    Preserve Your Blessing Memories
                                </h4>

                                <p className="text-xs text-white/80 leading-relaxed mb-2.5">
                                    You&apos;ve received{" "}
                                    <span className="font-semibold text-white">
                                        {totalCount} blessing
                                        {totalCount > 1 ? "s" : ""}
                                    </span>{" "}
                                    in total. Upgrade to see your full blessing
                                    history and keep all your messages forever.
                                </p>

                                <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90 group-hover:text-white group-hover:gap-3 transition-all mt-auto">
                                    Unlock Blessing History
                                    <Lock className="w-3.5 h-3.5 group-hover:hidden" />
                                    <Sparkles className="w-3.5 h-3.5 hidden group-hover:inline" />
                                </div>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>
                            {isPremium
                                ? "No blessing history yet."
                                : "No active blessings right now."}
                        </p>
                    </div>
                )}
            </div>

            {/* Subscription Modal */}
            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
                onSubscribe={handleSubscribe}
            />

            {/* Blessing Message Modal */}
            {selectedBlessing && (
                <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Modal.Backdrop variant="blur" className="z-100">
                        <Modal.Container size="lg">
                            <Modal.Dialog className="p-6 md:p-8">
                                <Modal.CloseTrigger />
                                <Modal.Header className="pb-6">
                                    {/* Sender Info with Avatar */}
                                    <div className="flex items-start gap-4 mb-4">
                                        {/* Avatar */}
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                            style={getElementBgStyle(
                                                selectedBlessing.fromElement ||
                                                    selectedBlessing
                                                        .fromIdentity?.element
                                            )}
                                        >
                                            {getElementEmoji(
                                                selectedBlessing.fromElement ||
                                                    selectedBlessing
                                                        .fromIdentity?.element
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Modal.Heading className="text-xl md:text-2xl font-serif font-semibold text-slate-900 mb-2">
                                                Blessing from{" "}
                                                {selectedBlessing.fromName}
                                            </Modal.Heading>
                                            {/* Identity Code - Inline, subtle */}
                                            {selectedBlessing.fromIdentity
                                                ?.code && (
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <span>
                                                        {
                                                            selectedBlessing
                                                                .fromIdentity
                                                                .code
                                                        }
                                                    </span>
                                                    {selectedBlessing.fromRarity
                                                        ?.oneIn && (
                                                        <>
                                                            <span>•</span>
                                                            <span>
                                                                1 in{" "}
                                                                {selectedBlessing.fromRarity.oneIn.toLocaleString()}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Modal.Header>
                                <Modal.Body className="py-0">
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                            Personal Message
                                        </p>
                                        <div className="bg-slate-50 rounded-sm p-5 md:p-6 max-h-[300px] overflow-y-auto">
                                            <p className="text-base text-slate-900 leading-relaxed whitespace-pre-wrap italic">
                                                &ldquo;
                                                {selectedBlessing.personalMessage ||
                                                    "Have a good day"}
                                                &rdquo;
                                            </p>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="pt-6 border-t border-slate-200">
                                    <div className="flex items-center justify-between w-full gap-3">
                                        {/* Block User - Destructive action */}
                                        <button
                                            onClick={async () => {
                                                if (
                                                    !confirm(
                                                        `Block ${selectedBlessing.fromName}? They won't be able to send you blessings or interact with you.`
                                                    )
                                                ) {
                                                    return;
                                                }
                                                setIsBlocking(true);
                                                try {
                                                    // TODO: Implement block user API call
                                                    // await blockUser(selectedBlessing.fromIdentity?.code);
                                                    toast.success(
                                                        "User blocked successfully"
                                                    );
                                                    setIsModalOpen(false);
                                                } catch (error) {
                                                    const err =
                                                        error instanceof Error
                                                            ? error
                                                            : new Error(
                                                                  "Failed to block user"
                                                              );
                                                    toast.error(err.message);
                                                } finally {
                                                    setIsBlocking(false);
                                                }
                                            }}
                                            disabled={
                                                isBlocking || isAddingFriend
                                            }
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Ban className="w-4 h-4" />
                                            Block User
                                        </button>

                                        {/* Add Friend - Only show if not already a friend and has code */}
                                        {selectedBlessing.fromIdentity
                                            ?.code && (
                                            <button
                                                onClick={async () => {
                                                    if (
                                                        !selectedBlessing
                                                            .fromIdentity?.code
                                                    )
                                                        return;

                                                    setIsAddingFriend(true);
                                                    try {
                                                        await addFriend({
                                                            code: selectedBlessing
                                                                .fromIdentity
                                                                .code,
                                                            relationship:
                                                                "friend" as RelationshipType,
                                                        });
                                                        toast.success(
                                                            `${selectedBlessing.fromName} added as friend`
                                                        );
                                                        setIsModalOpen(false);
                                                    } catch (error) {
                                                        const err =
                                                            error instanceof
                                                            Error
                                                                ? error
                                                                : new Error(
                                                                      "Failed to add friend"
                                                                  );
                                                        toast.error(
                                                            err.message
                                                        );
                                                    } finally {
                                                        setIsAddingFriend(
                                                            false
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    isAddingFriend || isBlocking
                                                }
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                {isAddingFriend
                                                    ? "Adding..."
                                                    : "Add Friend"}
                                            </button>
                                        )}
                                    </div>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            )}
        </section>
    );
}
