"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

// Legacy interfaces for backward compatibility
interface ActData {
    days: string;
    title: string;
    description: string;
    focus: string[];
}

interface JourneyData {
    act1: ActData;
    act2: ActData;
    act3: ActData;
}

interface MonthlyPeriod {
    startDate: string;
    endDate: string;
    element: string;
    elementEmoji: string;
    tenGods?: Array<{
        name: string;
        technicalName: string;
        emoji: string;
        category: string;
        strength?: "single" | "amplified";
        occurrenceCount?: number;
    }>;
}

interface MonthlyJourneyProps {
    // New backend structure
    dominantData?: {
        monthlyElements: Array<{
            element: string;
            emoji: string;
            percentage: number;
        }>;
        activeTenGods: Array<{
            tenGod: {
                name: string;
                technicalName: string;
                emoji: string;
                source: "natal" | "transit" | "luck";
                pillar: string;
                category:
                    | "power"
                    | "wealth"
                    | "output"
                    | "resource"
                    | "friend"
                    | null;
                strength: "single" | "amplified" | "dominant" | "extreme";
            };
            occurrenceCount: number;
            percentage: number;
        }>;
    };
    phases?: Array<{
        days: string;
        theme: string;
        overview: string;
        focusAreas: string[];
    }>;
    myElement?: string;
    myElementEmoji?: string;
    isPremium?: boolean; // Default to false (free user)
    // Legacy props for backward compatibility
    journey?: JourneyData;
    monthlyContext?: MonthlyPeriod[];
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a";

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    if (elementLower.includes("fire")) {
        return {
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: "linear-gradient(135deg, #a16207 0%, #854d0e 100%)",
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        };
    }

    return { backgroundColor: baseColor };
}

function getCategoryLabel(category: string | null | undefined): string {
    if (!category) return "";
    const labels: Record<string, string> = {
        output: "Expression & Creativity",
        wealth: "Wealth & Resources",
        power: "Authority & Leadership",
        resource: "Support & Learning",
        friend: "Partnerships & Connections",
    };
    return labels[category] || category;
}

function getSourceLabel(
    source: "natal" | "transit" | "luck",
    pillar: string
): string {
    if (source === "natal") return "From Your Chart";
    if (source === "luck") return "From Current Luck Cycle";
    if (source === "transit") {
        // Check all pillars (can be comma-separated)
        const pillarsLower = pillar.toLowerCase();
        if (pillarsLower.includes("annual") || pillarsLower.includes("year")) {
            return "For This Year";
        }
        if (
            pillarsLower.includes("month") ||
            pillarsLower.includes("monthly")
        ) {
            return "For This Month";
        }
        if (pillarsLower.includes("day") || pillarsLower.includes("daily")) {
            return "For Today";
        }
        return "From Transit";
    }
    return source;
}

function getDominantPeriod(periods: MonthlyPeriod[]): MonthlyPeriod | null {
    if (!periods || periods.length === 0) return null;
    if (periods.length === 1) return periods[0];
    return periods[0];
}

export default function MonthlyJourney({
    dominantData,
    phases,
    myElement,
    myElementEmoji,
    isPremium = false,
    // Legacy props
    journey,
    monthlyContext,
}: MonthlyJourneyProps) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    // Use new structure if available, otherwise fall back to legacy
    const useNewStructure = !!dominantData && !!phases;

    // For new structure - get dominant monthly element (first one, or highest percentage)
    const monthlyElements = dominantData?.monthlyElements || [];
    const monthlyElement =
        monthlyElements.length > 0 ? monthlyElements[0] : null; // Use first element (or highest percentage if sorted)
    const activeTenGods = dominantData?.activeTenGods || [];

    // For legacy structure
    const dominantPeriod = monthlyContext
        ? getDominantPeriod(monthlyContext)
        : null;
    const legacyJourney = journey;

    // Energy overview is now free - show all energies for everyone
    const allEnergies = useNewStructure
        ? activeTenGods
        : dominantPeriod?.tenGods || [];
    const displayedEnergies = allEnergies; // Show all for free users too
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const remainingEnergiesCount = 0; // No gating on energy overview

    // Journey phases are now free - show all phases for everyone
    const displayedPhases = phases || [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const remainingPhasesCount = 0; // No gating on journey phases

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        setSubscriptionModalOpen(false);
    };

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Your 14-Day Journey
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        A narrative arc of your energy flow over the next two
                        weeks. This is a rolling 14-day forecast that updates
                        daily as new energy patterns emerge, so each day
                        you&apos;ll see the most current view of your upcoming
                        journey.
                    </p>
                </div>

                {/* 2-Column Layout: Energy Overview (Left) + Journey Acts (Right) - 50/50 split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Energy Overview */}
                    {((useNewStructure && monthlyElement && myElement) ||
                        (dominantPeriod && myElement)) && (
                        <div>
                            <div className="bg-white border border-slate-200 rounded-sm p-6 sticky top-8">
                                {/* Element Relationship */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                        Element Energy
                                    </h3>
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        {/* My Element */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                                style={getElementBgStyle(
                                                    myElement
                                                )}
                                            >
                                                {myElementEmoji}
                                            </div>
                                            <p className="text-xs text-slate-600 font-medium">
                                                {myElement}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowRight className="w-5 h-5 text-slate-400" />

                                        {/* Monthly Element */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                                style={getElementBgStyle(
                                                    useNewStructure &&
                                                        monthlyElement
                                                        ? monthlyElement.element
                                                        : dominantPeriod?.element
                                                )}
                                            >
                                                {useNewStructure &&
                                                monthlyElement
                                                    ? monthlyElement.emoji
                                                    : dominantPeriod?.elementEmoji}
                                            </div>
                                            <p className="text-xs text-slate-600 font-medium">
                                                {useNewStructure &&
                                                monthlyElement
                                                    ? monthlyElement.element
                                                    : dominantPeriod?.element}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Energies - Full list - Same format as TodayEnergyOverview */}
                                {allEnergies.length > 0 && (
                                    <div className="pt-6 border-t border-slate-200">
                                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                            Active Energies
                                        </h3>
                                        <div className="space-y-3">
                                            {useNewStructure
                                                ? // New structure: activeTenGods with occurrenceCount and percentage
                                                  displayedEnergies.map(
                                                      (item, idx) => {
                                                          const god =
                                                              "tenGod" in item ? item.tenGod : item;
                                                          const isAmplified =
                                                              god.strength ===
                                                                  "amplified" ||
                                                              god.strength ===
                                                                  "dominant" ||
                                                              god.strength ===
                                                                  "extreme";
                                                          return (
                                                              <div
                                                                  key={idx}
                                                                  className={`flex items-start gap-3 p-3 md:p-4 rounded-sm hover:bg-slate-100 transition-colors ${
                                                                      isAmplified
                                                                          ? "bg-amber-50 border border-amber-200"
                                                                          : "bg-slate-50"
                                                                  }`}
                                                              >
                                                                  <div className="text-2xl md:text-3xl flex-shrink-0 relative">
                                                                      {
                                                                          god.emoji
                                                                      }
                                                                      {isAmplified && (
                                                                          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
                                                                              {
                                                                                  item.occurrenceCount
                                                                              }
                                                                          </span>
                                                                      )}
                                                                  </div>
                                                                  <div className="flex-1 min-w-0">
                                                                      {/* Title, Amplified badge, and Source badge - same row on desktop, stacked on mobile */}
                                                                      <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                                                                          <div className="flex items-center gap-2 flex-wrap">
                                                                              <h4 className="text-sm md:text-base font-semibold text-slate-900">
                                                                                  {
                                                                                      god.name
                                                                                  }
                                                                              </h4>
                                                                              {isAmplified && (
                                                                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">
                                                                                      Amplified
                                                                                  </span>
                                                                              )}
                                                                          </div>
                                                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 whitespace-nowrap flex-shrink-0">
                                                                              {getSourceLabel(
                                                                                  "source" in god ? god.source : "natal",
                                                                                  "pillar" in god ? god.pillar : ""
                                                                              )}
                                                                          </span>
                                                                      </div>
                                                                      <p className="text-xs md:text-sm text-slate-500">
                                                                          {getCategoryLabel(
                                                                              god.category
                                                                          )}
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          );
                                                      }
                                                  )
                                                : // Legacy structure
                                                  displayedEnergies.map(
                                                      (godItem, idx) => {
                                                          const god = "tenGod" in godItem ? godItem.tenGod : godItem;
                                                          const isAmplified =
                                                              god.strength ===
                                                              "amplified";
                                                          return (
                                                              <div
                                                                  key={idx}
                                                                  className={`flex items-start gap-3 p-3 md:p-4 rounded-sm hover:bg-slate-100 transition-colors ${
                                                                      isAmplified
                                                                          ? "bg-amber-50 border border-amber-200"
                                                                          : "bg-slate-50"
                                                                  }`}
                                                              >
                                                                  <div className="text-2xl md:text-3xl flex-shrink-0 relative">
                                                                      {
                                                                          god.emoji
                                                                      }
                                                                      {isAmplified && (
                                                                          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
                                                                              {"occurrenceCount" in god ? god.occurrenceCount : 2}
                                                                          </span>
                                                                      )}
                                                                  </div>
                                                                  <div className="flex-1 min-w-0">
                                                                      <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                                                                          <div className="flex items-center gap-2 flex-wrap">
                                                                              <h4 className="text-sm md:text-base font-semibold text-slate-900">
                                                                                  {
                                                                                      god.name
                                                                                  }
                                                                              </h4>
                                                                              {isAmplified && (
                                                                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">
                                                                                      Amplified
                                                                                  </span>
                                                                              )}
                                                                          </div>
                                                                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 whitespace-nowrap flex-shrink-0">
                                                                              {getSourceLabel(
                                                                                  "transit",
                                                                                  "month"
                                                                              )}
                                                                          </span>
                                                                      </div>
                                                                      <p className="text-xs md:text-sm text-slate-500">
                                                                          {getCategoryLabel(
                                                                              god.category
                                                                          )}
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                          );
                                                      }
                                                  )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Right Column: Journey Acts */}
                    <div className="space-y-12 md:space-y-16">
                        {useNewStructure
                            ? // New structure: phases array
                              displayedPhases.map((phase, index) => {
                                  return (
                                      <div key={index}>
                                          <div className="mb-2">
                                              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                  {phase.days}
                                              </span>
                                          </div>
                                          <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                              {phase.theme}
                                          </h3>
                                          <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                                              {phase.overview}
                                          </p>
                                          <div>
                                              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                  Focus Areas
                                              </p>
                                              <ul className="space-y-1.5">
                                                  {phase.focusAreas.map(
                                                      (item, i) => (
                                                          <li
                                                              key={i}
                                                              className="text-sm text-slate-700 flex items-start"
                                                          >
                                                              <span className="text-slate-400 mr-2 mt-0.5">
                                                                  •
                                                              </span>
                                                              <span>
                                                                  {item}
                                                              </span>
                                                          </li>
                                                      )
                                                  )}
                                              </ul>
                                          </div>
                                      </div>
                                  );
                              })
                            : null}

                        {/* Journey phases are now free - no unlock card */}

                        {!useNewStructure &&
                            // Legacy structure: journey acts
                            legacyJourney && (
                                <>
                                    {/* Act 1 */}
                                    <div>
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {legacyJourney.act1.days}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                            {legacyJourney.act1.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                                            {legacyJourney.act1.description}
                                        </p>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                Focus Areas
                                            </p>
                                            <ul className="space-y-1.5">
                                                {legacyJourney.act1.focus.map(
                                                    (item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-slate-700 flex items-start"
                                                        >
                                                            <span className="text-slate-400 mr-2 mt-0.5">
                                                                •
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Act 2 */}
                                    <div>
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {legacyJourney.act2.days}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                            {legacyJourney.act2.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                                            {legacyJourney.act2.description}
                                        </p>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                Focus Areas
                                            </p>
                                            <ul className="space-y-1.5">
                                                {legacyJourney.act2.focus.map(
                                                    (item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-slate-700 flex items-start"
                                                        >
                                                            <span className="text-slate-400 mr-2 mt-0.5">
                                                                •
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Act 3 */}
                                    <div>
                                        <div className="mb-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {legacyJourney.act3.days}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                            {legacyJourney.act3.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                                            {legacyJourney.act3.description}
                                        </p>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                Focus Areas
                                            </p>
                                            <ul className="space-y-1.5">
                                                {legacyJourney.act3.focus.map(
                                                    (item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-slate-700 flex items-start"
                                                        >
                                                            <span className="text-slate-400 mr-2 mt-0.5">
                                                                •
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </>
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
        </section>
    );
}
