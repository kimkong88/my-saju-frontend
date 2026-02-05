"use client";

import { useState, useEffect, useRef } from "react";
import { Modal } from "@heroui/react";
import { Sparkles } from "lucide-react";

interface BlessingTemplate {
    id: string;
    name: string;
    description: string;
    emoji: string;
}

interface SendBlessingModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    friendName: string;
    availableBlessings: BlessingTemplate[];
    onSend: (blessingId: string, personalMessage?: string) => Promise<void>;
}

export default function SendBlessingModal({
    isOpen,
    onOpenChange,
    friendName,
    availableBlessings,
    onSend,
}: SendBlessingModalProps) {
    const [selectedBlessingId, setSelectedBlessingId] = useState<string | null>(null);
    const [personalMessage, setPersonalMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = async () => {
        if (!selectedBlessingId) return;

        try {
            setIsSending(true);
            await onSend(selectedBlessingId, personalMessage.trim() || undefined);
            // Reset form
            setSelectedBlessingId(null);
            setPersonalMessage("");
            onOpenChange(false);
        } catch (error) {
            console.error("Error sending blessing:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleClose = () => {
        if (!isSending) {
            setSelectedBlessingId(null);
            setPersonalMessage("");
            onOpenChange(false);
        }
    };

    // Auto-scroll and focus textarea when blessing is selected
    useEffect(() => {
        if (selectedBlessingId && textareaRef.current) {
            // Small delay to ensure the textarea is rendered
            setTimeout(() => {
                textareaRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                textareaRef.current?.focus();
            }, 100);
        }
    }, [selectedBlessingId]);

    return (
        <Modal isOpen={isOpen} onOpenChange={handleClose}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="full">
                    <Modal.Dialog className="p-6 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center pb-6 sm:pb-8">
                            <Modal.Icon className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border border-amber-200">
                                <Sparkles className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-serif font-semibold text-slate-900">
                                Send a Blessing to {friendName}
                            </Modal.Heading>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                Choose a blessing to send. You can add a personal message to make it more meaningful.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="py-6">
                            {availableBlessings.length === 0 ? (
                                <div className="text-center py-8 text-slate-500">
                                    <p>No blessings available right now.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Blessing Templates */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-3">
                                            Select a Blessing
                                        </label>
                                        <div className="space-y-2 -mx-2 sm:mx-0 px-2 sm:px-0">
                                            {availableBlessings.map((blessing) => (
                                                <button
                                                    key={blessing.id}
                                                    onClick={() => setSelectedBlessingId(blessing.id)}
                                                    disabled={isSending}
                                                    className={`w-full text-left p-4 rounded-sm border-2 transition-all ${
                                                        selectedBlessingId === blessing.id
                                                            ? "border-amber-500 bg-amber-50"
                                                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    <div className="flex items-start sm:items-center gap-3">
                                                        <div className="flex-shrink-0 text-2xl">
                                                            {blessing.emoji}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-base font-semibold text-slate-900 mb-1">
                                                                {blessing.name}
                                                            </h3>
                                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                                {blessing.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Personal Message (Optional) */}
                                    {selectedBlessingId && (
                                        <div>
                                            <label
                                                htmlFor="personal-message"
                                                className="block text-sm font-medium text-slate-900 mb-2"
                                            >
                                                Personal Message <span className="text-slate-400 font-normal">(Optional)</span>
                                            </label>
                                            <textarea
                                                ref={textareaRef}
                                                id="personal-message"
                                                value={personalMessage}
                                                onChange={(e) => setPersonalMessage(e.target.value)}
                                                disabled={isSending}
                                                placeholder="Add a personal note to make this blessing more meaningful..."
                                                rows={3}
                                                maxLength={500}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-sm focus:border-2 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                            />
                                            <div className="text-xs text-slate-500 mt-1 text-right">
                                                {personalMessage.length} / 500
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer className="pt-6">
                            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
                                <button
                                    onClick={handleClose}
                                    disabled={isSending}
                                    className="w-full sm:w-auto px-6 py-3 border border-slate-300 rounded-full text-sm font-serif text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!selectedBlessingId || isSending}
                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border border-amber-200 rounded-full hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300 transition-all duration-200 text-sm font-serif font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {isSending ? "Sending..." : "Send Blessing"}
                                </button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
