"use client";

import { useState } from "react";
import { Modal } from "@heroui/react";
import { FieldError, Form, Input, Label, ListBox, Select } from "@heroui/react";
import { X, Mail } from "lucide-react";
import { addFriend } from "@/app/actions/friendAction";
import { toast } from "sonner";
import type { RelationshipType } from "@/types/friend";

// Simple Chevron Icon for perfect alignment
const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
        />
    </svg>
);

interface AddFriendModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    currentFriendCount?: number;
    maxFriends?: number;
    currentUserCode?: string; // User code for sending invites
}

const RELATIONSHIP_OPTIONS: { value: RelationshipType; label: string }[] = [
    { value: "romantic", label: "Romantic" },
    { value: "family", label: "Family" },
    { value: "friend", label: "Friend" },
    { value: "colleague", label: "Colleague" },
    { value: "other", label: "Other" },
];

export default function AddFriendModal({
    isOpen,
    onOpenChange,
    onSuccess,
    currentFriendCount = 0,
    maxFriends = 10,
    currentUserCode,
}: AddFriendModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        code: "",
        relationship: "" as RelationshipType | "",
        customLabel: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Safety check: prevent submission if at limit
        if (currentFriendCount >= maxFriends) {
            toast.error(`You've reached the maximum of ${maxFriends} people`);
            return;
        }

        setIsSubmitting(true);

        try {
            if (!formData.code.trim() || !formData.relationship) {
                toast.error("Please fill in all required fields");
                setIsSubmitting(false);
                return;
            }

            const data = {
                code: formData.code.trim(),
                relationship: formData.relationship,
                ...(formData.relationship === "other" &&
                    formData.customLabel && {
                        customLabel: formData.customLabel,
                    }),
            };

            await addFriend(data);
            toast.success("Person added successfully");
            onSuccess?.();
            onOpenChange(false);

            // Reset form
            setFormData({
                code: "",
                relationship: "",
                customLabel: "",
            });
        } catch (error) {
            console.error("Error adding friend:", error);
            const err =
                error instanceof Error
                    ? error
                    : new Error("Failed to add friend");

            // Convert backend error codes to user-friendly messages
            let userMessage = "Failed to add person. Please try again.";

            if (err.message) {
                const errorMsg = err.message.toLowerCase();
                if (
                    errorMsg.includes("friend_not_found") ||
                    errorMsg.includes("user_not_found")
                ) {
                    userMessage =
                        "User code not found. Please check the code and try again.";
                } else if (
                    errorMsg.includes("already") ||
                    errorMsg.includes("duplicate")
                ) {
                    userMessage = "This person has already been added.";
                } else if (error.status === 404) {
                    userMessage =
                        "User code not found. Please check the code and try again.";
                } else if (error.status === 400) {
                    userMessage =
                        "Invalid information provided. Please check your input and try again.";
                } else if (error.status === 403) {
                    userMessage =
                        "You don't have permission to perform this action.";
                } else if (error.status === 429) {
                    userMessage = "Too many requests. Please try again later.";
                } else {
                    // Use the error message if it's already user-friendly
                    userMessage = error.message;
                }
            }

            toast.error(userMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendInvite = () => {
        if (!currentUserCode) {
            toast.error("Unable to send invite. User code not available.");
            return;
        }

        const signupUrl = `${
            typeof window !== "undefined" ? window.location.origin : ""
        }/signup`;
        const subject = encodeURIComponent(
            "Join Unstar - Let's Check Our Compatibility!"
        );
        const body = encodeURIComponent(
            `Join Unstar to discover your Bazi chart and check our compatibility!\n\n` +
                `Sign up here: ${signupUrl}\n\n` +
                `After signing up, add me to your compatibility list using my code: ${currentUserCode}\n\n` +
                `Let's see how our charts interact!`
        );

        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const canAddMore = currentFriendCount < maxFriends;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="full" scroll="inside">
                    <Modal.Dialog className="p-0 max-h-screen overflow-y-auto">
                        <div className="relative min-h-full bg-white">
                            {/* Close Button */}
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-6 right-6 z-50 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6 text-slate-600" />
                            </button>

                            {/* Content */}
                            <div className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 bg-white">
                                <div className="max-w-3xl mx-auto w-full">
                                    {/* Header */}
                                    <div className="text-center mb-8 md:mb-12">
                                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                                            Add Person
                                        </h1>
                                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-lg mx-auto mb-4">
                                            Add people to track daily
                                            compatibility and discover insights
                                            about your relationships.
                                        </p>
                                        {!canAddMore && (
                                            <p className="text-sm text-amber-600 font-medium">
                                                You&apos;ve reached the maximum
                                                of {maxFriends} people
                                            </p>
                                        )}
                                    </div>

                                    {/* Add Friend Form */}
                                    <Form
                                        onSubmit={handleSubmit}
                                        validationBehavior="native"
                                        className="flex flex-col gap-10 md:gap-12 mt-8"
                                    >
                                        {/* User Code Input */}
                                        <div className="text-left group">
                                            <Label
                                                htmlFor="code"
                                                className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                            >
                                                User Code
                                            </Label>
                                            <Input
                                                id="code"
                                                name="code"
                                                required
                                                value={formData.code}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        code: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none"
                                                placeholder="Enter person's user code"
                                            />
                                        </div>

                                        {/* Relationship Selector */}
                                        <div className="text-left group">
                                            <Select
                                                id="relationship"
                                                name="relationship"
                                                isRequired
                                                placeholder="Select relationship"
                                                selectedKey={
                                                    formData.relationship ||
                                                    undefined
                                                }
                                                onSelectionChange={(key) => {
                                                    setFormData({
                                                        ...formData,
                                                        relationship: key
                                                            ? (key as RelationshipType)
                                                            : ("" as
                                                                  | RelationshipType
                                                                  | ""),
                                                    });
                                                }}
                                                className="w-full"
                                            >
                                                <Label
                                                    htmlFor="relationship"
                                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                                >
                                                    Relationship
                                                </Label>
                                                <Select.Trigger className="bg-transparent border-0 border-b border-slate-300 px-0 pr-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none">
                                                    <Select.Value />
                                                    <ChevronDownIcon className="text-slate-600 ml-auto" />
                                                </Select.Trigger>
                                                <Select.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none">
                                                    <ListBox className="p-0">
                                                        {RELATIONSHIP_OPTIONS.map(
                                                            (option) => (
                                                                <ListBox.Item
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    id={
                                                                        option.value
                                                                    }
                                                                    textValue={
                                                                        option.label
                                                                    }
                                                                    className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                    <ListBox.ItemIndicator />
                                                                </ListBox.Item>
                                                            )
                                                        )}
                                                    </ListBox>
                                                </Select.Popover>
                                                <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                            </Select>
                                        </div>

                                        {/* Custom Label for "Other" */}
                                        {formData.relationship === "other" && (
                                            <div className="text-left group">
                                                <Label
                                                    htmlFor="customLabel"
                                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                                >
                                                    Custom Label
                                                </Label>
                                                <Input
                                                    id="customLabel"
                                                    name="customLabel"
                                                    value={formData.customLabel}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            customLabel:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none"
                                                    placeholder="e.g., Mentor, Neighbor"
                                                />
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <div className="pt-8 text-center">
                                            <button
                                                type="submit"
                                                disabled={
                                                    isSubmitting ||
                                                    !formData.code.trim() ||
                                                    !formData.relationship ||
                                                    !canAddMore
                                                }
                                                className="cursor-pointer group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-white bg-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                <span className="relative flex items-center gap-3 text-lg">
                                                    {isSubmitting
                                                        ? "Adding..."
                                                        : "Add Person"}
                                                </span>
                                            </button>
                                        </div>
                                    </Form>

                                    {/* Divider */}
                                    {currentUserCode && (
                                        <div className="relative my-8 md:my-12">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-slate-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="bg-white px-4 text-slate-500">
                                                    Or invite someone to join
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Send Invite Button */}
                                    {currentUserCode && (
                                        <div className="text-center">
                                            <button
                                                onClick={handleSendInvite}
                                                className="cursor-pointer group relative inline-flex items-center justify-center gap-3 px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-slate-900 bg-white border border-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-xl hover:bg-slate-50"
                                            >
                                                <Mail className="w-5 h-5" />
                                                <span className="relative text-lg">
                                                    Send Invite via Email
                                                </span>
                                            </button>
                                            <p className="text-xs text-slate-500 mt-3 max-w-md mx-auto">
                                                Send an email with a signup link
                                                and your user code. After they
                                                sign up, they can add you to
                                                their compatibility list.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
