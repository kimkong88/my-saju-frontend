export default function HeroSection() {
    return (
        <section className="relative bg-slate-900 pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-20 sm:pb-24 md:pb-32 lg:pb-40 hero-gradient overflow-hidden">
            <div className="mx-auto text-left relative z-10 max-w-7xl">
                <div className="px-3 sm:px-4 py-1 bg-white text-slate-900 font-bold rounded-full w-fit mb-4">
                    Chapter 1
                </div>
                <h1 className="text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight mb-8 sm:mb-10 md:mb-12 text-slate-900">
                    The Hardening Stone
                    <br />
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-slate-400 font-semibold italic">
                        [some subtitle text that is about a couple sentences
                        long]
                    </span>
                </h1>
            </div>
        </section>
    );
}
