"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Trash2,
    Share2,
    ChevronDown,
    Check,
    Sparkles,
    MoreVertical,
} from "lucide-react";
import { Dropdown } from "@heroui/react";
import type {
    Friend,
    RelationshipType,
    UpdateFriendData,
} from "@/types/friend";
import { deleteFriend, updateFriend } from "@/app/actions/friendAction";
import { sendBlessing } from "@/app/actions/blessingsAction";
import DeleteFriendModal from "@/components/modals/DeleteFriendModal";
import SendBlessingModal from "@/components/modals/SendBlessingModal";
import { toast } from "sonner";

const RELATIONSHIP_OPTIONS: { value: RelationshipType; label: string }[] = [
    { value: "romantic", label: "Romantic" },
    { value: "family", label: "Family" },
    { value: "friend", label: "Friend" },
    { value: "colleague", label: "Colleague" },
    { value: "other", label: "Other" },
];

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
function getRelationshipBadgeStyle(relationshipType: RelationshipType): string {
    switch (relationshipType) {
        case "romantic":
            return "bg-pink-100 text-pink-700 border-pink-200";
        case "family":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "friend":
            return "bg-green-100 text-green-700 border-green-200";
        case "colleague":
            return "bg-purple-100 text-purple-700 border-purple-200";
        case "other":
            return "bg-slate-100 text-slate-700 border-slate-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
}

function getRelationshipLabel(
    relationshipType: RelationshipType,
    customLabel?: string
): string {
    if (relationshipType === "other" && customLabel) {
        return customLabel;
    }
    return relationshipType.charAt(0).toUpperCase() + relationshipType.slice(1);
}

interface FriendCardProps {
    friend: Friend;
    currentUserCode: string;
    onDeleted: () => void;
    onUpdated: (updatedFriend: Friend) => void;
    hasBlessing?: boolean; // Whether user has a blessing available
    availableBlessings?: Array<{
        id: string;
        name: string;
        description: string;
        emoji: string;
    }>; // Available blessing templates
    onBlessingSent?: () => void; // Callback to refresh blessing availability
}

export default function FriendCard({
    friend,
    currentUserCode,
    onDeleted,
    onUpdated,
    hasBlessing = false,
    availableBlessings = [],
    onBlessingSent,
}: FriendCardProps) {
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEllipsisOpenMobile, setIsEllipsisOpenMobile] = useState(false);
    const [isEllipsisOpenDesktop, setIsEllipsisOpenDesktop] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingRelationship, setIsUpdatingRelationship] = useState(false);
    const [isRelationshipDropdownOpen, setIsRelationshipDropdownOpen] =
        useState(false);
    const [isBlessingModalOpen, setIsBlessingModalOpen] = useState(false);
    const [isCheckingCompatibility, setIsCheckingCompatibility] =
        useState(false);

    // Use compatibility score from friend object (included in response)
    const compatibilityScore = friend.dailyCompatibilityScore || null;

    if (!friend.friend) {
        return null; // Don't render if friend data is missing
    }

    const { friend: friendData } = friend;

    const handleCheckCompatibility = async () => {
        try {
            setIsCheckingCompatibility(true);
            const {
                getCompatibilityReportByFriendCode,
                createCompatibilityReport,
            } = await import("@/app/actions/reportAction");

            // Check if report already exists first
            const checkResult = await getCompatibilityReportByFriendCode(
                friendData.code
            );

            if (checkResult.status === "completed" && checkResult.reportCode) {
                // Report exists! Redirect immediately
                router.push(`/compatibility/${checkResult.reportCode}`);
                return;
            }

            // Report doesn't exist or is pending - start generation
            // person1 = who I'm comparing against, person2 = me
            const result = await createCompatibilityReport({
                person1: {
                    code: friendData.code, // Who I'm comparing against
                },
                person2: {
                    code: currentUserCode, // Me
                    // When code is provided, other fields are not needed
                },
                isTeaser: false, // Full report, not teaser
            });

            // Extract report code from response (POST returns early with code)
            const reportCode =
                result.report?.code ||
                result.report?.id ||
                result.code ||
                result.id;

            // Only redirect if we have a valid report code
            if (!reportCode) {
                throw new Error("No report code returned from server");
            }

            // Redirect to compatibility result page (will show loading if not ready)
            router.push(`/compatibility/${reportCode}`);
        } catch (error) {
            console.error("Error checking compatibility:", error);

            // Extract error message
            let errorMessage = "Failed to check compatibility";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            // Show error toast
            toast.error(errorMessage);

            // Reset loading state
            setIsCheckingCompatibility(false);
        }
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/compat/${currentUserCode}/${friendData.code}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check compatibility with ${friendData.fullName}`,
                    text: `See our compatibility score: ${
                        compatibilityScore?.letterGrade || "--"
                    }`,
                    url: shareUrl,
                });
                toast.success("Shared successfully!");
            } catch (error) {
                // User cancelled or error occurred
                if ((error as Error).name !== "AbortError") {
                    // Copy to clipboard as fallback
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            // Fallback to clipboard
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Link copied to clipboard!");
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteFriend(friend.id);
            toast.success("Person removed successfully");
            setIsDeleteModalOpen(false);
            onDeleted();
        } catch (error) {
            console.error("Error deleting friend:", error);
            toast.error("Failed to remove person");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleRelationshipChange = async (
        newRelationship: RelationshipType
    ) => {
        if (newRelationship === friend.relationship) {
            setIsRelationshipDropdownOpen(false);
            return;
        }

        try {
            setIsUpdatingRelationship(true);
            // Ensure the relationship value is lowercase (defensive check)
            const relationshipValue =
                typeof newRelationship === "string"
                    ? (newRelationship.toLowerCase() as RelationshipType)
                    : newRelationship;

            const updateData: UpdateFriendData = {
                relationship: relationshipValue,
            };

            // Call updateFriend and get the updated friend object
            const updatedFriend = await updateFriend(friend.id, updateData);

            // Pass the updated friend object to parent to update state
            toast.success("Relationship updated");
            onUpdated(updatedFriend);
            setIsRelationshipDropdownOpen(false);
        } catch (error) {
            console.error("Error updating relationship:", error);

            // Convert backend error to user-friendly message
            let userMessage = "Failed to update relationship";

            if (error instanceof Error) {
                const errorMsg = error.message.toLowerCase();
                if (errorMsg.includes("relationship must be one of")) {
                    userMessage = "Invalid relationship type selected";
                } else if ("status" in error && error.status === 400) {
                    userMessage =
                        error.message || "Invalid information provided";
                } else if ("status" in error && error.status === 404) {
                    userMessage = "Friend not found";
                } else if ("status" in error && error.status === 403) {
                    userMessage =
                        "You don't have permission to perform this action";
                } else {
                    userMessage = error.message;
                }
            }

            toast.error(userMessage);
        } finally {
            setIsUpdatingRelationship(false);
        }
    };

    const getRatingFromGrade = (
        letterGrade: string
    ): {
        emoji: string;
        word: string;
        color: string;
        bgColor: string;
        borderColor: string;
    } => {
        const grade = letterGrade.charAt(0).toUpperCase();
        const modifier = letterGrade.charAt(1);

        if (grade === "A") {
            if (modifier === "+") {
                return {
                    emoji: "✨",
                    word: "Excellent",
                    color: "text-emerald-700",
                    bgColor: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                };
            }
            return {
                emoji: "💚",
                word: "Great",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-200",
            };
        }
        if (grade === "B") {
            if (modifier === "+") {
                return {
                    emoji: "👍",
                    word: "Good",
                    color: "text-amber-700",
                    bgColor: "bg-amber-50",
                    borderColor: "border-amber-200",
                };
            }
            return {
                emoji: "⚖️",
                word: "Fair",
                color: "text-amber-600",
                bgColor: "bg-amber-50",
                borderColor: "border-amber-200",
            };
        }
        if (grade === "C") {
            return {
                emoji: "⚠️",
                word: "Moderate",
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
            };
        }
        return {
            emoji: "🔴",
            word: "Challenging",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
        };
    };

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-200">
                {/* Desktop: Horizontal Layout: [Identity Card] [Content] */}
                {/* Mobile: Vertical Layout: [Avatar + Name + Identity] [Content] */}
                <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
                    {/* Mobile: Avatar + Name + Identity Bundle (SNS-style) */}
                    <div className="md:hidden flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50/50 to-white rounded-sm">
                        {/* Avatar */}
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 border-slate-900 flex-shrink-0"
                            style={getElementBgStyle(
                                friendData.identity?.element
                            )}
                        >
                            {getElementEmoji(friendData.identity?.element) ||
                                "✨"}
                        </div>
                        {/* Name and Identity */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-slate-900 mb-1">
                                {friendData.fullName}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-slate-500">
                                    {friendData.identity?.code}
                                </span>
                                {friendData.rarity && (
                                    <span className="text-xs text-slate-500">
                                        • 1 in{" "}
                                        {friendData.rarity.oneIn.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Ellipsis Menu - Mobile */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex-shrink-0 md:hidden"
                        >
                            <Dropdown
                                isOpen={isEllipsisOpenMobile}
                                onOpenChange={setIsEllipsisOpenMobile}
                            >
                                <Dropdown.Trigger>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-sm transition-colors cursor-pointer"
                                        aria-label="More options"
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }
                                        }}
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Popover className="rounded-none">
                                    <Dropdown.Menu
                                        aria-label="More options"
                                        onAction={(key) => {
                                            setIsEllipsisOpenMobile(false);
                                            // HeroUI generates keys like "react-aria-1", "react-aria-2"
                                            // First item is "share", second is "delete"
                                            const keyStr = String(key);
                                            if (
                                                keyStr.endsWith("1") ||
                                                key === "share"
                                            ) {
                                                handleShare();
                                            } else if (
                                                keyStr.endsWith("2") ||
                                                key === "delete"
                                            ) {
                                                setIsDeleteModalOpen(true);
                                            }
                                        }}
                                        className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none min-w-[140px]"
                                    >
                                        <Dropdown.Item
                                            key="share"
                                            textValue="Share"
                                            className="px-4 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer text-xs !rounded-none data-[hovered=true]:!rounded-none"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Share2 className="w-4 h-4" />
                                                <span>Share</span>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            key="delete"
                                            textValue="Remove"
                                            className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-xs !rounded-none data-[hovered=true]:!rounded-none"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Trash2 className="w-4 h-4" />
                                                <span>Remove</span>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Desktop: Full Identity Card */}
                    <div className="hidden md:block flex-shrink-0">
                        <div
                            className="text-white p-6 border-2 border-slate-900 hover:opacity-90 transition-opacity rounded-l-sm flex flex-col justify-between w-60 h-full"
                            style={getElementBgStyle(
                                friendData.identity?.element
                            )}
                        >
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                                    {getElementEmoji(
                                        friendData.identity?.element
                                    ) && (
                                        <span className="text-sm">
                                            {getElementEmoji(
                                                friendData.identity?.element
                                            )}
                                        </span>
                                    )}
                                    <span className="truncate">
                                        {friendData.identity?.code}
                                    </span>
                                </div>
                                <div className="text-lg font-bold mb-3">
                                    {friendData.identity?.title}
                                </div>
                            </div>
                            {friendData.rarity && (
                                <div className="text-base text-white/80">
                                    1 in{" "}
                                    {friendData.rarity.oneIn.toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0 flex flex-col bg-gradient-to-br from-slate-50/50 to-white rounded-sm p-4 md:p-5">
                        {/* Desktop Header: Name, Relationship, and Ellipsis Menu */}
                        <div className="hidden md:flex mb-4 items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-nowrap min-w-0 flex-1">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900 truncate">
                                    {friendData.fullName}
                                </h3>
                                {/* Relationship Dropdown - Desktop Only */}
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-shrink-0"
                                >
                                    <Dropdown
                                        isOpen={isRelationshipDropdownOpen}
                                        onOpenChange={
                                            setIsRelationshipDropdownOpen
                                        }
                                    >
                                        <Dropdown.Trigger
                                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                            isDisabled={isUpdatingRelationship}
                                        >
                                            {isUpdatingRelationship
                                                ? "Updating..."
                                                : getRelationshipLabel(
                                                      friend.relationship
                                                  )}
                                            <ChevronDown className="w-3 h-3 opacity-60" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Popover className="rounded-none">
                                            <Dropdown.Menu
                                                aria-label="Relationship type"
                                                onAction={(key) => {
                                                    if (key) {
                                                        const selectedOption =
                                                            RELATIONSHIP_OPTIONS.find(
                                                                (opt) =>
                                                                    opt.value ===
                                                                    key
                                                            );
                                                        if (selectedOption) {
                                                            handleRelationshipChange(
                                                                selectedOption.value
                                                            );
                                                        }
                                                    }
                                                }}
                                                selectedKeys={[
                                                    friend.relationship,
                                                ]}
                                                selectionMode="single"
                                                className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none min-w-[120px]"
                                            >
                                                {RELATIONSHIP_OPTIONS.map(
                                                    (option) => {
                                                        const isSelected =
                                                            option.value ===
                                                            friend.relationship;
                                                        return (
                                                            <Dropdown.Item
                                                                key={
                                                                    option.value
                                                                }
                                                                id={
                                                                    option.value
                                                                }
                                                                textValue={
                                                                    option.label
                                                                }
                                                                className="px-4 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer text-xs data-[selected=true]:bg-slate-100 data-[selected=true]:font-medium !rounded-none data-[hovered=true]:!rounded-none"
                                                            >
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span>
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </span>
                                                                    {isSelected && (
                                                                        <Check className="w-4 h-4 text-slate-900 flex-shrink-0 ml-2" />
                                                                    )}
                                                                </div>
                                                            </Dropdown.Item>
                                                        );
                                                    }
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown>
                                </div>
                            </div>
                            {/* Ellipsis Menu - Desktop Top Right */}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="hidden md:block flex-shrink-0"
                            >
                                <Dropdown
                                    isOpen={isEllipsisOpenDesktop}
                                    onOpenChange={setIsEllipsisOpenDesktop}
                                >
                                    <Dropdown.Trigger>
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-sm transition-colors cursor-pointer"
                                            aria-label="More options"
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }
                                            }}
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </div>
                                    </Dropdown.Trigger>
                                    <Dropdown.Popover className="rounded-none">
                                        <Dropdown.Menu
                                            aria-label="More options"
                                            onAction={(key) => {
                                                setIsEllipsisOpenDesktop(false);
                                                // HeroUI generates keys like "react-aria-1", "react-aria-2"
                                                // First item is "share", second is "delete"
                                                const keyStr = String(key);
                                                if (
                                                    keyStr.endsWith("1") ||
                                                    key === "share"
                                                ) {
                                                    handleShare();
                                                } else if (
                                                    keyStr.endsWith("2") ||
                                                    key === "delete"
                                                ) {
                                                    setIsDeleteModalOpen(true);
                                                }
                                            }}
                                            className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none min-w-[140px]"
                                        >
                                            <Dropdown.Item
                                                key="share"
                                                textValue="Share"
                                                className="px-4 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer text-xs !rounded-none data-[hovered=true]:!rounded-none"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Share2 className="w-4 h-4" />
                                                    <span>Share</span>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                key="delete"
                                                textValue="Remove"
                                                className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-xs !rounded-none data-[hovered=true]:!rounded-none"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Remove</span>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Compatibility Insight */}
                        {compatibilityScore?.insight &&
                            (() => {
                                const rating = getRatingFromGrade(
                                    compatibilityScore.letterGrade
                                );
                                return (
                                    <div className="mb-4 flex-1 max-w-2xl">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Today&apos;s Insight
                                            </span>
                                            <span className="text-slate-300">
                                                •
                                            </span>
                                            <span
                                                className={`text-xs font-semibold ${rating.color}`}
                                            >
                                                {rating.emoji} {rating.word}
                                            </span>
                                        </div>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            {compatibilityScore.insight}
                                        </p>
                                    </div>
                                );
                            })()}
                        {!compatibilityScore && (
                            <div className="mb-4 max-w-2xl">
                                <div className="mb-2">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Compatibility
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">
                                    Compatibility unavailable
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div
                            className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-2 pt-3 border-t border-slate-100 mt-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Primary Actions */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheckCompatibility();
                                    }}
                                    disabled={isCheckingCompatibility}
                                    className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-sm hover:border-slate-900 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Check compatibility"
                                >
                                    {isCheckingCompatibility
                                        ? "Checking..."
                                        : "Check Compatibility"}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                            hasBlessing &&
                                            availableBlessings.length > 0
                                        ) {
                                            setIsBlessingModalOpen(true);
                                        } else {
                                            toast.info(
                                                "No blessing available right now. Check back tomorrow!"
                                            );
                                        }
                                    }}
                                    disabled={
                                        !hasBlessing ||
                                        availableBlessings.length === 0
                                    }
                                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-900 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-sm hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-amber-50 disabled:hover:to-yellow-50"
                                    aria-label="Send daily blessing"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Send Blessing</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <DeleteFriendModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                friendName={friendData.fullName}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
            <SendBlessingModal
                isOpen={isBlessingModalOpen}
                onOpenChange={setIsBlessingModalOpen}
                friendName={friendData.fullName}
                availableBlessings={availableBlessings}
                onSend={async (blessingId, personalMessage) => {
                    try {
                        // Find the selected blessing template
                        const selectedBlessing = availableBlessings.find(
                            (b) => b.id === blessingId
                        );
                        if (!selectedBlessing) {
                            toast.error("Selected blessing not found");
                            return;
                        }

                        // Send the blessing
                        await sendBlessing({
                            recipientCode: friendData.code,
                            emoji: selectedBlessing.emoji,
                            name: selectedBlessing.name,
                            description: selectedBlessing.description,
                            message: personalMessage,
                        });

                        toast.success(
                            `Blessing sent to ${friendData.fullName}!`
                        );
                        setIsBlessingModalOpen(false);

                        // Refresh blessing availability after sending
                        if (onBlessingSent) {
                            onBlessingSent();
                        }
                    } catch (error) {
                        // Error message is already user-friendly from the action
                        const err =
                            error instanceof Error
                                ? error
                                : new Error("Failed to send blessing");
                        toast.error(err.message);
                    }
                }}
            />
        </>
    );
}
