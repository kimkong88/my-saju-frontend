"use client";

import { CreditCard, ArrowRight } from "lucide-react";
import { Modal } from "@heroui/react";
import Link from "next/link";

interface SubscriptionModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubscribe?: () => void;
}

export default function SubscriptionModal({
    isOpen,
    onOpenChange,
    onSubscribe,
}: SubscriptionModalProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubscribe = () => {
        if (onSubscribe) {
            onSubscribe();
        } else {
            // Default behavior - just close
            onOpenChange(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="lg">
                    <Modal.Dialog className="p-6 sm:p-8 md:p-12">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center pb-6 sm:pb-8">
                            <Modal.Icon className="bg-slate-900 text-white">
                                <CreditCard className="size-4 sm:size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900 mt-3 sm:mt-4">
                                Unlock Premium Access
                            </Modal.Heading>
                            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-sm mx-auto px-2">
                                Subscribe to access your full personal report
                                and all premium features.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="py-0">
                            {/* Pricing - Responsive */}
                            <div className="text-center mb-8 sm:mb-10">
                                <div className="inline-flex items-baseline gap-0.5 sm:gap-1 mb-2">
                                    <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-slate-900 tracking-tight">
                                        $4
                                    </span>
                                    <span className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-slate-900">
                                        .99
                                    </span>
                                </div>
                                <div className="text-[10px] sm:text-xs font-serif text-slate-500 uppercase tracking-widest mt-1 sm:mt-2">
                                    per month
                                </div>
                            </div>

                            {/* Features - Responsive List */}
                            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                <li className="flex items-start gap-2 sm:gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                                        Full personal report access
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 sm:gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                                        Advanced forecasts and insights
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 sm:gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                                        Life cycle analysis
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 sm:gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center mt-0.5">
                                        <svg
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                                        Priority support
                                    </span>
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer className="flex-col gap-3 pt-4 sm:pt-6 pb-0">
                            <Link
                                href="/pricing"
                                onClick={() => onOpenChange(false)}
                                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base font-serif font-semibold flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                                View Full Pricing Details
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="w-full px-6 sm:px-8 py-3 sm:py-4 border border-slate-300 rounded-full text-sm sm:text-base font-serif text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all duration-200"
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
