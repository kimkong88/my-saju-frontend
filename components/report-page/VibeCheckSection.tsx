const colorMap = [
    { bg: "bg-amber-100", dot: "bg-amber-500" },
    { bg: "bg-emerald-100", dot: "bg-emerald-500" },
    { bg: "bg-indigo-100", dot: "bg-indigo-500" },
    { bg: "bg-purple-100", dot: "bg-purple-500" },
    { bg: "bg-rose-100", dot: "bg-rose-500" },
    { bg: "bg-sky-100", dot: "bg-sky-500" },
    { bg: "bg-teal-100", dot: "bg-teal-500" },
    { bg: "bg-violet-100", dot: "bg-violet-500" },
    { bg: "bg-yellow-100", dot: "bg-yellow-500" },
];

const SAMPLE_VIBE_CHECK = [
    {
        title: "Naturally Grounded",
        description: `Even as a kid, you had a 'gravity' to you. You stayed calm when others were chaotic, watching how things fit together.`,
    },
    {
        title: "Naturally Grounded 2",
        description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`,
    },
    {
        title: "Naturally Grounded 3",
        description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`,
    },
];

export default function VibeCheckSection() {
    return (
        <section id="vibe-check" className="py-16 md:py-32 px-6 xl:px-0">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                    The Vibe Check
                </h2>
                <div className="text-lg md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed">
                    While the world around you was loud and shifting, your
                    internal landscape was remarkably still. From 1988 to 2005,
                    you existed as a mountain sitting under a persistent,
                    high-noon sun. You weren’t just growing up; you were
                    undergoing a process of 'Structural Hardening.' You spent
                    these years as a silent architect—observing the world with a
                    'No-BS' meter that was already fully calibrated, building a
                    foundation strong enough to eventually house the fire of
                    your ambitions
                </div>
                <div className="flex flex-col gap-4">
                    {SAMPLE_VIBE_CHECK.map((item, index) => (
                        <div
                            key={item.title}
                            className="bg-slate-50 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div
                                    className={`w-8 h-8 rounded-lg ${
                                        colorMap[index]?.bg || colorMap[0].bg
                                    } flex items-center justify-center`}
                                >
                                    <div
                                        className={`w-2 h-2 ${
                                            colorMap[index]?.dot ||
                                            colorMap[0].dot
                                        } rounded-full`}
                                    ></div>
                                </div>
                                <h4 className="font-black text-lg md:text-xl">
                                    {item.title}
                                </h4>
                            </div>
                            <span className="text-slate-500 font-medium leading-relaxed text-base md:text-lg">
                                {item.description}
                            </span>
                            <span className="ml-2 text-nowrap cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-300 text-slate-500 font-medium leading-relaxed px-2 py-1 rounded-full text-sm border border-slate-200">
                                Why?
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
