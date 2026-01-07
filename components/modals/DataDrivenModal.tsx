import { Modal } from "@heroui/react";
import DefaultModal from "./DefaultModal";

export default function DataDrivenModal() {
    return (
        <DefaultModal
            trigger={
                <Modal.Trigger>
                    <span className="text-slate-900 font-bold underline cursor-pointer">
                        driven by data.
                    </span>
                </Modal.Trigger>
            }
            title="What is Data-Driven?"
            description={
                <div className="mx-auto py-2 px-1">
                    {/* Header Section */}
                    <div className="mb-10">
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Saju is a high-resolution combinatorial system. Our
                            engine calculates across a landscape of{" "}
                            <span className="text-slate-900 font-semibold underline decoration-blue-200">
                                10.3 million unique probability signatures
                            </span>
                            .
                        </p>
                    </div>

                    {/* Vertical Technical Breakdown */}
                    <div className="space-y-8">
                        {/* Vertical Technical Breakdown */}
                        <div className="space-y-8">
                            {/* Metric 1 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Combinatorial Depth
                                    </h4>
                                    <p className="text-sm text-slate-800 font-medium leading-snug">
                                        We process the 518,400 base-chart
                                        variables against 10 distinct life-cycle
                                        trajectories to map your specific
                                        temporal footprint.
                                    </p>
                                </div>
                            </div>

                            {/* Metric 2 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Synchronicity Mapping
                                    </h4>
                                    <p className="text-sm text-slate-800 font-medium leading-snug">
                                        The algorithm identifies the statistical
                                        "resonance" between your birth DNA and
                                        current cycles, removing the guesswork
                                        from strategic timing.
                                    </p>
                                </div>
                            </div>

                            {/* Metric 3 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        Pattern Recognition
                                    </h4>
                                    <p className="text-sm text-slate-800 font-medium leading-snug">
                                        By utilizing centuries of refined
                                        Gan-Zhi logic, we convert complex
                                        elemental interactions into actionable,
                                        low-friction outcomes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Footnote */}
                    <div className="mt-12 pt-6 border-t border-slate-100">
                        <p className="text-[11px] text-slate-400 leading-tight italic">
                            *Our algorithm purely translates traditional Gan-Zhi
                            logic into modern analytical outputs. No spiritual
                            or mystical claims are made.
                        </p>
                    </div>
                </div>
            }
        />
    );
}
