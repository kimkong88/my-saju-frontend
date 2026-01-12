export default function TakeawaySection() {
    return (
        <section
            id="next"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 md:gap-20">
                {/* Content first on mobile, first on desktop (content-first pattern) */}
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        What's Next?
                    </h2>
                    <div className="text-lg md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed">
                        This analysis reveals WHO you are—your core personality
                        patterns and natural tendencies.
                        <br />
                        But there&apos;s another dimension...
                    </div>
                    <h3 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 tracking-tighter leading-none">
                        When are you at your best?
                    </h3>
                    <div className="text-lg md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed">
                        - Which days this month favor your goals?
                        <br />- When should you start that business, launch that
                        project, or make that big decision?
                        <br />- What are your best hours today for deep work?
                        <br />
                        <br />
                        Your potential is fixed, but your energy cycles
                        fluctuate.
                    </div>
                </div>
            </div>
        </section>
    );
}
