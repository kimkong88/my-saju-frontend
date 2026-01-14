import { Quote } from "lucide-react";

interface Testimonial {
    username: string; // e.g., "@sarahc"
    city: string; // e.g., "San Francisco, CA"
    text: string;
    rarity?: string; // e.g., "1 in 1.3M"
}

export default function SocialProofSection() {
    // TODO: Replace with real testimonials from friends/family
    const testimonials: Testimonial[] = [
        {
            username: "@sarahc",
            city: "San Francisco, CA",
            text: "I was skeptical at first, but the accuracy of my report was uncanny. It helped me understand patterns in my life I never noticed before.",
        },
        {
            username: "@marcusj",
            city: "New York, NY",
            text: "Finally, something that goes beyond generic personality tests. The rarity signature made it feel truly personalized, not just categorized.",
        },
        {
            username: "@emmar",
            city: "Austin, TX",
            text: "The forecasting insights have been incredibly helpful for planning my career moves. It's like having a roadmap based on my actual patterns.",
        },
    ];

    return (
        <section
            id="social-proof"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        What People Say.
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Real insights from people who&apos;ve discovered their
                        unique temporal signature.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 p-6 md:p-8 hover:border-slate-300 transition-colors group"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4">
                                <Quote className="w-8 h-8 text-slate-300 group-hover:text-slate-400 transition-colors" />
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
                                &quot;{testimonial.text}&quot;
                            </p>

                            {/* Author Info */}
                            <div className="border-t border-slate-100 pt-4">
                                <div className="font-semibold text-slate-900 text-sm md:text-base">
                                    {testimonial.username}
                                </div>
                                <div className="text-xs md:text-sm text-slate-500 mt-1">
                                    {testimonial.city}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
