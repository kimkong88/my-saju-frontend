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
                <div className="lg:w-3/4">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        Introduction
                    </h2>
                    <div className="text-lg md:text-xl text-slate-700 mb-6 md:mb-8 leading-relaxed">
                        Most people see a laser-like focus and assume it
                        signifies a narrow perspective, missing the adaptable
                        intensity that fuels it. They've never seen you, like a{" "}
                        <strong className="text-slate-900 font-bold">
                            focused flame
                        </strong>
                        , steadily refine a concept until it gleams with
                        potential. You’re not simply detail-oriented; you’re a
                        Refiner, meticulously shaping ideas with an inward focus
                        that allows for profound transformation. You don't just
                        work methodically—you build enduring foundations. Once
                        you channel that concentrated energy into a goal, you
                        don't just achieve it. You transcend it, generating
                        value and lasting impact from previously unseen
                        possibilities.
                        <br />
                        <br />
                        We will break down your early chapter into 5 key
                        sections.
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    Who You Are
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
                                    Your Strengths
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
                                    Your Weaknesses
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                4
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    Compatibility With Others
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                5
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    Actionable Advices
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    [static: some description text that is about
                                    a couple sentences long]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
