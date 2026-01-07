"use client";

import { Modal } from "@heroui/react";
import DefaultModal from "./DefaultModal";

export default function SajuModal() {
    return (
        <DefaultModal
            trigger={
                <Modal.Trigger>
                    <span className="text-slate-900 font-bold underline cursor-pointer">
                        Saju(Bazi)
                    </span>
                </Modal.Trigger>
            }
            title="What is Saju(Bazi)?"
            description={
                <div className="w-full mx-auto py-2">
                    {/* Header Section */}
                    <div className="text-left mb-10">
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Saju(Bazi) is a data-driven framework that decodes
                            the{" "}
                            <span className="text-slate-900 font-semibold uppercase tracking-wider text-[11px]">
                                Four Pillars
                            </span>{" "}
                            of your birth into a unique{" "}
                            <span className="italic">Vector Signature</span>.
                        </p>
                    </div>

                    {/* Vertical Stack Section */}
                    <div className="space-y-6">
                        {/* Item 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                                01
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">
                                    Not Astrology
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    While astrology tracks planets, Saju
                                    calculates the binary interaction of five
                                    core vectors:{" "}
                                    <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1 rounded">
                                        T, F, E, M, W
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                                02
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">
                                    The Logic
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    Your birth time acts as a{" "}
                                    <span className="italic">
                                        universal timestamp
                                    </span>
                                    , mapping how your DNA interacts with
                                    specific temporal cycles.
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                                03
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">
                                    The Strategy
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    A blueprint to identify when to expand,
                                    stabilize, or pivot based on your natural
                                    environmental flow.
                                </p>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                                04
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1 text-base">
                                    The Goal
                                </h4>
                                <p className="text-sm text-slate-500 leading-snug">
                                    This isn&apos;t about fate—it&apos;s about{" "}
                                    <span className="text-slate-900 font-semibold underline decoration-slate-200 underline-offset-4">
                                        optimizing your trajectory
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100">
                            <p className="text-[11px] text-slate-400 leading-tight italic">
                                *Our algorithm purely translates traditional
                                Gan-Zhi logic into modern analytical outputs. No
                                spiritual or mystical claims are made.
                            </p>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
