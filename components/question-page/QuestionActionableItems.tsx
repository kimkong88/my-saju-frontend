interface ActionableItem {
    title: string;
    description: string;
    emoji: string;
    category?: "career" | "relationships" | "creativity" | "wealth" | "health";
}

interface QuestionActionableItemsProps {
    items: ActionableItem[];
}

export default function QuestionActionableItems({ items }: QuestionActionableItemsProps) {
    return (
        <div>
            {/* Header */}
            <div className="max-w-4xl mb-12 md:mb-16">
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8">
                    What You Can Do.
                </h2>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                    Practical steps to break the pattern and create positive change
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 md:p-10 flex flex-col justify-between md:hover:bg-emerald-50/50 transition-colors group border border-emerald-200/50 rounded-sm"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                    {item.emoji}
                                </div>
                            </div>

                            <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
                                {item.title}
                            </h4>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
