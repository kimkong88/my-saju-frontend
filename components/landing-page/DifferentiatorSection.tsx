import { Check } from "lucide-react";

export default function DifferentiatorSection() {
    const differentiators = [
        {
            number: "10.3M",
            label: "Unique Combinations",
            description: "vs 12 zodiac signs in traditional astrology",
        },
        {
            number: "Unique",
            label: "Rarity Signature",
            description: "Your chart combination is calculated, not categorized",
        },
        {
            number: "Data-Driven",
            label: "Not Generic",
            description: "Precise calculations, not surface-level descriptions",
        },
        {
            number: "Actionable",
            label: "Forecasting Tools",
            description: "Timing insights, not just identity labels",
        },
    ];

    return (
        <section
            id="differentiator"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        Precision,{" "}
                        <span className="italic text-slate-500">
                            Not Generalization
                        </span>
                        .
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        While others rely on{" "}
                        <strong className="text-slate-900 font-semibold">
                            12 zodiac signs
                        </strong>{" "}
                        or{" "}
                        <strong className="text-slate-900 font-semibold">
                            16 personality types
                        </strong>
                        , Unstar analyzes your unique birth coordinates
                        across{" "}
                        <strong className="text-slate-900 font-semibold">
                            10.3 million
                        </strong>{" "}
                        possible combinations to reveal your precise data
                        signature.
                    </p>
                </div>

                {/* Differentiators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {differentiators.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col gap-4 p-6 md:p-8 border border-slate-200 hover:border-slate-900 transition-all duration-300 hover:bg-slate-50/50"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 border border-slate-900 flex items-center justify-center rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                    <Check className="w-5 h-5 text-slate-900 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                                            {item.number}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-900 mb-2 uppercase tracking-tight">
                                        {item.label}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

