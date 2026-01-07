export default function TakeawaySection() {
    return (
        <section
            id="takeaway"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 md:gap-20">
                {/* Content first on mobile, first on desktop (content-first pattern) */}
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        Key Takeaways
                    </h2>
                    <div className="text-lg md:text-xl text-slate-500 mb-6 md:mb-8 leading-relaxed">
                        [static: some description text that is about a couple
                        sentences long]
                    </div>
                </div>
            </div>
        </section>
    );
}
