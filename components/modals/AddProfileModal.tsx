"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@heroui/react";
import SignUpForm from "@/components/signup-page/SignUpForm";
import { X } from "lucide-react";

interface AddProfileModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export default function AddProfileModal({
    isOpen,
    onOpenChange,
    onSuccess,
}: AddProfileModalProps) {
    const router = useRouter();

    const handleSuccess = () => {
        onSuccess?.();
        router.refresh();
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="full" scroll="inside">
                    <Modal.Dialog className="p-0">
                        <div className="relative min-h-screen bg-white">
                            {/* Close Button */}
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-6 right-6 z-50 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6 text-slate-600" />
                            </button>

                            {/* Form */}
                            <SignUpForm
                                mode="add-profile"
                                onSuccess={handleSuccess}
                                onCancel={handleCancel}
                            />
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
