"use client";

import { useState } from "react";
import {
    ChevronRight,
    Lock,
    Sparkles,
    Zap,
    Target,
    Loader2,
} from "lucide-react";
import type { TenYearCycle, TenYearCycleData } from "@/types/forecast";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface TenYearCycleTabProps {
    data: TenYearCycle;
}

// TODO: Create server action to fetch cycle data
// async function fetchCycleData(startYear: number, endYear: number): Promise<TenYearCycleData> {
//     const response = await apiClient(`/forecast/cycles/${startYear}-${endYear}`);
//     return response.json();
// }

function getEnergyColor(energy: number): string {
    if (energy >= 8) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (energy >= 6) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-slate-600 bg-slate-50 border-slate-200";
}

function getEnergyGradient(energy: number): string {
    if (energy >= 8) return "from-emerald-50 to-green-50";
    if (energy >= 6) return "from-amber-50 to-yellow-50";
    return "from-slate-50 to-slate-100";
}

export default function TenYearCycleTab({ data }: TenYearCycleTabProps) {
    const [selectedIndex, setSelectedIndex] = useState(
        data.selectedCycleIndex || 0
    );
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingCycles, setLoadingCycles] = useState<Set<number>>(new Set());
    const [cycles, setCycles] = useState<TenYearCycleData[]>(data.cycles);
    const currentYear = new Date().getFullYear();

    const selectedCycle = cycles[selectedIndex];
    const isPastCycle = selectedCycle.endYear < currentYear;
    const isCurrentCycle =
        selectedCycle.startYear <= currentYear &&
        selectedCycle.endYear >= currentYear;
    const isLocked = !isPastCycle;
    const isCycleGenerated = selectedCycle.isGenerated || !!selectedCycle.theme;

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        setSubscriptionModalOpen(false);
    };

    const handleCycleSelect = async (index: number) => {
        const cycle = cycles[index];
        const cycleYear = new Date().getFullYear();
        const isLockedCycle = cycle.endYear >= cycleYear;

        if (isLockedCycle) {
            setSubscriptionModalOpen(true);
            return;
        }

        // If cycle data is not generated, fetch it
        if (!cycle.isGenerated && !cycle.theme) {
            setLoadingCycles((prev) => new Set(prev).add(index));
            setSelectedIndex(index);

            try {
                // TODO: Replace with actual API call
                // const cycleData = await fetchCycleData(cycle.startYear, cycle.endYear);
                // setCycles(prev => prev.map((c, i) => i === index ? { ...c, ...cycleData, isGenerated: true } : c));

                // For now, simulate loading delay
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Mock: Mark as generated (remove this when real API is ready)
                setCycles((prev) =>
                    prev.map((c, i) =>
                        i === index
                            ? { ...c, isGenerated: true, theme: "Loading..." }
                            : c
                    )
                );
            } catch (error) {
                console.error("Failed to load cycle data:", error);
            } finally {
                setLoadingCycles((prev) => {
                    const next = new Set(prev);
                    next.delete(index);
                    return next;
                });
            }
        } else {
            setSelectedIndex(index);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlePrevious = () => {
        if (selectedIndex > 0) {
            handleCycleSelect(selectedIndex - 1);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleNext = () => {
        if (selectedIndex < data.cycles.length - 1) {
            handleCycleSelect(selectedIndex + 1);
        }
    };

    return (
        <ResponsiveLayout>
            <div className="pt-8 md:pt-12 pb-12 md:pb-16">
                {/* Header Section */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-3 tracking-tight">
                        10-Year Life Cycles
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                        Your life unfolds in 10-year cycles, each with distinct
                        energy patterns, opportunities, and challenges.
                        Understanding these cycles helps you make better
                        decisions about career moves, relationships,
                        investments, and major life changes.
                    </p>
                </div>

                {/* Split Layout: Timeline + Details */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left: Vertical Timeline */}
                    <div className="lg:w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-8 lg:top-24">
                            <h3 className="text-lg font-medium text-slate-900 mb-4">
                                Your Life Timeline
                            </h3>

                            <div className="relative">
                                {/* Timeline Line - Will extend based on content */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

                                {/* Cycle Items */}
                                <div className="space-y-4">
                                    {cycles.map((cycle, index) => {
                                        const isPast =
                                            cycle.endYear < currentYear;
                                        const isLockedCycle = !isPast;
                                        const isSelected =
                                            index === selectedIndex;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    handleCycleSelect(index)
                                                }
                                                className="w-full text-left relative group"
                                            >
                                                {/* Timeline Dot */}
                                                <div className="absolute left-4 top-5 z-10">
                                                    <div
                                                        className={`w-4 h-4 rounded-full border-2 ${
                                                            isSelected
                                                                ? "bg-slate-900 border-slate-900"
                                                                : isPast
                                                                ? "bg-white border-slate-400"
                                                                : "bg-white border-slate-300"
                                                        } transition-all`}
                                                    />
                                                </div>

                                                {/* Cycle Card */}
                                                <div
                                                    className={`ml-10 bg-white border ${
                                                        isSelected
                                                            ? "border-slate-900 shadow-md"
                                                            : "border-slate-200"
                                                    } rounded-sm p-4 transition-all hover:shadow-sm hover:border-slate-300 relative`}
                                                >
                                                    {/* Selected Indicator - Left Border */}
                                                    {isSelected && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900 rounded-l-sm" />
                                                    )}

                                                    {/* Year Range */}
                                                    <div className="text-lg font-serif font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                                                        <span>
                                                            {cycle.startYear} -{" "}
                                                            {cycle.endYear}
                                                        </span>
                                                        {isLockedCycle && (
                                                            <span className="text-base grayscale group-hover:hidden">
                                                                🔒
                                                            </span>
                                                        )}
                                                        {isLockedCycle && (
                                                            <span className="text-base hidden group-hover:inline-block">
                                                                🔓
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Theme */}
                                                    {cycle.theme ||
                                                    cycle.cinematicName ? (
                                                        <h4 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                                                            {cycle.cinematicName ||
                                                                cycle.theme}
                                                        </h4>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                            <span>
                                                                Click to
                                                                generate report
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Cycle Details */}
                    <div className="flex-1 min-w-0">
                        {/* Loading State */}
                        {!isLocked && selectedCycle && !isCycleGenerated && (
                            <div className="flex flex-col items-center justify-center py-16 md:py-24 space-y-4">
                                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                                <p className="text-sm text-slate-500">
                                    Generating your {selectedCycle.startYear}-
                                    {selectedCycle.endYear} cycle report...
                                </p>
                            </div>
                        )}

                        {/* Cycle Details - Only show if past cycle is selected and generated */}
                        {!isLocked && selectedCycle && isCycleGenerated && (
                            <div className="space-y-12 md:space-y-16">
                                {/* Cycle Overview */}
                                <section className="border-t border-slate-200 pt-8 md:pt-12">
                                    <div className="space-y-8">
                                        {/* Cinematic Header */}
                                        <div>
                                            {selectedCycle.cinematicName && (
                                                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                    {selectedCycle.startYear} -{" "}
                                                    {selectedCycle.endYear}
                                                </div>
                                            )}
                                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
                                                {selectedCycle.cinematicName ||
                                                    selectedCycle.theme}
                                            </h3>
                                            {selectedCycle.hook && (
                                                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl italic">
                                                    {selectedCycle.hook}
                                                </p>
                                            )}
                                            {!selectedCycle.hook && (
                                                <p className="text-base text-slate-600">
                                                    {selectedCycle.startYear} -{" "}
                                                    {selectedCycle.endYear}
                                                </p>
                                            )}
                                        </div>

                                        {/* Stat Shift Visualization */}
                                        {selectedCycle.statShift &&
                                            selectedCycle.statShift.length >
                                                0 && (
                                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-sm p-6 md:p-8">
                                                    <h4 className="text-lg font-semibold text-slate-900 mb-6">
                                                        Your Stat Shift
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {selectedCycle.statShift.map(
                                                            (stat, index) => {
                                                                const isPositive =
                                                                    stat.change >
                                                                    0;
                                                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                                const changePercent =
                                                                    Math.abs(
                                                                        stat.change
                                                                    );
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="space-y-2"
                                                                    >
                                                                        <div className="flex items-center justify-between text-sm">
                                                                            <span className="font-medium text-slate-700">
                                                                                {
                                                                                    stat.category
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                className={`font-semibold ${
                                                                                    isPositive
                                                                                        ? "text-emerald-600"
                                                                                        : "text-red-600"
                                                                                }`}
                                                                            >
                                                                                {isPositive
                                                                                    ? "+"
                                                                                    : ""}
                                                                                {
                                                                                    stat.change
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-4">
                                                                            {/* Before */}
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                                                                    <span>
                                                                                        Before
                                                                                    </span>
                                                                                    <span>
                                                                                        {stat.currentValue >
                                                                                        0
                                                                                            ? "+"
                                                                                            : ""}
                                                                                        {
                                                                                            stat.currentValue
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                                                    <div
                                                                                        className={`h-2 rounded-full ${
                                                                                            stat.currentValue >=
                                                                                            0
                                                                                                ? "bg-slate-400"
                                                                                                : "bg-red-300"
                                                                                        }`}
                                                                                        style={{
                                                                                            width: `${Math.min(
                                                                                                100,
                                                                                                Math.abs(
                                                                                                    stat.currentValue
                                                                                                ) *
                                                                                                    5
                                                                                            )}%`,
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            {/* Arrow */}
                                                                            <div className="text-slate-400">
                                                                                <ChevronRight className="w-5 h-5" />
                                                                            </div>
                                                                            {/* After */}
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                                                                    <span>
                                                                                        After
                                                                                    </span>
                                                                                    <span>
                                                                                        {stat.newValue >
                                                                                        0
                                                                                            ? "+"
                                                                                            : ""}
                                                                                        {
                                                                                            stat.newValue
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                                                    <div
                                                                                        className={`h-2 rounded-full ${
                                                                                            stat.newValue >=
                                                                                            0
                                                                                                ? "bg-emerald-500"
                                                                                                : "bg-red-400"
                                                                                        }`}
                                                                                        style={{
                                                                                            width: `${Math.min(
                                                                                                100,
                                                                                                Math.abs(
                                                                                                    stat.newValue
                                                                                                ) *
                                                                                                    5
                                                                                            )}%`,
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Elemental Superpower */}
                                        {selectedCycle.elementalSuperpower && (
                                            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-2 border-amber-300 rounded-sm p-6 md:p-8">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                                                        <Zap className="w-6 h-6 text-amber-700" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-amber-900 mb-2">
                                                            Your Elemental
                                                            Superpower:{" "}
                                                            {
                                                                selectedCycle
                                                                    .elementalSuperpower
                                                                    .name
                                                            }
                                                        </h4>
                                                        <p className="text-base text-amber-800 leading-relaxed">
                                                            {
                                                                selectedCycle
                                                                    .elementalSuperpower
                                                                    .action
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* The Trap */}
                                        {selectedCycle.theTrap && (
                                            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-sm p-6 md:p-8">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-2xl">
                                                            ⚠
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-red-900 mb-2">
                                                            The{" "}
                                                            {
                                                                selectedCycle
                                                                    .theTrap
                                                                    .name
                                                            }
                                                        </h4>
                                                        <p className="text-base text-red-800 leading-relaxed mb-3">
                                                            {
                                                                selectedCycle
                                                                    .theTrap
                                                                    .description
                                                            }
                                                        </p>
                                                        <div className="bg-white/50 rounded-sm p-3 border border-red-200">
                                                            <div className="text-sm font-semibold text-red-900 mb-1">
                                                                The Way Out:
                                                            </div>
                                                            <p className="text-sm text-red-800">
                                                                {
                                                                    selectedCycle
                                                                        .theTrap
                                                                        .wayOut
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Key Insights Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Best For */}
                                            <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 md:p-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                        <span className="text-lg">
                                                            ✓
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-semibold text-emerald-900">
                                                        Best For
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {selectedCycle.bestFor?.map(
                                                        (item, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start gap-3 text-sm text-emerald-800"
                                                            >
                                                                <span className="text-emerald-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        )
                                                    ) || (
                                                        <>
                                                            <li className="flex items-start gap-3 text-sm text-emerald-800">
                                                                <span className="text-emerald-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Building
                                                                    long-term
                                                                    foundations
                                                                    and skills
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-3 text-sm text-emerald-800">
                                                                <span className="text-emerald-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Conservative
                                                                    financial
                                                                    planning and
                                                                    steady
                                                                    accumulation
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-3 text-sm text-emerald-800">
                                                                <span className="text-emerald-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Strengthening
                                                                    family and
                                                                    stable
                                                                    relationships
                                                                </span>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>

                                            {/* Avoid During */}
                                            <div className="bg-red-50 border border-red-200 rounded-sm p-6 md:p-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                        <span className="text-lg">
                                                            ⚠
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-semibold text-red-900">
                                                        Avoid During
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {selectedCycle.avoidDuring?.map(
                                                        (item, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start gap-3 text-sm text-red-800"
                                                            >
                                                                <span className="text-red-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        )
                                                    ) || (
                                                        <>
                                                            <li className="flex items-start gap-3 text-sm text-red-800">
                                                                <span className="text-red-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Risky
                                                                    investments
                                                                    or major
                                                                    financial
                                                                    gambles
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-3 text-sm text-red-800">
                                                                <span className="text-red-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Impulsive
                                                                    career
                                                                    changes
                                                                    without
                                                                    planning
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-3 text-sm text-red-800">
                                                                <span className="text-red-600 mt-0.5">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    Major life
                                                                    decisions
                                                                    during
                                                                    transition
                                                                    periods
                                                                </span>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                        Overall Energy
                                                    </div>
                                                    <div className="text-3xl font-bold text-slate-900 font-mono">
                                                        {
                                                            selectedCycle.overallEnergy
                                                        }
                                                        /10
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-1">
                                                        {selectedCycle.overallEnergy >=
                                                        8
                                                            ? "High energy period"
                                                            : selectedCycle.overallEnergy >=
                                                              6
                                                            ? "Moderate energy period"
                                                            : "Lower energy period"}
                                                    </div>
                                                </div>
                                                {selectedCycle.luckPillars &&
                                                    selectedCycle.luckPillars
                                                        .length > 0 && (
                                                        <div>
                                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                                Active Pillars
                                                            </div>
                                                            <div className="text-3xl font-bold text-slate-900">
                                                                {
                                                                    selectedCycle
                                                                        .luckPillars
                                                                        .length
                                                                }
                                                            </div>
                                                            <div className="text-xs text-slate-500 mt-1">
                                                                {selectedCycle
                                                                    .luckPillars
                                                                    .length > 1
                                                                    ? "Multiple influences active"
                                                                    : "Single pillar influence"}
                                                            </div>
                                                        </div>
                                                    )}
                                                {selectedCycle.transitions &&
                                                    selectedCycle.transitions
                                                        .length > 0 && (
                                                        <div>
                                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                                Major
                                                                Transitions
                                                            </div>
                                                            <div className="text-3xl font-bold text-slate-900">
                                                                {
                                                                    selectedCycle
                                                                        .transitions
                                                                        .length
                                                                }
                                                            </div>
                                                            <div className="text-xs text-slate-500 mt-1">
                                                                Significant
                                                                shifts in this
                                                                cycle
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Decade Roadmap - Three Acts */}
                                {selectedCycle.phases &&
                                    selectedCycle.phases.length > 0 && (
                                        <section className="border-t border-slate-200 pt-8 md:pt-12">
                                            <div className="mb-6 md:mb-8">
                                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-2">
                                                    The Decade Roadmap
                                                </h3>
                                                <p className="text-base text-slate-600">
                                                    Your 10-year journey unfolds
                                                    in three distinct acts—each
                                                    with its own purpose and
                                                    optimal timing
                                                </p>
                                            </div>

                                            <div className="space-y-6 md:space-y-8">
                                                {selectedCycle.phases.map(
                                                    (phase, index) => {
                                                        const actNumber =
                                                            index + 1;
                                                        const actLabel =
                                                            phase.act ===
                                                            "initiation"
                                                                ? "Act I: The Initiation"
                                                                : phase.act ===
                                                                  "peak"
                                                                ? "Act II: The Peak"
                                                                : phase.act ===
                                                                  "integration"
                                                                ? "Act III: The Integration"
                                                                : `Act ${actNumber}: ${phase.phase}`;

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`bg-white border-2 rounded-sm p-6 md:p-8 hover:shadow-lg transition-all ${
                                                                    phase.goldenWindow
                                                                        ? "border-amber-300 bg-gradient-to-br from-amber-50/50 to-yellow-50/50"
                                                                        : "border-slate-200"
                                                                }`}
                                                            >
                                                                {/* Act Header */}
                                                                <div className="flex items-start justify-between mb-4">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            <div
                                                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                                                                    phase.goldenWindow
                                                                                        ? "bg-amber-200 text-amber-900"
                                                                                        : "bg-slate-200 text-slate-700"
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    actNumber
                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                                                                    {
                                                                                        actLabel
                                                                                    }
                                                                                </div>
                                                                                <div className="text-sm font-semibold text-slate-700">
                                                                                    {
                                                                                        phase.years
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {phase.goldenWindow && (
                                                                            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200">
                                                                                <Sparkles className="w-3 h-3" />
                                                                                Golden
                                                                                Window
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={`px-4 py-2 rounded-sm border ${getEnergyColor(
                                                                            phase.energy
                                                                        )}`}
                                                                    >
                                                                        <div className="text-xs font-medium uppercase tracking-wider mb-1">
                                                                            Energy
                                                                        </div>
                                                                        <div className="text-xl font-bold font-mono">
                                                                            {
                                                                                phase.energy
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                                                                    {
                                                                        phase.theme
                                                                    }
                                                                </h4>

                                                                {/* Act-Specific Content */}
                                                                {phase.act ===
                                                                    "initiation" &&
                                                                    phase.whatToUnlearn && (
                                                                        <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-sm">
                                                                            <div className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
                                                                                What
                                                                                to
                                                                                Unlearn
                                                                            </div>
                                                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                                                {
                                                                                    phase.whatToUnlearn
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                {phase.act ===
                                                                    "integration" &&
                                                                    phase.preparation && (
                                                                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-sm">
                                                                            <div className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-2">
                                                                                Preparing
                                                                                for
                                                                                Next
                                                                                Shift
                                                                            </div>
                                                                            <p className="text-sm text-blue-800 leading-relaxed">
                                                                                {
                                                                                    phase.preparation
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                {/* Optimal Actions */}
                                                                {phase.optimalActions &&
                                                                    phase
                                                                        .optimalActions
                                                                        .length >
                                                                        0 && (
                                                                        <div className="mb-4">
                                                                            <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider mb-2">
                                                                                Optimal
                                                                                Actions
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                {phase.optimalActions.map(
                                                                                    (
                                                                                        action,
                                                                                        i
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className="flex items-start gap-2 text-sm text-slate-700"
                                                                                        >
                                                                                            <span className="text-emerald-600 mt-0.5">
                                                                                                ✓
                                                                                            </span>
                                                                                            <span>
                                                                                                {
                                                                                                    action
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                {/* Focus Areas */}
                                                                <div>
                                                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                                        Focus
                                                                        Areas
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {phase.focus.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="flex items-start gap-2 text-sm text-slate-600"
                                                                                >
                                                                                    <Target className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                                                                    <span>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </section>
                                    )}

                                {/* People Portfolio */}
                                {selectedCycle.peoplePortfolio && (
                                    <section className="border-t border-slate-200 pt-8 md:pt-12">
                                        <div className="mb-6 md:mb-8">
                                            <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-2">
                                                The People Portfolio
                                            </h3>
                                            <p className="text-base text-slate-600">
                                                Who will enter and exit your
                                                life during this cycle—based on
                                                your elemental interactions
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {selectedCycle.peoplePortfolio
                                                .mentors &&
                                                selectedCycle.peoplePortfolio
                                                    .mentors.length > 0 && (
                                                    <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 md:p-8">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                                <span className="text-lg">
                                                                    👥
                                                                </span>
                                                            </div>
                                                            <h4 className="text-lg font-semibold text-emerald-900">
                                                                The Mentors
                                                            </h4>
                                                        </div>
                                                        <p className="text-sm text-emerald-800 leading-relaxed mb-3">
                                                            Look for people who
                                                            can guide and
                                                            support you:
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {selectedCycle.peoplePortfolio.mentors.map(
                                                                (mentor, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="flex items-start gap-2 text-sm text-emerald-800"
                                                                    >
                                                                        <span className="text-emerald-600 mt-0.5">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                mentor
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}

                                            {selectedCycle.peoplePortfolio
                                                .friction &&
                                                selectedCycle.peoplePortfolio
                                                    .friction.length > 0 && (
                                                    <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 md:p-8">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                                                <span className="text-lg">
                                                                    ⚡
                                                                </span>
                                                            </div>
                                                            <h4 className="text-lg font-semibold text-amber-900">
                                                                The Friction
                                                            </h4>
                                                        </div>
                                                        <p className="text-sm text-amber-800 leading-relaxed mb-3">
                                                            These relationships
                                                            may challenge you:
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {selectedCycle.peoplePortfolio.friction.map(
                                                                (
                                                                    friction,
                                                                    i
                                                                ) => (
                                                                    <li
                                                                        key={i}
                                                                        className="flex items-start gap-2 text-sm text-amber-800"
                                                                    >
                                                                        <span className="text-amber-600 mt-0.5">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                friction
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}

                                            {selectedCycle.peoplePortfolio
                                                .newConnections && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-6 md:p-8">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <span className="text-lg">
                                                                ✨
                                                            </span>
                                                        </div>
                                                        <h4 className="text-lg font-semibold text-blue-900">
                                                            New Connections
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm text-blue-800 leading-relaxed">
                                                        {
                                                            selectedCycle
                                                                .peoplePortfolio
                                                                .newConnections
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {selectedCycle.peoplePortfolio
                                                .exits && (
                                                <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 md:p-8">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                            <span className="text-lg">
                                                                👋
                                                            </span>
                                                        </div>
                                                        <h4 className="text-lg font-semibold text-slate-900">
                                                            Natural Exits
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm text-slate-700 leading-relaxed">
                                                        {
                                                            selectedCycle
                                                                .peoplePortfolio
                                                                .exits
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* Active Luck Pillars */}
                                {selectedCycle.luckPillars &&
                                    selectedCycle.luckPillars.length > 0 && (
                                        <section className="border-t border-slate-200 pt-8 md:pt-12">
                                            <div className="mb-6 md:mb-8">
                                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-2">
                                                    Active Luck Pillars
                                                </h3>
                                                <p className="text-base text-slate-600">
                                                    Major energy influences
                                                    during this cycle
                                                </p>
                                            </div>

                                            {/* Cards Grid - Same design as MeLuckCycle */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                                {selectedCycle.luckPillars.map(
                                                    (pillar, index) => {
                                                        // Get emoji for element
                                                        const getElementEmoji =
                                                            (
                                                                element: string
                                                            ) => {
                                                                const el =
                                                                    element.toLowerCase();
                                                                if (
                                                                    el.includes(
                                                                        "fire"
                                                                    )
                                                                )
                                                                    return "🔥";
                                                                if (
                                                                    el.includes(
                                                                        "earth"
                                                                    )
                                                                )
                                                                    return "🌍";
                                                                if (
                                                                    el.includes(
                                                                        "metal"
                                                                    )
                                                                )
                                                                    return "⚪";
                                                                if (
                                                                    el.includes(
                                                                        "water"
                                                                    )
                                                                )
                                                                    return "💧";
                                                                if (
                                                                    el.includes(
                                                                        "wood"
                                                                    )
                                                                )
                                                                    return "🌳";
                                                                return "✨";
                                                            };

                                                        // Calculate remaining time
                                                        const currentYear =
                                                            new Date().getFullYear();
                                                        const yearsRemaining =
                                                            pillar.endYear -
                                                            currentYear;
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        const totalYears =
                                                            pillar.endYear -
                                                            pillar.startYear;
                                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                        const yearsElapsed =
                                                            currentYear -
                                                            pillar.startYear;
                                                        const timeRemaining =
                                                            yearsRemaining > 0
                                                                ? `${yearsRemaining}y left`
                                                                : "Completed";

                                                        return (
                                                            <div
                                                                key={index}
                                                                className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between md:hover:bg-slate-50 transition-colors group border border-slate-200 rounded-sm"
                                                            >
                                                                <div>
                                                                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                                                                        <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                                                            {getElementEmoji(
                                                                                pillar
                                                                                    .pillar
                                                                                    .element
                                                                            )}
                                                                        </div>
                                                                        <span className="text-xs font-mono text-slate-600 tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                                            {
                                                                                timeRemaining
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                                                        {pillar.pillar.element
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            pillar.pillar.element.slice(
                                                                                1
                                                                            )}{" "}
                                                                        Pillar
                                                                    </h4>

                                                                    <div className="text-xs font-mono text-slate-500 mb-3">
                                                                        {
                                                                            pillar
                                                                                .pillar
                                                                                .stem
                                                                        }{" "}
                                                                        {
                                                                            pillar
                                                                                .pillar
                                                                                .branch
                                                                        }{" "}
                                                                        •{" "}
                                                                        {
                                                                            pillar.startYear
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            pillar.endYear
                                                                        }
                                                                    </div>

                                                                    <p className="text-sm text-slate-500 leading-relaxed">
                                                                        {
                                                                            pillar.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </section>
                                    )}

                                {/* Major Transitions */}
                                {selectedCycle.transitions &&
                                    selectedCycle.transitions.length > 0 && (
                                        <section className="border-t border-slate-200 pt-8 md:pt-12">
                                            <div className="mb-6 md:mb-8">
                                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-2">
                                                    Major Transitions & Decision
                                                    Points
                                                </h3>
                                                <p className="text-base text-slate-600">
                                                    Critical timing windows—know
                                                    when to act, when to wait,
                                                    and what to prepare for
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {selectedCycle.transitions.map(
                                                    (transition, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 hover:border-slate-900 hover:shadow-md transition-all"
                                                        >
                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                                                <div>
                                                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                                        {transition.type.replace(
                                                                            "_",
                                                                            " "
                                                                        )}
                                                                    </div>
                                                                    <div className="text-xl md:text-2xl font-semibold text-slate-900">
                                                                        {
                                                                            transition.year
                                                                        }
                                                                        {transition.month &&
                                                                            ` - ${new Date(
                                                                                transition.year,
                                                                                transition.month -
                                                                                    1
                                                                            ).toLocaleString(
                                                                                "default",
                                                                                {
                                                                                    month: "long",
                                                                                }
                                                                            )}`}
                                                                    </div>
                                                                </div>
                                                                <span
                                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                                                        transition.impact ===
                                                                        "high"
                                                                            ? "bg-red-100 text-red-700 border border-red-200"
                                                                            : transition.impact ===
                                                                              "medium"
                                                                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                                                                            : "bg-slate-100 text-slate-700 border border-slate-200"
                                                                    }`}
                                                                >
                                                                    {
                                                                        transition.impact
                                                                    }{" "}
                                                                    impact
                                                                </span>
                                                            </div>

                                                            <p className="text-base text-slate-700 leading-relaxed mb-4">
                                                                {
                                                                    transition.description
                                                                }
                                                            </p>

                                                            {/* Actionable Guidance */}
                                                            {transition.actionableGuidance && (
                                                                <div className="mt-4 pt-4 border-t border-slate-100">
                                                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                                                                        What
                                                                        This
                                                                        Means
                                                                        For You
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {transition
                                                                            .actionableGuidance
                                                                            .bestFor &&
                                                                            transition
                                                                                .actionableGuidance
                                                                                .bestFor
                                                                                .length >
                                                                                0 && (
                                                                                <div>
                                                                                    <div className="text-xs font-medium text-emerald-700 mb-2">
                                                                                        ✓
                                                                                        Best
                                                                                        For:
                                                                                    </div>
                                                                                    <ul className="space-y-1">
                                                                                        {transition.actionableGuidance.bestFor.map(
                                                                                            (
                                                                                                item,
                                                                                                i
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        i
                                                                                                    }
                                                                                                    className="text-sm text-slate-700 flex items-start gap-2"
                                                                                                >
                                                                                                    <span className="text-emerald-600 mt-0.5">
                                                                                                        •
                                                                                                    </span>
                                                                                                    <span>
                                                                                                        {
                                                                                                            item
                                                                                                        }
                                                                                                    </span>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                        {transition
                                                                            .actionableGuidance
                                                                            .avoid &&
                                                                            transition
                                                                                .actionableGuidance
                                                                                .avoid
                                                                                .length >
                                                                                0 && (
                                                                                <div>
                                                                                    <div className="text-xs font-medium text-red-700 mb-2">
                                                                                        ⚠
                                                                                        Avoid:
                                                                                    </div>
                                                                                    <ul className="space-y-1">
                                                                                        {transition.actionableGuidance.avoid.map(
                                                                                            (
                                                                                                item,
                                                                                                i
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        i
                                                                                                    }
                                                                                                    className="text-sm text-slate-700 flex items-start gap-2"
                                                                                                >
                                                                                                    <span className="text-red-600 mt-0.5">
                                                                                                        •
                                                                                                    </span>
                                                                                                    <span>
                                                                                                        {
                                                                                                            item
                                                                                                        }
                                                                                                    </span>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </section>
                                    )}
                            </div>
                        )}

                        {/* Locked Content - Enhanced */}
                        {isLocked && (
                            <section className="border-t border-slate-200 pt-12 md:pt-16">
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-sm p-8 md:p-12 text-center text-white">
                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4">
                                            <Lock className="w-8 h-8 text-amber-400" />
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                                            Unlock Your{" "}
                                            {isCurrentCycle
                                                ? "Current"
                                                : "Future"}{" "}
                                            10-Year Cycle
                                        </h3>

                                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                                            See major life transitions, optimal
                                            timing for career moves,
                                            relationship decisions, and
                                            investments. Plan ahead with
                                            precision and never be blindsided by
                                            timing again.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                                            <div className="bg-white/5 rounded-sm p-4 border border-white/10">
                                                <div className="text-2xl mb-2">
                                                    🎯
                                                </div>
                                                <div className="text-sm font-semibold mb-1">
                                                    Strategic Planning
                                                </div>
                                                <div className="text-sm text-slate-300">
                                                    Know when to make major
                                                    career moves and investments
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-sm p-4 border border-white/10">
                                                <div className="text-2xl mb-2">
                                                    ⚡
                                                </div>
                                                <div className="text-sm font-semibold mb-1">
                                                    Timing Insights
                                                </div>
                                                <div className="text-sm text-slate-300">
                                                    Understand when energy peaks
                                                    and transitions occur
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-sm p-4 border border-white/10">
                                                <div className="text-2xl mb-2">
                                                    🔮
                                                </div>
                                                <div className="text-sm font-semibold mb-1">
                                                    Life Transitions
                                                </div>
                                                <div className="text-sm text-slate-300">
                                                    Prepare for major shifts
                                                    before they happen
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setSubscriptionModalOpen(true)
                                            }
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-colors text-base font-semibold shadow-xl"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Upgrade to Premium
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Subscription Modal */}
            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
                onSubscribe={handleSubscribe}
            />
        </ResponsiveLayout>
    );
}
