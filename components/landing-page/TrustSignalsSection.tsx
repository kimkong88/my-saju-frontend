import { Lock, Shield, EyeOff, FileText } from "lucide-react";

export default function TrustSignalsSection() {
    const trustPoints = [
        {
            icon: Lock,
            title: "Encrypted & Secure",
            description: "All data is encrypted and stored securely",
        },
        {
            icon: EyeOff,
            title: "Private & Confidential",
            description: "We never share your data with third parties",
        },
        {
            icon: Shield,
            title: "Your Data, Protected",
            description: "Your birth information remains private",
        },
    ];

    return (
        <section
            id="trust"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        Your Privacy,{" "}
                        <span className="italic text-slate-500">Protected</span>
                        .
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Your birth data is sensitive. We take privacy seriously
                        and protect your information with industry-standard
                        security measures.
                    </p>
                </div>

                {/* Trust Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mb-12 md:mb-16">
                    {trustPoints.map((point, index) => {
                        const Icon = point.icon;
                        return (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center group-hover:border-slate-900 group-hover:bg-slate-50 transition-all duration-300">
                                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-900 mb-2">
                                    {point.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Privacy Policy Link */}
                <div className="text-center">
                    <a
                        href="/privacy"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Read our Privacy Policy</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

