export interface QuestionAnswer {
    id: string;
    question: {
        title: string;
        description: string;
    };
    answer: string;
    actionableItems: Array<{
        title: string;
        description: string;
        emoji: string;
        category?: "career" | "relationships" | "creativity" | "wealth" | "health";
    }>;
    otherQuestions: Array<{
        id: string;
        title: string;
        description: string;
    }>;
}

export const mockQuestionAnswers: Record<string, QuestionAnswer> = {
    "1": {
        id: "1",
        question: {
            title: "Why do I attract the wrong people?",
            description: "Learn why you keep ending up with partners who drain your energy or create drama, and the exact pattern that's causing it—plus how to break the cycle.",
        },
        answer: `Your birth chart reveals a fascinating pattern: you have a strong Fire-I element at your core, which naturally draws you toward people who seem exciting and dynamic. However, your chart also shows a significant Water-I influence in your relationship sector, creating a magnetic pull toward emotionally intense connections—even when they're not healthy for you.

The technical basis for this lies in what's called a "Branch Clash" between your Day Master (your core self) and your relationship pillar. This creates a pattern where you're unconsciously attracted to partners who mirror your internal conflicts. The Water-I energy in your relationship sector amplifies emotional intensity, making dramatic or draining relationships feel "normal" or even necessary.

Here's what's happening: your Fire-I nature craves passion and excitement, but the Water-I in your relationships creates a dynamic where you're constantly trying to "fix" or "save" partners who have unresolved emotional patterns. This isn't about you being a bad judge of character—it's about your chart creating a specific energetic match that feels familiar, even when it's not beneficial.

The good news? Understanding this pattern is the first step to breaking it. Your chart also shows strong Earth-O energy in your career foundation, which means you have the capacity for stability and healthy boundaries—you just need to consciously activate it in your relationships.`,

        actionableItems: [
            {
                title: "Recognize the Pattern",
                description: "Before entering any new relationship, pause and ask: 'Does this person feel familiar in a way that's actually healthy, or am I being drawn to their intensity?' Your Fire-I nature loves excitement, but not all intensity is good intensity.",
                emoji: "🔍",
                category: "relationships",
            },
            {
                title: "Activate Your Earth Energy",
                description: "Your Earth-O foundation represents stability and boundaries. Practice saying 'no' to emotional drama, even when it feels uncomfortable. Set clear boundaries early in relationships, and notice if potential partners respect them or push against them.",
                emoji: "🛡️",
                category: "relationships",
            },
            {
                title: "Seek Complementary Energies",
                description: "Instead of being drawn to Water-I intensity, look for partners with Wood-O or Earth-O energy in their charts. These elements support your Fire-I nature without creating the draining dynamic. Use compatibility reports to identify these matches before investing emotionally.",
                emoji: "🌳",
                category: "relationships",
            },
        ],
        otherQuestions: [
            {
                id: "2",
                title: "What's sabotaging my success?",
                description: "Find out the specific self-sabotaging behavior you keep repeating and why you do it unconsciously.",
            },
            {
                id: "3",
                title: "Why do I always feel stuck?",
                description: "Discover the hidden pattern that keeps you in the same cycles—whether it's staying in dead-end jobs or repeating relationship mistakes.",
            },
            {
                id: "4",
                title: "What makes me different from everyone else?",
                description: "Learn about the rare combination of traits you have and how it affects everything from how you work to how you connect with others.",
            },
            {
                id: "5",
                title: "Why do people either love or hate me?",
                description: "Understand why you create such strong reactions—some people are drawn to you immediately while others can't stand you.",
            },
        ],
    },
    "2": {
        id: "2",
        question: {
            title: "What's sabotaging my success?",
            description: "Find out the specific self-sabotaging behavior you keep repeating (like procrastinating on big opportunities or pushing away help) and why you do it unconsciously.",
        },
        answer: `Your chart reveals a powerful but conflicting pattern: you have Metal-O energy in your output sector (Shang Guan), which gives you incredible creative expression and the ability to communicate your ideas brilliantly. However, this same energy is being "controlled" by Fire-O in your career foundation, creating what's called a "Controlling" relationship in BaZi.

This technical pattern manifests as self-sabotage because your natural creative output (Metal-O) feels constantly restricted by internal pressure (Fire-O controlling Metal). You have amazing ideas and the talent to execute them, but something inside you creates resistance—often at the exact moment when success is within reach.

The unconscious pattern works like this: when opportunities arise that could lead to significant success, your Fire-O career foundation activates a fear response. This isn't about laziness or lack of ambition—it's about your chart creating an internal conflict where your creative self (Metal-O) and your career foundation (Fire-O) are in constant tension.

You might notice you procrastinate on big projects, push away mentors who could help, or find reasons to delay important decisions. This happens because your chart is trying to "balance" the controlling relationship, but it's doing so in a way that limits your potential rather than supporting it.`,

        actionableItems: [
            {
                title: "Name the Pattern",
                description: "When you feel resistance to a big opportunity, pause and say out loud: 'This is my Fire-O controlling my Metal-O. This resistance is a pattern, not a truth.' Acknowledging the pattern reduces its power over you.",
                emoji: "💬",
                category: "career",
            },
            {
                title: "Break the Cycle with Small Wins",
                description: "Instead of waiting for the 'perfect' moment to tackle big projects, commit to completing one small task daily. Your Metal-O creativity thrives on momentum—each small win builds confidence and weakens the self-sabotage pattern.",
                emoji: "🎯",
                category: "career",
            },
            {
                title: "Accept Help Consciously",
                description: "When someone offers help or mentorship, notice the urge to decline. Instead, say 'yes' even if it feels uncomfortable. Your Fire-O foundation needs to learn that accepting support doesn't mean losing control—it means amplifying your Metal-O creative power.",
                emoji: "🤝",
                category: "career",
            },
        ],
        otherQuestions: [
            {
                id: "1",
                title: "Why do I attract the wrong people?",
                description: "Learn why you keep ending up with partners who drain your energy or create drama, and the exact pattern that's causing it.",
            },
            {
                id: "3",
                title: "Why do I always feel stuck?",
                description: "Discover the hidden pattern that keeps you in the same cycles—whether it's staying in dead-end jobs or repeating relationship mistakes.",
            },
            {
                id: "4",
                title: "What makes me different from everyone else?",
                description: "Learn about the rare combination of traits you have and how it affects everything from how you work to how you connect with others.",
            },
            {
                id: "5",
                title: "Why do people either love or hate me?",
                description: "Understand why you create such strong reactions—some people are drawn to you immediately while others can't stand you.",
            },
        ],
    },
    "3": {
        id: "3",
        question: {
            title: "Why do I always feel stuck?",
            description: "Discover the hidden pattern that keeps you in the same cycles—whether it's staying in dead-end jobs, repeating relationship mistakes, or feeling like you can't move forward.",
        },
        answer: `Your birth chart shows a fascinating pattern called "Branch Clash" between your Day Master (your core self) and your career foundation. This creates a feeling of being "stuck" because your natural forward momentum (Fire-I) is constantly being blocked by internal resistance (Water-I in your career pillar).

The technical basis: when your Day Master (Fire-I) tries to move forward, it encounters Water-I energy in your career foundation, which creates a "clash" that feels like hitting an invisible wall. This isn't about external circumstances—it's about your chart creating an internal dynamic where progress feels impossible, even when opportunities are right in front of you.

You might notice this pattern in multiple areas: staying in jobs that don't fulfill you because "at least it's stable," repeating relationship patterns because "it's what I know," or avoiding big life changes because "what if it gets worse?" The stuck feeling comes from your Fire-I nature wanting to move forward while your Water-I foundation creates fear and resistance.

The key insight: this isn't a character flaw or lack of motivation. It's a specific energetic pattern in your chart that can be understood and worked with. Your chart also shows strong Wood-O energy in your luck cycles, which means you actually have periods of significant growth and movement—you just need to learn how to recognize and activate them.`,

        actionableItems: [
            {
                title: "Identify the Stuck Pattern",
                description: "When you feel stuck, ask yourself: 'What am I afraid will happen if I move forward?' Your Water-I foundation creates fear of change, but naming the fear reduces its power. Write down the worst-case scenario—you'll often find it's not as catastrophic as it feels.",
                emoji: "📝",
                category: "career",
            },
            {
                title: "Use Your Wood-O Growth Cycles",
                description: "Your chart shows Wood-O energy in your luck cycles, which represents growth and expansion. Track when these cycles are active (check your forecast) and use those periods to make major changes. Your Fire-I nature aligns perfectly with Wood-O energy, making movement feel natural rather than forced.",
                emoji: "🌱",
                category: "career",
            },
            {
                title: "Make One Small Change",
                description: "Instead of trying to change everything at once, commit to one small action that breaks your current pattern. If you're stuck in a job, update your resume. If you're stuck in a relationship, have one honest conversation. Small actions create momentum that weakens the \"stuck\" feeling.",
                emoji: "⚡",
                category: "career",
            },
        ],
        otherQuestions: [
            {
                id: "1",
                title: "Why do I attract the wrong people?",
                description: "Learn why you keep ending up with partners who drain your energy or create drama, and the exact pattern that's causing it.",
            },
            {
                id: "2",
                title: "What's sabotaging my success?",
                description: "Find out the specific self-sabotaging behavior you keep repeating and why you do it unconsciously.",
            },
            {
                id: "4",
                title: "What makes me different from everyone else?",
                description: "Learn about the rare combination of traits you have and how it affects everything from how you work to how you connect with others.",
            },
            {
                id: "5",
                title: "Why do people either love or hate me?",
                description: "Understand why you create such strong reactions—some people are drawn to you immediately while others can't stand you.",
            },
        ],
    },
};
