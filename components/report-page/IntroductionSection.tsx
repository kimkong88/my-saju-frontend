import React from "react";
import CredibilityNote from "./CredibilityNote";

// Keeping your utility but adding a more sophisticated span style
function highlightVisualMetaphor(
    text: string,
    visualMetaphor: string
): React.ReactNode[] {
    if (!visualMetaphor) return [text];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const searchText = text.toLowerCase();
    const metaphorLower = visualMetaphor.toLowerCase();

    let index = searchText.indexOf(metaphorLower, lastIndex);
    while (index !== -1) {
        if (index > lastIndex) {
            parts.push(text.substring(lastIndex, index));
        }
        parts.push(
            <span
                key={index}
                className="text-slate-900 font-medium border-b border-slate-900/20 pb-0.5"
            >
                {text.substring(index, index + visualMetaphor.length)}
            </span>
        );
        lastIndex = index + visualMetaphor.length;
        index = searchText.indexOf(metaphorLower, lastIndex);
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts;
}

export default function IntroductionSection({
    introduction,
    visualMetaphor,
}: {
    introduction: string;
    visualMetaphor: string;
}) {
    return (
        <section
            id="introduction"
            className="py-24 md:py-44 px-6 xl:px-0 bg-white border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl whitespace-pre-line">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Introduction.
                    </h2>
                    <div className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        {highlightVisualMetaphor(introduction, visualMetaphor)}
                    </div>

                    {/* Credibility Note */}
                    <CredibilityNote />
                </div>
            </div>
        </section>
    );
}
