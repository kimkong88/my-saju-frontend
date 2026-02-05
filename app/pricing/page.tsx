import Link from "next/link";
import { Check, Sparkles, ArrowRight, CreditCard } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import SubscribeButton from "@/components/pricing/SubscribeButton";

export default async function PricingPage() {
    // Check subscription status
    let isSubscribed = false;
    try {
        const subscription = await getSubscriptionStatus();
        isSubscribed = subscription?.isSubscribed || false;
    } catch (error) {
        console.error("Error loading subscription status:", error);
        // Default to not subscribed on error
        isSubscribed = false;
    }

    return (
        <>
            <AppHeader />
            <main className="pt-16 md:pt-32 min-h-screen bg-white">
                {/* Hero Section */}
                <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-6">
                                Unlock Your Full Potential.
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8">
                                Unlock all sections of your reports and
                                forecasts. Free users can generate
                                everything—premium removes all content
                                restrictions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Card */}
                <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-sm p-8 md:p-12 text-white">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <Sparkles className="w-6 h-6 text-white/80" />
                                        <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                                            Premium
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-center gap-1 mb-2">
                                        <span className="text-6xl md:text-7xl font-serif font-semibold tracking-tight">
                                            $4
                                        </span>
                                        <span className="text-3xl md:text-4xl font-serif font-semibold">
                                            .99
                                        </span>
                                    </div>
                                    <div className="text-sm md:text-base text-white/70 uppercase tracking-widest">
                                        per month
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Full access to all report
                                            sections—no blurring or content
                                            restrictions
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            All daily forecast insights,
                                            including all good things,
                                            challenges, and special events
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Complete compatibility reports with
                                            all categories and subcategories
                                            unlocked
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Access to all past blessings and
                                            full blessing history
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Peak and worst day indicators in
                                            14-day calendar forecasts
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Access to answers to personalized
                                            questions
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-base md:text-lg text-white/90 leading-relaxed">
                                            Priority support and early access to
                                            new features
                                        </span>
                                    </div>
                                </div>

                                <SubscribeButton isSubscribed={isSubscribed} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Details */}
                <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-slate-900 mb-6 text-center">
                                Everything You Need.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-center max-w-2xl mx-auto">
                                Comprehensive insights to help you navigate
                                life&apos;s opportunities and challenges
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                                    Personal Reports
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Unlock all sections of your personal report
                                    with no content restrictions. Free users can
                                    generate reports but see some sections
                                    blurred—premium removes all limitations.
                                </p>
                                <ul className="space-y-2 mt-6">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            All strengths and weaknesses
                                            sections fully visible
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Complete life themes analysis
                                            (career, wealth, relationships,
                                            health, learning)
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Full four pillars chart with
                                            detailed explanations
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                                    Advanced Forecasts
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Unlock all forecast insights. Free users see
                                    the first item in each section—premium
                                    reveals everything with no blurring.
                                </p>
                                <ul className="space-y-2 mt-6">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            All good things, challenges, and
                                            special events fully visible
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Peak and worst day indicators in
                                            14-day calendar
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Complete 14-day journey with all
                                            phases unlocked
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                                    Compatibility Analysis
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Unlock all compatibility insights. Free
                                    users can generate reports but see the first
                                    category fully—premium reveals all
                                    categories and subcategories.
                                </p>
                                <ul className="space-y-2 mt-6">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            All compatibility categories and
                                            subcategories fully visible
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Complete compatibility scores and
                                            analysis for all areas
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Elemental interaction and chart
                                            comparisons
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                                    Blessing History
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Access your complete blessing history. Free
                                    users only see active blessings—premium
                                    unlocks your full history including all past
                                    blessings.
                                </p>
                                <ul className="space-y-2 mt-6">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Full access to all past blessings,
                                            even after they expire
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Complete blessing history with
                                            personal messages
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            No time restrictions on viewing
                                            received blessings
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
                                    Personalized Questions
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Get personalized questions tailored to your
                                    chart and current energy cycles. Premium
                                    users get full access to all answers and
                                    insights.
                                </p>
                                <ul className="space-y-2 mt-6">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Access to answers for all
                                            personalized questions
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Questions tailored to your daily,
                                            weekly, and life cycle energy
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base text-slate-700">
                                            Detailed insights and guidance based
                                            on your chart
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-slate-900 mb-6 text-center">
                                Free vs Premium.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-center">
                                See what&apos;s included in each tier
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            {/* Mobile: Compact Scrollable Table */}
                            <div className="md:hidden">
                                <div className="bg-white rounded-sm border-2 border-slate-300 overflow-x-auto -mx-6 px-6">
                                    <div className="inline-block min-w-full">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b-2 border-slate-300">
                                                    <th className="text-left py-3 px-3 text-xs font-semibold text-slate-900 sticky left-0 bg-white z-10 min-w-[200px]">
                                                        Feature
                                                    </th>
                                                    <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 min-w-[80px]">
                                                        Free
                                                    </th>
                                                    <th className="text-center py-3 px-3 text-xs font-semibold text-slate-900 bg-slate-50 min-w-[80px]">
                                                        Premium
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                {/* Free Features */}
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Generate Personal
                                                        Reports
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Generate Compatibility
                                                        Reports
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Daily Forecast Overview
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                {/* Limited/Premium Features */}
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Access to Detailed
                                                        Personal Report Insights
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="text-slate-500 font-medium text-xs">
                                                            Limited
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Access to Detailed
                                                        Compatibility Insights
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="text-slate-500 font-medium text-xs">
                                                            Limited
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Access to Detailed
                                                        Forecast Insights
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="text-slate-500 font-medium text-xs">
                                                            Limited
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Access to Answers to
                                                        Questions
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="text-slate-500 font-medium text-xs">
                                                            Limited
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-3 text-sm text-slate-700 font-medium sticky left-0 bg-white z-10">
                                                        Access to Past Blessings
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="text-slate-500 font-medium text-xs">
                                                            Limited
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center bg-slate-50">
                                                        <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 text-center mt-3">
                                    Swipe horizontally to see all columns
                                </p>
                            </div>

                            {/* Desktop: Table Layout */}
                            <div className="hidden md:block bg-white rounded-sm border-2 border-slate-200">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-200">
                                            <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">
                                                Feature
                                            </th>
                                            <th className="text-center py-4 px-6 text-sm font-semibold text-slate-500">
                                                Free
                                            </th>
                                            <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900 bg-slate-50">
                                                Premium
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {/* Free Features */}
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Generate Personal Reports
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Generate Compatibility Reports
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Daily Forecast Overview
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Check className="w-5 h-5 text-slate-400 mx-auto" />
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        {/* Limited/Premium Features */}
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Access to Detailed Personal
                                                Report Insights
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-slate-400 font-medium">
                                                    Limited
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Access to Detailed Compatibility
                                                Insights
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-slate-400 font-medium">
                                                    Limited
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Access to Detailed Forecast
                                                Insights
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-slate-400 font-medium">
                                                    Limited
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Access to Answers to Questions
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-slate-400 font-medium">
                                                    Limited
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 px-6 text-sm text-slate-700 font-medium">
                                                Access to Past Blessings
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="text-slate-400 font-medium">
                                                    Limited
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center bg-slate-50">
                                                <Check className="w-5 h-5 text-slate-900 mx-auto" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-16 md:py-24 px-6 xl:px-0 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-slate-900 mb-6 text-center">
                                Frequently Asked Questions.
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                    Can I cancel anytime?
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Yes, you can cancel your subscription at any
                                    time. You&apos;ll continue to have access to
                                    premium features until the end of your
                                    billing period.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    We accept all major credit cards and debit
                                    cards. Payment is processed securely through
                                    our payment provider.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                    Will my data be safe?
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Absolutely. We take your privacy seriously.
                                    Your birth data and personal information are
                                    encrypted and stored securely. We never
                                    share your information with third parties.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                    Do you offer refunds?
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    We offer a 7-day money-back guarantee. If
                                    you&apos;re not satisfied with your premium
                                    subscription, contact us within 7 days for a
                                    full refund.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-3">
                                    Can I share my reports with others?
                                </h3>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    Yes, premium users can share their personal
                                    reports and compatibility reports with
                                    others through shareable links.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 md:py-24 px-6 xl:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-slate-900 mb-6">
                                Ready to Unlock Your Full Potential?
                            </h2>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                                Join thousands of users who are using premium
                                insights to make better decisions and understand
                                themselves and their relationships on a deeper
                                level.
                            </p>
                            <Link
                                href="/pricing#subscribe"
                                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-slate-800 transition-colors"
                            >
                                <CreditCard className="w-5 h-5" />
                                Start Your Premium Journey
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
