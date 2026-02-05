/**
 * Mock data for the new compatibility report structure
 * This matches the new API response format
 */

export const mockCompatibilityReport = {
    pairingTitle: {
        name: "The Growth Dynamic",
        subtitle: "Fire meets Wood in generative energy",
    },
    introduction:
        "When Fire and Wood come together, they create a relationship built on mutual growth and inspiration. Your Fire energy ignites their Wood potential, while their Wood provides the fuel for your Fire to burn brighter. This pairing thrives on dynamic exchange and forward momentum.",
    person1: {
        gender: "male" as const,
        identity: {
            code: "Fire-I",
            title: "The Focused Refiner",
            element: "Fire",
            polarity: "Yin",
        },
        elementDistribution: {
            elements: [
                {
                    element: "FIRE",
                    count: 3,
                    percentage: 37.5,
                    emoji: "🔥",
                },
                {
                    element: "WOOD",
                    count: 2,
                    percentage: 25.0,
                    emoji: "🌳",
                },
                {
                    element: "EARTH",
                    count: 2,
                    percentage: 25.0,
                    emoji: "⛰️",
                },
                {
                    element: "METAL",
                    count: 1,
                    percentage: 12.5,
                    emoji: "⚔️",
                },
                {
                    element: "WATER",
                    count: 0,
                    percentage: 0,
                    emoji: "💧",
                },
            ],
            dominant: ["FIRE", "WOOD"],
            missing: ["WATER"],
        },
    },
    person2: {
        gender: "female" as const,
        identity: {
            code: "Wood-Y",
            title: "The Nurturing Builder",
            element: "Wood",
            polarity: "Yang",
        },
        elementDistribution: {
            elements: [
                {
                    element: "WOOD",
                    count: 4,
                    percentage: 50.0,
                    emoji: "🌳",
                },
                {
                    element: "FIRE",
                    count: 2,
                    percentage: 25.0,
                    emoji: "🔥",
                },
                {
                    element: "WATER",
                    count: 1,
                    percentage: 12.5,
                    emoji: "💧",
                },
                {
                    element: "EARTH",
                    count: 1,
                    percentage: 12.5,
                    emoji: "⛰️",
                },
                {
                    element: "METAL",
                    count: 0,
                    percentage: 0,
                    emoji: "⚔️",
                },
            ],
            dominant: ["WOOD", "FIRE"],
            missing: ["METAL"],
        },
    },
    rarity: {
        oneIn: 3847,
        percentile: 99.97,
        description: "Rarer than 99.97% of all pairings",
    },
    categories: [
        {
            category: "romance" as const,
            emoji: "💕",
            title: "Romance",
            subCategories: [
                {
                    title: "Emotional Expression",
                    person1Analysis:
                        "They express emotions through focused intensity and refinement. When they feel something deeply, it shows in their commitment to perfecting the moment or relationship dynamic.",
                    person2Analysis:
                        "You express emotions through growth and nurturing. You show care by helping things develop, creating space for expansion, and building something meaningful together.",
                    result: {
                        score: "Highly Compatible" as const,
                        match: "Strong Match",
                        analysis:
                            "Your emotional expression styles complement beautifully. Their focused intensity provides structure to your expansive nurturing, while your growth-oriented approach helps them refine and deepen their emotional connections. You both value depth, just express it differently.",
                        actionableTip:
                            "When they need space to process, give them time. When you need to express growth, invite them into the process rather than doing it alone.",
                    },
                },
                {
                    title: "Intimacy & Connection",
                    person1Analysis:
                        "They seek intimacy through refinement and focused attention. Deep connection comes from perfecting moments together and understanding each other's core essence.",
                    person2Analysis:
                        "You seek intimacy through shared growth and building together. Connection deepens when you're both expanding, learning, and creating something meaningful as a team.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your approaches to intimacy are different but complementary. Their focus on refinement helps you appreciate the details in your growth journey, while your emphasis on building together gives them a sense of shared purpose and expansion.",
                    },
                },
                {
                    title: "Conflict Resolution",
                    person1Analysis:
                        "They handle conflict by focusing on the core issue and refining the solution. They prefer to address problems directly and systematically.",
                    person2Analysis:
                        "You handle conflict by looking at the bigger picture and finding ways to grow from it. You prefer to understand the underlying dynamics and build a better foundation.",
                    result: {
                        score: "Neutral" as const,
                        match: "Balanced",
                        analysis:
                            "Your conflict styles can work well together if you respect each other's approach. They'll want to fix the immediate issue, while you'll want to understand the pattern. Both are valid—try to do both.",
                    },
                },
                {
                    title: "Long-term Vision",
                    person1Analysis:
                        "They envision a future where things are refined, perfected, and deeply understood. They value consistency and gradual improvement over time.",
                    person2Analysis:
                        "You envision a future where you're both growing, expanding, and building something meaningful together. You value progress and development over perfection.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your long-term visions align well. Their focus on refinement helps ensure quality in your growth, while your emphasis on expansion helps them see beyond perfection to possibility. Together, you can build something both refined and expansive.",
                    },
                },
            ],
        },
        {
            category: "work" as const,
            emoji: "💼",
            title: "Work",
            subCategories: [
                {
                    title: "Communication Style",
                    person1Analysis:
                        "They communicate with precision and focus. They prefer clear, refined messages that get to the essence quickly.",
                    person2Analysis:
                        "You communicate through exploration and building on ideas. You prefer open-ended discussions that allow for growth and development.",
                    result: {
                        score: "Neutral" as const,
                        match: "Balanced",
                        analysis:
                            "Your communication styles require patience. They'll want to get to the point quickly, while you'll want to explore possibilities. Both approaches have value—find a middle ground.",
                    },
                },
                {
                    title: "Decision Making",
                    person1Analysis:
                        "They make decisions by refining options and focusing on the best choice. They prefer systematic evaluation.",
                    person2Analysis:
                        "You make decisions by exploring possibilities and building on potential. You prefer to see how things develop.",
                    result: {
                        score: "Challenging" as const,
                        match: "Requires Effort",
                        analysis:
                            "Your decision-making styles can create friction. They'll want to narrow down quickly, while you'll want to keep options open. This requires conscious compromise.",
                    },
                },
                {
                    title: "Work Pace & Energy",
                    person1Analysis:
                        "They work with focused intensity, preferring deep work on specific tasks. They value consistency and refinement.",
                    person2Analysis:
                        "You work with expansive energy, preferring to build and grow multiple projects. You value progress and development.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your work energies complement each other. Their focus helps you prioritize, while your expansiveness helps them see beyond the immediate task. Together, you can achieve both depth and breadth.",
                    },
                },
                {
                    title: "Collaboration Approach",
                    person1Analysis:
                        "They collaborate by focusing on their strengths and refining the shared output. They prefer clear roles and responsibilities.",
                    person2Analysis:
                        "You collaborate by building together and growing the project. You prefer fluid roles and shared ownership.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your collaboration styles can work well together. Their focus on roles provides structure, while your emphasis on building together creates flexibility. Find a balance that honors both.",
                    },
                },
            ],
        },
        {
            category: "lifestyle" as const,
            emoji: "🏠",
            title: "Lifestyle",
            subCategories: [
                {
                    title: "Daily Routines",
                    person1Analysis:
                        "They prefer structured routines that allow for focused refinement. Consistency and predictability help them thrive.",
                    person2Analysis:
                        "You prefer flexible routines that allow for growth and adaptation. Variety and spontaneity help you thrive.",
                    result: {
                        score: "Challenging" as const,
                        match: "Requires Effort",
                        analysis:
                            "Your routine preferences can create tension. They'll want structure, while you'll want flexibility. This requires compromise and understanding.",
                    },
                },
                {
                    title: "Social Preferences",
                    person1Analysis:
                        "They prefer smaller, more intimate social settings where they can focus on quality connections.",
                    person2Analysis:
                        "You prefer diverse social settings where you can grow and expand your network.",
                    result: {
                        score: "Neutral" as const,
                        match: "Balanced",
                        analysis:
                            "Your social preferences can complement each other. They'll help you appreciate depth, while you'll help them appreciate variety. Find a balance that works for both.",
                    },
                },
                {
                    title: "Financial Values",
                    person1Analysis:
                        "They value financial stability and refinement. They prefer careful planning and gradual improvement.",
                    person2Analysis:
                        "You value financial growth and building wealth. You prefer investing in opportunities and expansion.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your financial values can work well together. Their focus on stability provides a foundation, while your emphasis on growth provides opportunity. Together, you can build both security and expansion.",
                    },
                },
                {
                    title: "Life Priorities",
                    person1Analysis:
                        "They prioritize refinement, quality, and deep understanding. They value consistency and gradual improvement.",
                    person2Analysis:
                        "You prioritize growth, expansion, and building something meaningful. You value progress and development.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your life priorities complement each other. Their focus on quality ensures your growth is meaningful, while your emphasis on expansion helps them see beyond perfection to possibility.",
                    },
                },
            ],
        },
        {
            category: "communication" as const,
            emoji: "💬",
            title: "Communication",
            subCategories: [
                {
                    title: "Communication Style",
                    person1Analysis:
                        "They communicate with precision and focus, preferring clear, refined messages.",
                    person2Analysis:
                        "You communicate through exploration and building on ideas, preferring open-ended discussions.",
                    result: {
                        score: "Neutral" as const,
                        match: "Balanced",
                        analysis:
                            "Your communication styles require patience and understanding. Both approaches have value—find a middle ground that honors both.",
                    },
                },
                {
                    title: "Conflict Approach",
                    person1Analysis:
                        "They approach conflict by focusing on the core issue and refining the solution systematically.",
                    person2Analysis:
                        "You approach conflict by looking at the bigger picture and finding ways to grow from it.",
                    result: {
                        score: "Neutral" as const,
                        match: "Balanced",
                        analysis:
                            "Your conflict approaches can work together if you respect each other's style. Both are valid—try to do both.",
                    },
                },
                {
                    title: "Support & Needs",
                    person1Analysis:
                        "They need support in the form of focused attention and understanding of their refinement process.",
                    person2Analysis:
                        "You need support in the form of space to grow and encouragement in your building process.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your support needs complement each other. They'll provide focus to your growth, while you'll provide expansion to their refinement. Together, you can support each other's development.",
                    },
                },
                {
                    title: "Shared Values",
                    person1Analysis:
                        "They value depth, quality, and refinement in all aspects of life.",
                    person2Analysis:
                        "You value growth, expansion, and building something meaningful.",
                    result: {
                        score: "Compatible" as const,
                        match: "Good Match",
                        analysis:
                            "Your shared values align well. Both of you value meaningful connection and development, just expressed differently. This creates a strong foundation for your relationship.",
                    },
                },
            ],
        },
    ],
    overview:
        "This Fire-Wood pairing creates a dynamic relationship built on mutual growth and inspiration. Your Fire energy ignites their Wood potential, while their Wood provides the fuel for your Fire to burn brighter. In romance, you'll find deep emotional connection through complementary expression styles—their focused intensity provides structure to your expansive nurturing, while your growth-oriented approach helps them refine and deepen their connections. In work, your energies complement beautifully: their focus helps you prioritize, while your expansiveness helps them see beyond the immediate task. Lifestyle differences around routines and social preferences will require compromise, but your shared values around quality and meaningful development create a strong foundation. Communication requires patience as you balance their preference for precision with your preference for exploration, but both approaches have value. Overall, this is a highly compatible pairing that thrives on dynamic exchange and forward momentum.",
    chartDisplay: {
        person1: {
            dayMaster: {
                characters: "丁",
                element: "Fire",
                animal: "Rooster",
                polarity: "Yin",
                archetype: "The Refiner",
            },
        },
        person2: {
            dayMaster: {
                characters: "甲",
                element: "Wood",
                animal: "Tiger",
                polarity: "Yang",
                archetype: "The Builder",
            },
        },
        interaction: {
            visual: "Fire ignites Wood, creating growth",
            type: "Generative",
            description:
                "Your Fire energy naturally supports their Wood growth, while their Wood provides fuel for your Fire. This creates a mutually beneficial cycle of inspiration and development.",
        },
        fullCharts: {
            person1: [
                {
                    pillar: "Year",
                    characters: "癸酉",
                    meaning: "Water Rooster",
                    isCore: false,
                },
                {
                    pillar: "Month",
                    characters: "丁巳",
                    meaning: "Fire Snake",
                    isCore: true,
                },
                {
                    pillar: "Day",
                    characters: "丁酉",
                    meaning: "Fire Rooster",
                    isCore: true,
                },
                {
                    pillar: "Hour",
                    characters: "己亥",
                    meaning: "Earth Pig",
                    isCore: false,
                },
            ],
            person2: [
                {
                    pillar: "Year",
                    characters: "甲寅",
                    meaning: "Wood Tiger",
                    isCore: true,
                },
                {
                    pillar: "Month",
                    characters: "丙寅",
                    meaning: "Fire Tiger",
                    isCore: true,
                },
                {
                    pillar: "Day",
                    characters: "甲寅",
                    meaning: "Wood Tiger",
                    isCore: true,
                },
                {
                    pillar: "Hour",
                    characters: "戊辰",
                    meaning: "Earth Dragon",
                    isCore: false,
                },
            ],
        },
    },
    specialConnections: [
        {
            title: "Generative Cycle Harmony",
            emoji: "✨",
            rarity: "Rare",
            category: "element-harmony" as const,
            description:
                "Your Fire-Wood pairing creates a natural generative cycle where your energies support and amplify each other. This is a rare and powerful connection.",
        },
        {
            title: "Complementary Polarity",
            emoji: "⚖️",
            rarity: "Common",
            category: "polarity-balance" as const,
            description:
                "Your Yin-Yang balance creates natural harmony. Your different polarities complement each other beautifully.",
        },
    ],
    technicalBasis: {
        elementInteraction: {
            person1Element: "Fire",
            person2Element: "Wood",
            interactionType: "Generative" as const,
            cycle: "Fire generates Earth, Earth generates Metal, Metal generates Water, Water generates Wood, Wood generates Fire",
            explanation:
                "In the generative cycle, Wood generates Fire. This means their Wood energy naturally supports and fuels your Fire energy, creating a mutually beneficial relationship where both energies are amplified.",
        },
        traditionalFactors: [
            "Day Master compatibility",
            "Element distribution balance",
            "Pillar interactions",
            "Seasonal influences",
        ],
    },
    generatedAt: new Date().toISOString(),
    reportType: "compatibility-premium" as const,
};
