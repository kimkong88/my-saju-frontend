"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { getFriends } from "@/app/actions/friendAction";
import { checkBlessingAvailability } from "@/app/actions/blessingsAction";
import type { Friend } from "@/types/friend";
import FriendCard from "./FriendCard";
import AddFriendModal from "@/components/modals/AddFriendModal";
import Loading from "@/components/Loading";
import DailyBlessingCard from "./DailyBlessingCard";

const MAX_FRIENDS = 10;

interface FriendsPageContentProps {
    currentUserCode: string;
}

export default function FriendsPageContent({
    currentUserCode,
}: FriendsPageContentProps) {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [friendCount, setFriendCount] = useState(0);
    const [blessingAvailability, setBlessingAvailability] = useState<{
        hasBlessing: boolean;
        expiresAt?: string;
    }>({ hasBlessing: false });

    const loadBlessingAvailability = useCallback(async () => {
        try {
            const availability = await checkBlessingAvailability();
            setBlessingAvailability({
                hasBlessing: availability.availableBlessings > 0,
                expiresAt: availability.serverResetTime,
            });
        } catch {
            // On error, default to no blessing available
            setBlessingAvailability({ hasBlessing: false });
        }
    }, []);

    const loadFriends = useCallback(async () => {
        try {
            setIsLoading(true);
            const friendsList = await getFriends();
            setFriends(friendsList);
            setFriendCount(friendsList.length);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFriends();
        loadBlessingAvailability();
    }, [loadFriends, loadBlessingAvailability]);

    const handleFriendAdded = () => {
        loadFriends();
        setIsAddModalOpen(false);
    };

    const handleFriendDeleted = () => {
        loadFriends();
    };

    const handleFriendUpdated = (updatedFriend: Friend) => {
        // Update the specific friend in the list instead of reloading all
        setFriends((prevFriends) =>
            prevFriends.map((f) =>
                f.id === updatedFriend.id ? updatedFriend : f
            )
        );
    };

    const canAddMore = friendCount < MAX_FRIENDS;

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 xl:px-0 py-8 md:py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 md:mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-slate-900 mb-2">
                        Compatibility
                    </h1>
                    <p className="text-sm md:text-base text-slate-600">
                        Track daily compatibility with people in your life
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (canAddMore) {
                            setIsAddModalOpen(true);
                        }
                    }}
                    disabled={!canAddMore}
                    className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
                >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Add Person</span>
                </button>
            </div>

            {/* Daily Blessing Card */}
            <DailyBlessingCard
                hasBlessing={blessingAvailability.hasBlessing}
                expiresAt={blessingAvailability.expiresAt}
            />

            {/* Person Count & Limit Warning */}
            {friendCount > 0 && (
                <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>
                            {friendCount} / {MAX_FRIENDS} people
                        </span>
                        {friendCount >= MAX_FRIENDS - 2 && (
                            <span className="text-amber-600 font-medium">
                                {friendCount === MAX_FRIENDS
                                    ? "• Limit reached"
                                    : `• ${
                                          MAX_FRIENDS - friendCount
                                      } slots remaining`}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Friends List - Vertical Stack */}
            {friends.length > 0 ? (
                <div className="space-y-4 md:space-y-6">
                    {friends.map((friend) => (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                            currentUserCode={currentUserCode}
                            onDeleted={handleFriendDeleted}
                            onUpdated={handleFriendUpdated}
                            hasBlessing={blessingAvailability.hasBlessing}
                            onBlessingSent={loadBlessingAvailability}
                            availableBlessings={(() => {
                                // Mockup data - replace with real API call later
                                // These would be the daily available blessing templates
                                return [
                                    {
                                        id: "harmony",
                                        name: "Harmony's Embrace",
                                        description:
                                            "Strengthen emotional bonds and create moments of deeper understanding with someone special.",
                                        emoji: "🤝",
                                    },
                                    {
                                        id: "strength",
                                        name: "Inner Strength",
                                        description:
                                            "Send courage and resilience to help them overcome challenges and stay strong.",
                                        emoji: "💪",
                                    },
                                    {
                                        id: "success",
                                        name: "Path to Success",
                                        description:
                                            "Wish them success in their endeavors and help clear the way for positive outcomes.",
                                        emoji: "✨",
                                    },
                                    {
                                        id: "peace",
                                        name: "Peaceful Heart",
                                        description:
                                            "Bring calm and tranquility to their day, helping them find balance and inner peace.",
                                        emoji: "🕊️",
                                    },
                                    {
                                        id: "joy",
                                        name: "Radiant Joy",
                                        description:
                                            "Spread happiness and light, bringing smiles and positive energy to their life.",
                                        emoji: "😊",
                                    },
                                ];
                            })()}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    onAddClick={() => {
                        if (canAddMore) {
                            setIsAddModalOpen(true);
                        }
                    }}
                    canAddMore={canAddMore}
                />
            )}

            {/* Add Friend Modal */}
            <AddFriendModal
                isOpen={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSuccess={handleFriendAdded}
                currentFriendCount={friendCount}
                maxFriends={MAX_FRIENDS}
                currentUserCode={currentUserCode}
            />
        </div>
    );
}

function EmptyState({
    onAddClick,
    canAddMore = true,
}: {
    onAddClick: () => void;
    canAddMore?: boolean;
}) {
    return (
        <div className="text-center py-16 md:py-24">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">👥</div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-3">
                    Start Tracking Compatibility
                </h2>
                <p className="text-base md:text-lg text-slate-600 mb-8">
                    Add people to track daily compatibility and discover
                    insights about your relationships.
                </p>
                <button
                    onClick={onAddClick}
                    disabled={!canAddMore}
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Your First Person</span>
                </button>
            </div>
        </div>
    );
}
