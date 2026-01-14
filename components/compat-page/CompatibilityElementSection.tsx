function getInteractionLabel(interactionType: string): string {
    if (interactionType === "Generative") return "Supportive";
    if (interactionType === "Harmonious") return "Balanced";
    if (interactionType === "Conflicting") return "Challenging";
    return interactionType;
}

export default function CompatibilityElementSection({
    elementInteraction,
}: {
    elementInteraction: {
        person1Element: string;
        person2Element: string;
        interactionType: string;
        cycle: string;
        description: string;
    };
}) {
    const interactionLabel = getInteractionLabel(elementInteraction.interactionType);

    return (
        <section
            id="elements"
            className="py-16 md:py-24 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-6">
                        How You Connect.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        The fundamental energy dynamic between your charts. This
                        interaction shapes how you naturally complement or challenge
                        each other.
                    </p>
                </div>

                {/* Vertical Stack - Matching Personal Report Style */}
                <div className="max-w-4xl">
                    <div className="group relative transition-all duration-300">
                        {/* Header with Emoji and Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-3xl md:text-4xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                ⚡
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                        </div>

                        {/* Element Flow - Clean Typography */}
                        <div className="mb-8">
                            <div className="flex items-baseline gap-4 mb-4">
                                <div>
                                    <div className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight">
                                        {elementInteraction.person1Element}
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                                        Person 1
                                    </div>
                                </div>

                                <div className="text-xl md:text-2xl text-slate-300">→</div>

                                <div>
                                    <div className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight">
                                        {elementInteraction.person2Element}
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                                        Person 2
                                    </div>
                                </div>
                            </div>

                            {/* Interaction Type */}
                            <div className="mb-6">
                                <span className="text-xs font-medium text-slate-600 uppercase tracking-wider px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-sm">
                                    {interactionLabel} Dynamic
                                </span>
                            </div>
                        </div>

                        {/* Cycle Description */}
                        <div className="mb-6 pt-6 border-t border-slate-100">
                            <p className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">
                                {elementInteraction.cycle}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                            {elementInteraction.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

