interface QuestionAnswerContentProps {
    answer: string;
}

export default function QuestionAnswerContent({ answer }: QuestionAnswerContentProps) {
    // Split answer into paragraphs for better formatting
    const paragraphs = answer.split("\n\n").filter((p) => p.trim());

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-12 md:mb-16">
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8">
                    Your Answer.
                </h2>
            </div>
            
            {/* Content */}
            <div className="prose prose-slate max-w-none">
                <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
