"use client";

import { Link2 } from "lucide-react";
import { Modal } from "@heroui/react";
import SocialSignInButton from "@/components/auth/SocialSignInButton";

interface SocialConnectionModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SocialConnectionModal({
    isOpen,
    onOpenChange,
}: SocialConnectionModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="lg">
                    <Modal.Dialog className="p-12">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center pb-8">
                            <Modal.Icon className="bg-slate-900 text-white">
                                <Link2 className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl font-serif font-semibold text-slate-900">
                                Connect Your Account
                            </Modal.Heading>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                Link your social account to access your full
                                report and sync across devices.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="py-6">
                            <div className="space-y-4">
                                <SocialSignInButton
                                    provider="google"
                                    variant="modal"
                                    onStart={() => onOpenChange(false)}
                                />
                                <SocialSignInButton
                                    provider="apple"
                                    variant="modal"
                                    onStart={() => onOpenChange(false)}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="pt-4">
                            <button
                                onClick={() => onOpenChange(false)}
                                className="w-full text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors underline"
                            >
                                Maybe Later
                            </button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
