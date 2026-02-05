interface QuestionAnswerHeaderProps {
    question: {
        title: string;
        description: string;
    };
}

export default function QuestionAnswerHeader({ question }: QuestionAnswerHeaderProps) {
    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8 leading-tight">
                {question.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl">
                {question.description}
            </p>
        </div>
    );
}
