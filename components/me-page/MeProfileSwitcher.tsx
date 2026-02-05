"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AddProfileModal from "@/components/modals/AddProfileModal";
import SocialConnectionModal from "@/components/modals/SocialConnectionModal";
import DeleteProfileModal from "@/components/modals/DeleteProfileModal";
import { getUsersList, switchUser, deleteUser } from "@/app/actions/userAction";
import { signInWithCredentials } from "@/app/actions/authAction";

interface Profile {
    id: string;
    name: string;
    code?: string; // Report code for navigation
    isActive?: boolean;
    isPrimary?: boolean;
}

interface MeProfileSwitcherProps {
    currentProfileId: string;
    currentProfileName?: string; // Current user's name for display
    accountId?: string | null; // Check if user has accountId
    isPremium: boolean;
    maxProfiles?: number; // Default 5
}

export default function MeProfileSwitcher({
    currentProfileId,
    currentProfileName,
    accountId,
    isPremium,
    maxProfiles = 5,
}: MeProfileSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean;
        profileId: string | null;
        profileName: string;
    }>({
        isOpen: false,
        profileId: null,
        profileName: "",
    });
    const [isDeleting, setIsDeleting] = useState(false);
    // Initialize with current profile immediately
    const [profiles, setProfiles] = useState<Profile[]>([
        {
            id: currentProfileId,
            name: currentProfileName || "Current Profile",
            code: currentProfileId,
            isActive: true,
        },
    ]);
    const [isLoading, setIsLoading] = useState(true); // Start as loading
    const router = useRouter();

    // Fetch profiles list on mount or when currentProfileId/accountId changes
    // Backend returns [user] when accountId is null, so we can always call it
    useEffect(() => {
        loadProfiles();
        // Close dropdown if accountId is removed
        if (!accountId) {
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountId, currentProfileId]);

    const loadProfiles = async () => {
        try {
            setIsLoading(true);
            const users = await getUsersList();

            // If no users returned, show at least current user
            if (!users || !Array.isArray(users) || users.length === 0) {
                setProfiles([
                    {
                        id: currentProfileId,
                        name: currentProfileName || "Current Profile",
                        code: currentProfileId,
                        isActive: true,
                        isPrimary: true, // If no users from API, current user is primary
                    },
                ]);
                setIsLoading(false);
                return;
            }

            // Convert users to profiles format
            // Backend returns users with isPrimary field from database
            const profilesList: Profile[] = users.map((user) => ({
                id: user.id,
                name: user.fullName,
                code: user.id, // Using id as code for navigation
                isActive: user.id === currentProfileId,
                isPrimary: user.isPrimary ?? false, // Use isPrimary from backend, default to false if undefined
            }));
            setProfiles(profilesList);
        } catch {
            // On error, show at least current user
            setProfiles([
                {
                    id: currentProfileId,
                    name: currentProfileName || "Current Profile",
                    code: currentProfileId,
                    isActive: true,
                    isPrimary: true, // On error, assume current user is primary
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const currentProfile = profiles.find((p) => p.id === currentProfileId);
    const canAddMore = profiles.length < maxProfiles;

    const handleSwitch = async (profileId: string) => {
        if (profileId === currentProfileId) {
            setIsOpen(false);
            return;
        }

        try {
            setIsOpen(false);
            // Call switch endpoint to get new tokens
            const response = await switchUser(profileId);

            // Preserve accountId from current session (same account, different user)
            // Get accountId from response.user if available, otherwise use current accountId prop
            const accountIdToPreserve =
                (response.user as { accountId?: string | null })?.accountId ||
                accountId ||
                null;

            // Update session with new tokens, preserving accountId
            await signInWithCredentials({
                accessToken: response.tokens.access.token,
                refreshToken: response.tokens.refresh.token,
                accessTokenExpires: response.tokens.access.expires.toString(),
                refreshTokenExpires: response.tokens.refresh.expires.toString(),
                userId: response.user.id,
                accountId: accountIdToPreserve,
            });

            // Refresh the page to update UI with new user
            window.location.reload();
        } catch (error) {
            console.error("[MeProfileSwitcher] Error switching user:", error);
            const err = error as Error & { status?: number; message?: string };

            // Check if user was not found (404) - profile was deleted elsewhere
            const isNotFound =
                err?.message?.includes("404") ||
                err?.message?.includes("not_found");

            if (isNotFound) {
                toast.error("Profile no longer exists", {
                    description:
                        "This profile was removed from another device. Refreshing to sync...",
                    duration: 3000,
                });
                // Auto-refresh after 2 seconds to sync state
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                // Other errors - show generic message and refresh
                toast.error("Failed to switch profile", {
                    description: "Please try again or refresh the page.",
                    duration: 3000,
                });
                setTimeout(() => {
                    router.refresh();
                }, 2000);
            }
        }
    };

    const handleAddProfile = () => {
        setIsOpen(false);
        // Check if user has accountId - if not, show social connect modal
        if (!accountId) {
            setIsAddModalOpen(false); // Ensure add modal is closed
            setIsSocialModalOpen(true);
            return;
        }
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (
        e: React.MouseEvent,
        profileId: string,
        profileName: string
    ) => {
        e.stopPropagation(); // Prevent triggering the switch action
        setDeleteModalState({
            isOpen: true,
            profileId,
            profileName,
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModalState.profileId) return;

        try {
            setIsDeleting(true);
            // Backend always returns tokens for primary user after deletion
            const response = await deleteUser(deleteModalState.profileId);

            // Update session with primary user tokens
            await signInWithCredentials({
                accessToken: response.tokens.access.token,
                refreshToken: response.tokens.refresh.token,
                accessTokenExpires: response.tokens.access.expires.toString(),
                refreshTokenExpires: response.tokens.refresh.expires.toString(),
                userId: response.user.id,
                accountId:
                    (response.user as { accountId?: string | null })
                        ?.accountId ||
                    accountId ||
                    null,
            });

            // Reload page to update UI with primary user
            window.location.reload();
        } catch (error) {
            console.error("[MeProfileSwitcher] Error deleting profile:", error);
            const err =
                error instanceof Error
                    ? error
                    : new Error("Failed to delete profile");
            setIsDeleting(false);

            // Check if user was not found (404) - profile was deleted elsewhere
            const isNotFound =
                err.message.includes("404") ||
                err.message.includes("not_found");

            if (isNotFound) {
                toast.error("Profile no longer exists", {
                    description:
                        "This profile was removed from another device. Refreshing to sync...",
                    duration: 3000,
                });
                setDeleteModalState({
                    isOpen: false,
                    profileId: null,
                    profileName: "",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                // Other errors - show error and keep modal open
                toast.error("Failed to delete profile", {
                    description: "Please try again or refresh the page.",
                    duration: 4000,
                });
            }
        }
    };

    // Get initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <section className="sticky top-16 md:top-[7.75rem] z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Profile Switcher Button */}
                    <button
                        onClick={() => {
                            // If no accountId, open social connect modal instead of dropdown
                            if (!accountId) {
                                setIsOpen(false); // Ensure dropdown is closed
                                setIsAddModalOpen(false); // Ensure add modal is closed
                                setIsSocialModalOpen(true);
                                return;
                            }
                            setIsOpen(!isOpen);
                        }}
                        className="w-full flex items-center justify-between gap-4 py-4 cursor-pointer px-6 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
                                {currentProfile
                                    ? getInitials(currentProfile.name)
                                    : "?"}
                            </div>

                            {/* Current Profile Info */}
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="text-sm font-medium text-slate-900 truncate">
                                        {currentProfile?.name || "Loading..."}
                                    </p>
                                    {isPremium && (
                                        <span className="flex-shrink-0 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                            Premium
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    {isLoading
                                        ? "Loading..."
                                        : profiles.length > 0
                                        ? `${profiles.length} of ${maxProfiles} profiles`
                                        : "Loading..."}
                                </p>
                            </div>
                        </div>

                        {/* Chevron */}
                        <ChevronDown
                            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Social Account Connection Prompt - Show when no accountId */}
                    {!accountId && (
                        <div className="px-6 py-3 border-t border-slate-200">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span>
                                    Connect a social account to enable
                                    multi-profile features.{" "}
                                    <button
                                        onClick={() =>
                                            setIsSocialModalOpen(true)
                                        }
                                        className="cursor-pointer font-semibold text-slate-900 hover:underline"
                                    >
                                        Connect now
                                    </button>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Dropdown Menu - Only show if user has accountId */}
                    {isOpen && accountId && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Dropdown Content */}
                            <div className="absolute top-full left-0 right-0 z-50 bg-white border-x border-b border-slate-200 shadow-lg">
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {/* All Profiles List */}
                                    <div>
                                        <div className="px-6 py-2 border-b border-slate-100">
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Your Profiles
                                            </p>
                                        </div>

                                        {isLoading ? (
                                            <div className="px-4 py-3 text-center">
                                                <p className="text-sm text-slate-500">
                                                    Loading profiles...
                                                </p>
                                            </div>
                                        ) : profiles.length === 0 ? (
                                            <div className="px-4 py-3 text-center">
                                                <p className="text-sm text-slate-500">
                                                    No profiles found
                                                </p>
                                            </div>
                                        ) : (
                                            profiles.map((profile) => {
                                                const isActive =
                                                    profile.id ===
                                                    currentProfileId;
                                                const canDelete =
                                                    !profile.isPrimary;
                                                return (
                                                    <div
                                                        key={profile.id}
                                                        className="w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors group"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleSwitch(
                                                                    profile.id
                                                                )
                                                            }
                                                            className="flex items-center gap-3 flex-1 min-w-0 text-left"
                                                        >
                                                            {/* Avatar */}
                                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
                                                                {getInitials(
                                                                    profile.name
                                                                )}
                                                            </div>

                                                            {/* Profile Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-sm font-medium text-slate-900 truncate">
                                                                        {
                                                                            profile.name
                                                                        }
                                                                    </p>
                                                                    {isActive && (
                                                                        <Check className="w-4 h-4 text-slate-900 flex-shrink-0" />
                                                                    )}
                                                                </div>
                                                                {profile.code && (
                                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                                        View
                                                                        report
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </button>

                                                        {/* Delete Button */}
                                                        {canDelete && (
                                                            <button
                                                                onClick={(e) =>
                                                                    handleDeleteClick(
                                                                        e,
                                                                        profile.id,
                                                                        profile.name
                                                                    )
                                                                }
                                                                className="flex-shrink-0 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                aria-label={`Delete ${profile.name}`}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>

                                    {/* Add Profile Button */}
                                    {canAddMore ? (
                                        <div className="border-t border-slate-200">
                                            <button
                                                onClick={handleAddProfile}
                                                className="w-full flex items-center gap-3 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-left"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
                                                    <Plus className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-slate-900">
                                                        Add Profile
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        Create a new profile for
                                                        family or friends
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-t border-slate-200 p-4">
                                            <p className="text-xs text-slate-500 text-center">
                                                Maximum of {maxProfiles}{" "}
                                                profiles reached
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Add Profile Modal - Only show if user has accountId */}
            {accountId && (
                <AddProfileModal
                    isOpen={isAddModalOpen}
                    onOpenChange={(open) => {
                        setIsAddModalOpen(open);
                    }}
                    onSuccess={() => {
                        // Reload profiles list
                        loadProfiles();
                    }}
                />
            )}

            {/* Social Connection Modal (if no accountId) */}
            <SocialConnectionModal
                isOpen={isSocialModalOpen}
                onOpenChange={setIsSocialModalOpen}
            />

            {/* Delete Profile Modal */}
            <DeleteProfileModal
                isOpen={deleteModalState.isOpen}
                onOpenChange={(open) =>
                    setDeleteModalState((prev) => ({
                        ...prev,
                        isOpen: open,
                    }))
                }
                profileName={deleteModalState.profileName}
                onConfirm={handleDeleteConfirm}
                isDeleting={isDeleting}
            />
        </section>
    );
}
