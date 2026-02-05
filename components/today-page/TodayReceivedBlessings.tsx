"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Clock, UserPlus, Ban } from "lucide-react";
import { Modal } from "@heroui/react";
import { addFriend } from "@/app/actions/friendAction";
import { toast } from "sonner";
import type { RelationshipType } from "@/types/friend";

interface ReceivedBlessing {
    id: string;
    fromName: string;
    fromElement?: string; // For avatar styling
    fromCode?: string; // Sender's user code
    isFriend?: boolean; // Whether sender is already a friend
    blessingEmoji?: string;
    blessingName?: string;
    blessingDescription?: string;
    personalMessage?: string;
    sentAt: string; // ISO string
    expiresAt: string; // ISO string - 24h from sentAt
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

interface TodayReceivedBlessingsProps {
    blessings: ReceivedBlessing[];
}

/**
 * Individual blessing card component (needed to use hooks)
 */
function BlessingCard({
    blessing,
    onClick,
}: {
    blessing: ReceivedBlessing;
    onClick: () => void;
}) {
    const hasMessage = !!blessing.personalMessage;
    const remaining = useBlessingCountdown(blessing.expiresAt);
    const timeText = formatBlessingTime(remaining);

    return (
        <div
            onClick={onClick}
            className={`flex-shrink-0 w-64 md:w-72 ${
                hasMessage
                    ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
            } border rounded-sm p-4 transition-all ${
                hasMessage ? "cursor-pointer" : "cursor-default"
            }`}
        >
            <div className="flex items-center gap-3">
                {/* Avatar - Same style as mobile friend card */}
                <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-slate-900"
                    style={getElementBgStyle(blessing.fromElement)}
                >
                    {getElementEmoji(blessing.fromElement)}
                </div>

                <div className="flex-1 min-w-0">
                    <p
                        className={`text-sm font-medium ${
                            hasMessage ? "text-amber-900" : "text-slate-900"
                        }`}
                    >
                        {blessing.fromName}
                    </p>
                    <p
                        className={`text-xs mt-0.5 ${
                            hasMessage ? "text-amber-700" : "text-slate-600"
                        }`}
                    >
                        has sent you a blessing
                    </p>
                    <div
                        className={`flex items-center gap-1.5 mt-1.5 text-xs ${
                            hasMessage ? "text-amber-600" : "text-slate-500"
                        }`}
                    >
                        <Clock className="w-3 h-3" />
                        <span>{timeText}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper functions (same as FriendCard)
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

export default function TodayReceivedBlessings({
    blessings,
}: TodayReceivedBlessingsProps) {
    const [selectedBlessing, setSelectedBlessing] =
        useState<ReceivedBlessing | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        slidesToScroll: 1,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (!blessings || blessings.length === 0) {
        return null;
    }

    const handleBlessingClick = (blessing: ReceivedBlessing) => {
        if (blessing.personalMessage) {
            setSelectedBlessing(blessing);
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className="mb-6">
                {/* Embla Carousel with Navigation */}
                <div className="relative">
                    {/* Previous Button - Desktop Only */}
                    {blessings.length > 1 && (
                        <button
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous blessings"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                    )}

                    {/* Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-3 md:gap-4">
                            {blessings.map((blessing) => (
                                <BlessingCard
                                    key={blessing.id}
                                    blessing={blessing}
                                    onClick={() =>
                                        handleBlessingClick(blessing)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    {/* Next Button - Desktop Only */}
                    {blessings.length > 1 && (
                        <button
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Next blessings"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-700" />
                        </button>
                    )}
                </div>
            </div>

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
                                                selectedBlessing.fromElement
                                            )}
                                        >
                                            {getElementEmoji(
                                                selectedBlessing.fromElement
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Modal.Heading className="text-xl md:text-2xl font-serif font-semibold text-slate-900 mb-2">
                                                Blessing from{" "}
                                                {selectedBlessing.fromName}
                                            </Modal.Heading>
                                            {/* Blessing Type - Inline, subtle */}
                                            {selectedBlessing.blessingName && (
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <span>
                                                        {selectedBlessing.blessingEmoji ||
                                                            "✨"}
                                                    </span>
                                                    <span className="font-medium">
                                                        {
                                                            selectedBlessing.blessingName
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Blessing Description - Subtle, if available */}
                                    {selectedBlessing.blessingDescription && (
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {
                                                selectedBlessing.blessingDescription
                                            }
                                        </p>
                                    )}
                                </Modal.Header>
                                <Modal.Body className="py-0">
                                    {selectedBlessing.personalMessage && (
                                        <div className="space-y-2">
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                                Personal Message
                                            </p>
                                            <div className="bg-slate-50 rounded-sm p-5 md:p-6 max-h-[300px] overflow-y-auto">
                                                <p className="text-base text-slate-900 leading-relaxed whitespace-pre-wrap">
                                                    {
                                                        selectedBlessing.personalMessage
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
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
                                                    // await blockUser(selectedBlessing.fromCode);
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

                                        {/* Add Friend - Only show if not already a friend */}
                                        {selectedBlessing.fromCode &&
                                            !selectedBlessing.isFriend && (
                                                <button
                                                    onClick={async () => {
                                                        if (
                                                            !selectedBlessing.fromCode
                                                        )
                                                            return;

                                                        setIsAddingFriend(true);
                                                        try {
                                                            await addFriend({
                                                                code: selectedBlessing.fromCode,
                                                                relationship:
                                                                    "friend" as RelationshipType,
                                                            });
                                                            toast.success(
                                                                `${selectedBlessing.fromName} added as friend`
                                                            );
                                                            // Update the blessing to reflect friend status
                                                            setSelectedBlessing(
                                                                {
                                                                    ...selectedBlessing,
                                                                    isFriend:
                                                                        true,
                                                                }
                                                            );
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
                                                        isAddingFriend ||
                                                        isBlocking
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
        </>
    );
}
