import Link from "next/link";
import type { WhoYouAre, SpecialTrait, Rarity } from "@/types/report";

export default function WhoYouAreSection({
    whoYouAre,
    specialTraits,
    rarity,
}: {
    whoYouAre: WhoYouAre;
    specialTraits: SpecialTrait[];
    rarity?: Rarity;
}) {
    return (
        <section id="who-you-are" className="py-24 md:py-40 px-6 xl:px-0">
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: High-Density & Professional --- */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Who You Are.
                    </h2>

                    <div className="space-y-6">
                        {whoYouAre.paragraphs.map(
                            (paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    className={`${
                                        index === 0
                                            ? "text-xl md:text-3xl font-normal text-slate-900 leading-snug mb-10"
                                            : "text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl"
                                    }`}
                                >
                                    {paragraph}
                                </p>
                            )
                        )}
                    </div>
                </div>

                {specialTraits.length > 0 ? (
                    <>
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                What Makes You Special
                            </h3>
                            {specialTraits.length >= 2 ? (
                                <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-2">
                                    These are rare patterns found in your
                                    chart—most people have 0-1 special traits.
                                    You have{" "}
                                    <strong className="text-slate-900 font-semibold">
                                        {specialTraits.length}
                                    </strong>
                                    , making your chart exceptionally unique.
                                </p>
                            ) : (
                                <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-2">
                                    These are rare patterns found in your
                                    chart—most people have 0-1 special traits.
                                </p>
                            )}
                        </div>
                        {/* --- GRID: Structural & Clean --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Rarity Explanation Card - Always show if rarity exists */}
                            {rarity && (
                                <div className="bg-white p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-2xl">💎</div>
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                Your Rarity
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-4">
                                            1 in {rarity.overall.oneIn.toLocaleString()}
                                        </h4>

                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            This means your exact birth chart combination
                                            appears in only 1 out of{" "}
                                            {rarity.overall.oneIn.toLocaleString()} people.
                                            The higher the number, the more unique your
                                            chart is.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {specialTraits.map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-white p-8 md:p-10 flex flex-col justify-between md:hover:bg-slate-50 transition-colors group border border-slate-200 rounded-sm"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                                {item.emoji}
                                            </div>
                                            {item.rarity && (
                                                <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                    {item.rarity}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-4">
                                            {item.name}
                                        </h4>

                                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : null}

                {/* Conversion Funnel - Subtle */}
                <div className="mt-16 md:mt-20">
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                        Want to know{" "}
                        <Link
                            href="/signup"
                            className="text-slate-900 font-semibold underline decoration-slate-300 hover:decoration-slate-900 transition-colors inline-flex items-center gap-1"
                        >
                            when you&apos;re at your best
                        </Link>
                        ?
                    </p>
                </div>
            </div>
        </section>
    );
}
