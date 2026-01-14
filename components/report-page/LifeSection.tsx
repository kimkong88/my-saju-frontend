export default function LifeSection({
    lifeThemes,
}: {
    lifeThemes: {
        code: string;
        career: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            environments?: string;
            personalInsights?: string[];
        };
        wealth: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            personalInsights?: string[];
        };
        relationships: {
            title: string;
            emoji: string;
            description: string;
            advice?: string[];
            personalInsights?: string[];
        };
        health: {
            title: string;
            emoji: string;
            description: string;
            advice?: string[];
            warningAreas?: string;
            personalInsights?: string[];
        };
        learning: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            personalInsights?: string[];
        };
    };
}) {
    const categories = [
        lifeThemes.career,
        lifeThemes.wealth,
        lifeThemes.relationships,
        lifeThemes.health,
        lifeThemes.learning,
    ];

    return (
        <section
            id="life-at-a-glance"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: High-Density & Professional --- */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Life at a Glance.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        How your chart manifests across different life domains.
                        Practical insights for career, wealth, relationships,
                        health, and growth.
                    </p>
                </div>

                {/* --- VERTICAL LIST: All Content Visible --- */}
                <div className="space-y-8 md:space-y-12 max-w-5xl">
                    {categories.map((category) => {
                        const hasExamples =
                            "examples" in category &&
                            Array.isArray(category.examples) &&
                            category.examples.length > 0 &&
                            category.examples.every(
                                (item) => typeof item === "string"
                            );
                        const hasAdvice =
                            "advice" in category &&
                            Array.isArray(category.advice) &&
                            category.advice.length > 0 &&
                            category.advice.every(
                                (item) => typeof item === "string"
                            );
                        const hasEnvironments =
                            "environments" in category &&
                            typeof category.environments === "string" &&
                            category.environments.trim().length > 0;
                        const hasWarningAreas =
                            "warningAreas" in category &&
                            typeof category.warningAreas === "string" &&
                            category.warningAreas.trim().length > 0;
                        const hasPersonalInsights =
                            "personalInsights" in category &&
                            Array.isArray(category.personalInsights) &&
                            category.personalInsights.length > 0 &&
                            category.personalInsights.every(
                                (item) => typeof item === "string"
                            );

                        return (
                            <div
                                key={category.title}
                                className="group relative pb-8 md:pb-12 last:pb-0 border-b border-slate-100 last:border-b-0"
                            >
                                {/* Header with Emoji */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-3xl md:text-4xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                        {category.emoji}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-medium text-slate-900 tracking-tight">
                                        {category.title}
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                                </div>

                                {/* Description */}
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
                                    {category.description}
                                </p>

                                {/* Content Sections */}
                                <div className="space-y-6">
                                    {/* Examples */}
                                    {hasExamples && "examples" in category && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                Examples
                                            </h4>
                                            <ul className="space-y-2">
                                                {Array.isArray(
                                                    category.examples
                                                ) &&
                                                    category.examples
                                                        .filter(
                                                            (item) =>
                                                                typeof item ===
                                                                "string"
                                                        )
                                                        .map(
                                                            (
                                                                example: string,
                                                                idx: number
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                >
                                                                    <span className="text-slate-300 mt-1.5">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            example
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Advice */}
                                    {hasAdvice && "advice" in category && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                Advice
                                            </h4>
                                            <ul className="space-y-2">
                                                {Array.isArray(
                                                    category.advice
                                                ) &&
                                                    category.advice
                                                        .filter(
                                                            (item) =>
                                                                typeof item ===
                                                                "string"
                                                        )
                                                        .map(
                                                            (
                                                                item: string,
                                                                idx: number
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                >
                                                                    <span className="text-slate-300 mt-1.5">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Environments */}
                                    {hasEnvironments &&
                                        "environments" in category && (
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                    Ideal Environments
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                    {typeof category.environments ===
                                                    "string"
                                                        ? category.environments
                                                        : ""}
                                                </p>
                                            </div>
                                        )}

                                    {/* Warning Areas */}
                                    {hasWarningAreas &&
                                        "warningAreas" in category && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                                                    Watch For
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                    {typeof category.warningAreas ===
                                                    "string"
                                                        ? category.warningAreas
                                                        : ""}
                                                </p>
                                            </div>
                                        )}

                                    {/* Personal Insights */}
                                    {hasPersonalInsights &&
                                        "personalInsights" in category && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                                                    Personal Insights
                                                </h4>
                                                <ul className="space-y-2">
                                                    {Array.isArray(
                                                        category.personalInsights
                                                    ) &&
                                                        category.personalInsights
                                                            .filter(
                                                                (item) =>
                                                                    typeof item ===
                                                                    "string"
                                                            )
                                                            .map(
                                                                (
                                                                    insight: string,
                                                                    idx: number
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                    >
                                                                        <span className="text-indigo-300 mt-1.5">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                insight
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                </ul>
                                            </div>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
