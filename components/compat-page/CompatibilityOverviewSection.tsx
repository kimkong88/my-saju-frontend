export default function CompatibilityOverviewSection({
    overview,
}: {
    overview: string;
}) {
    return (
        <section
            id="overview"
            className="py-16 md:py-24 px-6 xl:px-0 bg-white border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl whitespace-pre-line">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8">
                        Overview.
                    </h2>
                    <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        {overview}
                    </div>
                </div>
            </div>
        </section>
    );
}

