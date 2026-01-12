import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative fire-i-bg pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-20 sm:pb-24 md:pb-32 lg:pb-40 hero-gradient overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 xl:px-0 flex items-center justify-between">
                <div className="text-left relative z-10 max-w-7xl">
                    <h1 className="text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight mb-4 md:mb-6">
                        The Focused Refiner
                    </h1>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-slate-400">
                        Fire-I
                    </h1>
                </div>
            </div>
        </section>
    );
}
