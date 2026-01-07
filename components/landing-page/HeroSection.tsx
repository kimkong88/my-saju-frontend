import DataDrivenModal from "../modals/DataDrivenModal";
import SajuModal from "../modals/SajuModal";

export default function HeroSection() {
    return (
        <section className="relative pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-20 sm:pb-24 md:pb-32 lg:pb-40 hero-gradient px-4 sm:px-6 overflow-hidden">
            <div className="mx-auto text-center relative z-10 max-w-7xl px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold tracking-tight mb-8 sm:mb-10 md:mb-12 text-slate-900">
                    Beyond Astrology.
                    <br />
                    <span className="text-slate-400 font-semibold italic">
                        Decode Your{" "}
                        <strong className="text-slate-900 font-extrabold">
                            Time DNA.
                        </strong>
                    </span>
                </h1>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 mb-10 sm:mb-12 md:mb-14 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-0">
                    The first temporal engine built to decode your life&apos;s
                    logic. Powered by{" "}
                    <span className="inline-modal-wrapper">
                        <SajuModal />
                    </span>
                    , re-engineered for precision across{" "}
                    <strong className="text-slate-900 font-semibold">
                        10.3 million unique probability signatures
                    </strong>
                    . Real-time alignment, relationship synergy, and future
                    mapping—{" "}
                    <span className="inline-modal-wrapper">
                        <DataDrivenModal />
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#teaser"
                        className="button--effect px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg border border-slate-200 hover:bg-slate-50 w-full sm:w-auto text-center transition-colors order-2 sm:order-1"
                    >
                        Try Teaser
                    </a>
                    <a
                        href="#waitlist"
                        className="button--effect cursor-pointer bg-black hover:bg-slate-800 transition-colors text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg w-full sm:w-auto text-center shadow-xl shadow-slate-900/10 order-1 sm:order-2"
                    >
                        Pre-Register
                    </a>
                </div>
            </div>
        </section>
    );
}
