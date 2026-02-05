import { notFound } from "next/navigation";
import QuestionAnswerHeader from "@/components/question-page/QuestionAnswerHeader";
import QuestionAnswerContent from "@/components/question-page/QuestionAnswerContent";
import QuestionActionableItems from "@/components/question-page/QuestionActionableItems";
import QuestionFunnel from "@/components/question-page/QuestionFunnel";
import { mockQuestionAnswers } from "@/lib/mock-data/questions";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const questionAnswer = mockQuestionAnswers[id];

    if (!questionAnswer) {
        return {
            title: "Question Not Found",
        };
    }

    return {
        title: `${questionAnswer.question.title} | Unstar`,
        description: questionAnswer.question.description,
    };
}

export default async function QuestionAnswerPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const questionAnswer = mockQuestionAnswers[id];

    if (!questionAnswer) {
        notFound();
    }

    return (
        <div className="pb-20 xl:pb-0">
            {/* Question Header Section */}
            <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 xl:px-0 border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <QuestionAnswerHeader question={questionAnswer.question} />
                </div>
            </section>

            {/* Answer Content Section */}
            <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <QuestionAnswerContent answer={questionAnswer.answer} />
                </div>
            </section>

            {/* Actionable Items Section */}
            <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <QuestionActionableItems
                        items={questionAnswer.actionableItems}
                    />
                </div>
            </section>

            {/* Other Questions Funnel Section */}
            <section className="py-16 md:py-24 px-6 xl:px-0">
                <div className="max-w-7xl mx-auto">
                    <QuestionFunnel questions={questionAnswer.otherQuestions} />
                </div>
            </section>
        </div>
    );
}
