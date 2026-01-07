const SAMPLE_CHAPTER_KEYWORDS = [
    "Keyword 1",
    "Keyword 2",
    "Keyword 3",
    "Keyword 4",
    "Keyword 5",
    "Keyword 6",
    "Keyword 7",
    "Keyword 8",
    "Keyword 9",
    "Keyword 10",
];

export default function IntroductionSection() {
    return (
        <section
            id="timeline"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 md:gap-20">
                {/* Content first on mobile, first on desktop (content-first pattern) */}
                <div className="lg:w-2/3 order-1">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        Introduction
                    </h2>
                    <div className="text-lg md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed">
                        Imagine you were born as a massive, sun-drenched
                        mountain in the middle of a desert. While other kids
                        were like fast-moving streams or fluttering leaves, you
                        possessed a natural gravity. You were the observer. You
                        noticed everything but didn&apos;t always feel the need
                        to shout. You felt older than you actually were.
                        <br />
                        <br />
                        We will break down your early chapter into 3 key
                        sections.
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    The Vibe Check
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    The Turning Point
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                3
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    The Cheat Sheet
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image second on mobile, second on desktop */}
                <div className="lg:w-1/3 w-full order-2">
                    <div className="relative">
                        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[3rem] shadow-lg border border-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 md:mb-10">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold">
                                        Chapter Keywords
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {SAMPLE_CHAPTER_KEYWORDS.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="px-3 sm:px-4 py-1 bg-slate-900 text-white text-sm font-bold rounded-full w-fit"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
