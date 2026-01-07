"use client";

import {
    AreaChart,
    CartesianGrid,
    XAxis,
    ResponsiveContainer,
    Tooltip,
    Area,
} from "recharts";

const momentumData = [
    { age: "0", identity: 40, friction: 15 },
    { age: "4", identity: 45, friction: 20 },
    { age: "8", identity: 30, friction: 55 },
    { age: "12", identity: 20, friction: 90 },
    { age: "14", identity: 35, friction: 65 },
    { age: "17", identity: 60, friction: 30 },
];

const turningPoints = [
    {
        label: "Turning Point 1",
        description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`,
        year: "1997",
        examples: ["Example 1", "Example 2", "Example 3"],
    },
    {
        label: "Turning Point 2",
        description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`,
        year: "2001",
        examples: ["Example 4", "Example 5", "Example 6"],
    },
    {
        label: "Turning Point 3",
        description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`,
        year: "2005",
        examples: ["Example 7", "Example 8"],
    },
];

export default function TurningPointSection() {
    return (
        <section
            id="turning-point"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Content first on mobile, first on desktop (content-first pattern) */}
                <div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        The Turning Points
                    </h2>
                    <div className="text-lg md:text-xl text-slate-500 mb-8 md:mb-12 leading-relaxed">
                        Major energetic shifts identified through the
                        intersection of your internal blueprint and external
                        temporal cycles. These are the nodes where the
                        trajectory of your life underwent fundamental
                        restructuring.
                    </div>
                </div>
                <div className="h-[400px] w-full bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={momentumData}>
                            <defs>
                                <linearGradient
                                    id="identityGrad"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#06b6d4"
                                        stopOpacity={0.15}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#06b6d4"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="10 10"
                                stroke="#f1f5f9"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="age"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#cbd5e1",
                                    fontSize: 11,
                                    fontWeight: "bold",
                                }}
                                dy={20}
                            />
                            <Tooltip
                                cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-4 shadow-2xl border border-gray-100 rounded-xl text-[11px]">
                                                <p className="font-black text-[#2d333f] mb-2 uppercase">
                                                    Age {payload[0].payload.age}
                                                </p>
                                                <div className="space-y-1">
                                                    <p className="text-cyan-600 font-bold">
                                                        Harmony:{" "}
                                                        {payload[0].value}%
                                                    </p>
                                                    <p className="text-gray-300 font-bold">
                                                        Conflict:{" "}
                                                        {payload[1].value}%
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="identity"
                                stroke="#06b6d4"
                                fill="url(#identityGrad)"
                                strokeWidth={4}
                                dot={{
                                    r: 6,
                                    fill: "#06b6d4",
                                    strokeWidth: 4,
                                    stroke: "#fff",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="friction"
                                stroke="#e2e8f0"
                                fill="transparent"
                                strokeWidth={2}
                                strokeDasharray="8 6"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-6 mt-12">
                    {turningPoints.map((turningPoint) => (
                        <div
                            key={turningPoint.label}
                            className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="rounded-lg bg-slate-100 flex items-center justify-center">
                                    <div className="text-slate-900 font-bold text-lg py-1 px-2">
                                        {turningPoint.year}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold">
                                    {turningPoint.label}
                                </h3>
                            </div>
                            <span className="text-slate-500">
                                {turningPoint.description}
                            </span>
                            <span className="ml-2 text-nowrap cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-300 text-slate-500 font-medium leading-relaxed px-2 py-1 rounded-full text-sm border border-slate-200">
                                Why?
                            </span>
                            <div className="mt-6">
                                <h2 className="font-bold mb-4">
                                    Example Outcomes
                                </h2>
                                <div className="flex items-center gap-2">
                                    {turningPoint.examples.map((example) => (
                                        <div
                                            key={example}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="rounded-full bg-slate-100 border border-slate-100 px-2 py-1">
                                                <p className="text-slate-500 text-sm">
                                                    {example}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
