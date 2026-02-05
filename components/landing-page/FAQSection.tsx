import { Accordion } from "@heroui/react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            question: "What is Bazi or Four Pillars?",
            answer: "Bazi (Four Pillars of Destiny) is a 3,000-year-old Chinese system that analyzes your birth chart using the exact date, time, and location of your birth. Unlike Western astrology which uses 12 zodiac signs, Bazi calculates your unique combination from over 10.3 million possible combinations, providing precise insights into your personality, life cycles, and potential.",
        },
        {
            question: "How is this different from astrology or MBTI?",
            answer: "While traditional astrology uses 12 zodiac signs and MBTI uses 16 personality types, Unstar analyzes your unique birth coordinates across 10.3 million possible combinations. This means your chart is calculated, not categorized—revealing your precise rarity signature (like '1 in 1.3M') rather than placing you in a generic group. We also provide actionable forecasting tools, not just identity labels.",
        },
        {
            question: "Do I need my exact birth time?",
            answer: "Your exact birth time helps us calculate the most precise chart, but it's optional. If you don't know your exact time, we can still generate a comprehensive report using your birth date. However, having the exact time allows for more accurate forecasting and timing insights.",
        },
        {
            question: "How accurate is this?",
            answer: "Unstar uses precise calculations based on your exact birth coordinates, analyzing 10.3 million possible combinations. While no system can predict the future with 100% accuracy, Bazi has been used for thousands of years to provide insights into personality patterns and life cycles. We recommend reading the 'Who You Are' section first—if it resonates with you, the rest of the report will likely be valuable.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes. We take your privacy seriously. All data is encrypted and stored securely. We never share your birth information with third parties. Your data is used solely to generate your personalized report and forecasts. You can read our full Privacy Policy for more details.",
        },
    ];

    return (
        <section
            id="faq"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        Common Questions.
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Have questions? We&apos;ve got answers.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <Accordion variant="default" className="gap-4">
                    {faqs.map((faq, index) => (
                        <Accordion.Item
                            key={index}
                            className="border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                        >
                            <Accordion.Heading>
                                <Accordion.Trigger className="p-6 md:p-8">
                                    <span className="font-serif text-lg md:text-xl font-semibold text-slate-900 pr-8">
                                        {faq.question}
                                    </span>
                                    <Accordion.Indicator>
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </Accordion.Indicator>
                                </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                                <Accordion.Body className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </Accordion.Body>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
