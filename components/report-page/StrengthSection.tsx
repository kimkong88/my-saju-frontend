export default function StrengthSection({
    strengths,
}: {
    strengths: {
        title: string;
        description: string;
        emoji: string;
        isPersonal?: boolean;
    }[];
}) {
    return (
        <section
            id="strengths"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: High-Density & Professional --- */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Your Strengths.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        Competitive advantages hidden within your chart. These
                        are the natural talents and patterns that give you an
                        edge—the ways you&apos;re wired to excel.{" "}
                        <span className="text-sm text-slate-500 italic">
                            Traits marked &quot;Personal&quot; come from your
                            unique patterns and special stars, not just your
                            elemental type.
                        </span>
                    </p>
                </div>

                {/* --- VERTICAL STACK: Subtle Refined Stagger --- */}
                {strengths.length > 0 ? (
                    <div className="space-y-8 md:space-y-12">
                        {strengths.map((strength, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={strength.title}
                                    className={`group relative pb-8 md:pb-12 last:pb-0 transition-all duration-300 ${
                                        isEven
                                            ? "max-w-4xl"
                                            : "max-w-4xl md:ml-6 lg:ml-12"
                                    }`}
                                >
                                    {/* Number + Icon Row */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-3xl md:text-4xl font-medium text-slate-200 group-hover:text-slate-300 transition-colors">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        <div className="text-2xl md:text-3xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                            {strength.emoji}
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                                    </div>

                                    {/* Title with Personal Badge */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                            {strength.title}
                                        </h3>
                                        {strength.isPersonal && (
                                            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-sm">
                                                Personal
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                        {strength.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
