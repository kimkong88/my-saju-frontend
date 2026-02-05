"use client";

import { Modal } from "@heroui/react";
import { Trash2 } from "lucide-react";

interface DeleteProfileModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    profileName: string;
    onConfirm: () => void;
    isDeleting?: boolean;
}

export default function DeleteProfileModal({
    isOpen,
    onOpenChange,
    profileName,
    onConfirm,
    isDeleting = false,
}: DeleteProfileModalProps) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="lg">
                    <Modal.Dialog className="p-12">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center pb-8">
                            <Modal.Icon className="bg-slate-900 text-white">
                                <Trash2 className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-serif font-semibold text-slate-900">
                                Delete Profile
                            </Modal.Heading>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-slate-900">
                                    {profileName}
                                </span>
                                ? This action cannot be undone.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="py-6">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onOpenChange(false)}
                                    disabled={isDeleting}
                                    className="flex-1 px-6 py-3 border border-slate-300 rounded-full text-sm font-serif text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={isDeleting}
                                    className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 text-sm font-serif font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
