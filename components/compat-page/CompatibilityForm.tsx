"use client";

import {
    ComboBox,
    DateField,
    DateInputGroup,
    FieldError,
    Form,
    Input,
    Label,
    ListBox,
    Select,
    TimeField,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    createCompatibilityReport,
    CreateCompatibilityReportData,
} from "@/app/actions/reportAction";
import { signInWithCredentials } from "@/app/actions/authAction";
import { createBirthDateTime, formatBirthDateToISO } from "@/lib/utils/date";
import type { PersonalReport, ReportInput } from "@/types/report";
import cityTimezones from "city-timezones";

// Simple Chevron Icon for perfect alignment
const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
        />
    </svg>
);

function getElementEmoji(element: string | undefined): string {
    if (!element) return "";

    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";

    return "";
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    // Subtle radial gradient overlays with dark base
    if (elementLower.includes("fire")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(234, 88, 12, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(148, 163, 184, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(203, 213, 225, 0.08) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }

    return { backgroundColor: baseColor };
}

export default function CompatibilityForm({
    report,
    input: _input,
    userName,
    userCode,
}: {
    report: PersonalReport;
    input: ReportInput;
    userName?: string; // User's full name (only show if not "Anonymous")
    userCode: string; // Code of the user who shared their chart
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        birthCity: "",
        currentCity: "",
    });
    const [birthCitySuggestions, setBirthCitySuggestions] = useState<
        Array<{
            id: string;
            label: string;
            timezone: string;
        }>
    >([]);
    const [currentCitySuggestions, setCurrentCitySuggestions] = useState<
        Array<{
            id: string;
            label: string;
            timezone: string;
        }>
    >([]);

    // Get user's timezone
    const getUserTimezone = (): string => {
        if (typeof window !== "undefined") {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch {
                return "UTC";
            }
        }
        return "UTC";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data: Record<string, string> = {};

            formData.forEach((value, key) => {
                data[key] = value.toString();
            });

            // Validate city fields
            if (!data.birthCity || !data.currentCity) {
                alert("Please provide both City of Birth and Current City");
                setIsSubmitting(false);
                return;
            }

            // Person2 data from form (the person filling out the form)
            const person2BirthDate = data.birthDate;
            const person2BirthTime = data.birthTime || "";
            const person2IsTimeKnown = Boolean(
                person2BirthTime && person2BirthTime.trim() !== ""
            );
            const person2BirthDateTime = createBirthDateTime(
                person2BirthDate,
                person2BirthTime
            );

            // Get timezones from city names
            const birthCityResults = cityTimezones.findFromCityStateProvince(
                data.birthCity
            );
            const currentCityResults = cityTimezones.findFromCityStateProvince(
                data.currentCity
            );

            // Use first match's timezone, fallback to browser timezone
            const person2BirthTimezone =
                birthCityResults[0]?.timezone || getUserTimezone();
            const person2CurrentTimezone =
                currentCityResults[0]?.timezone || getUserTimezone();

            const payload: CreateCompatibilityReportData = {
                person1: {
                    code: userCode, // Person1's code (must exist)
                },
                person2: {
                    // No code provided - will create new user
                    birthDateTime: formatBirthDateToISO(person2BirthDateTime),
                    gender: data.gender as "male" | "female",
                    birthLocation: data.birthCity,
                    birthTimezone: person2BirthTimezone,
                    currentLocation: data.currentCity,
                    currentTimezone: person2CurrentTimezone,
                    isTimeKnown: person2IsTimeKnown,
                },
                isTeaser: true,
            };

            // Call API to create compatibility report
            const result = await createCompatibilityReport(payload);

            // Handle response - may include tokens if new user was created
            if (result.tokens && result.user) {
                // New user was created - log them in
                // Map tokens from API response to signInWithCredentials format
                const tokens = result.tokens;
                await signInWithCredentials({
                    accessToken: tokens.access?.token || tokens.accessToken,
                    refreshToken: tokens.refresh?.token || tokens.refreshToken,
                    accessTokenExpires:
                        (
                            tokens.access?.expires || tokens.accessTokenExpires
                        )?.toString() || "",
                    refreshTokenExpires:
                        (
                            tokens.refresh?.expires ||
                            tokens.refreshTokenExpires
                        )?.toString() || "",
                    userId: result.user.id,
                    accountId: result.user.accountId || null,
                });
            }

            // Redirect to compatibility result page at /compatibility/[code]
            // Response structure: { report: Report } or { user, tokens, report: Report }
            const reportCode =
                result.report?.code ||
                result.report?.id ||
                result.code ||
                result.id;
            router.push(`/compatibility/${reportCode}`);
        } catch (error) {
            console.error("Error creating compatibility report:", error);
            // TODO: Add error handling/display to user
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-24 md:py-40 px-6 xl:px-0 bg-white">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tighter text-slate-900 mb-6">
                        Check Compatibility.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8">
                        {userName && userName !== "Anonymous" ? (
                            <>
                                <span className="font-semibold text-slate-900">
                                    {userName}
                                </span>{" "}
                                shared their chart with you. Enter your birth
                                data to see how your charts interact.
                            </>
                        ) : (
                            <>
                                Someone shared their chart with you. Enter your
                                birth data to see how your charts interact.
                            </>
                        )}
                    </p>
                </div>

                {/* Shared Card - Visual Impact */}
                <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                    <div
                        className="text-white p-8 md:p-10 border-2 border-slate-900"
                        style={getElementBgStyle(report.identity?.element)}
                    >
                        {/* User Name - Show ownership when not Anonymous */}
                        {userName && userName !== "Anonymous" && (
                            <div className="text-xs font-medium text-white/60 mb-2">
                                {userName}&apos;s Chart
                            </div>
                        )}
                        <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                            {getElementEmoji(report.identity?.element) && (
                                <span className="text-sm">
                                    {getElementEmoji(report.identity?.element)}
                                </span>
                            )}
                            <span>{report.identity.code}</span>
                        </div>
                        <div className="text-3xl md:text-4xl font-bold mb-3">
                            {report.identity.title}
                        </div>
                        <div className="text-base md:text-lg text-white/80 mb-4">
                            1 in {report.rarity.overall.oneIn.toLocaleString()}
                        </div>
                        {/* Traits or Fallback */}
                        <div className="text-sm text-white/70 border-t border-white/20 pt-4 mt-4">
                            {report.specialTraits &&
                            report.specialTraits.length > 0 ? (
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {report.specialTraits.map(
                                        (
                                            trait: {
                                                emoji: string;
                                                name: string;
                                            },
                                            index: number
                                        ) => (
                                            <span
                                                key={index}
                                                className="flex items-center gap-1.5"
                                            >
                                                <span>{trait.emoji}</span>
                                                <span>{trait.name}</span>
                                            </span>
                                        )
                                    )}
                                </div>
                            ) : report.elementDistribution?.dominant &&
                              report.elementDistribution.dominant.length > 0 ? (
                                <span className="uppercase tracking-wider">
                                    {report.elementDistribution.dominant.join(
                                        " + "
                                    )}{" "}
                                    Dominant
                                </span>
                            ) : (
                                <span className="italic text-white/50">
                                    Your unique chart signature
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-4 italic">
                        This is who shared their chart with you
                    </p>
                </div>

                {/* Form - Same style as TeaserSection */}
                <div className="max-w-3xl mx-auto">
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-10 md:gap-12 max-w-3xl mx-auto"
                        validationBehavior="native"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-4">
                            {/* --- DATE INPUT --- */}
                            <div className="text-left group">
                                <DateField
                                    id="birthDate"
                                    name="birthDate"
                                    isRequired
                                    className="w-full [&>div]:shadow-none [&>div]:!shadow-none"
                                >
                                    <Label
                                        htmlFor="birthDate"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Date of Entry
                                    </Label>
                                    <DateInputGroup className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none transition-colors rounded-none shadow-none !shadow-none">
                                        <DateInputGroup.Input>
                                            {(segment) => (
                                                <DateInputGroup.Segment
                                                    segment={segment}
                                                    className="font-serif italic text-slate-600 focus:text-slate-900 focus:not-italic placeholder:text-slate-300"
                                                />
                                            )}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                    <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                </DateField>
                            </div>

                            {/* --- TIME INPUT --- */}
                            <div className="text-left group">
                                <TimeField
                                    id="birthTime"
                                    name="birthTime"
                                    className="w-full [&>div]:shadow-none [&>div]:!shadow-none"
                                >
                                    <Label
                                        htmlFor="birthTime"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Time (Optional)
                                    </Label>
                                    <DateInputGroup className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none transition-colors rounded-none shadow-none !shadow-none">
                                        <DateInputGroup.Input>
                                            {(segment) => (
                                                <DateInputGroup.Segment
                                                    segment={segment}
                                                    className="font-serif italic text-slate-600 focus:text-slate-900 focus:not-italic"
                                                />
                                            )}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                    <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                </TimeField>
                            </div>

                            {/* --- GENDER SELECT --- */}
                            <div className="text-left group">
                                <Select
                                    id="gender"
                                    name="gender"
                                    isRequired
                                    className="w-full [&>div]:shadow-none [&>div]:!shadow-none"
                                    placeholder="Select"
                                >
                                    <Label
                                        htmlFor="gender"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Biology
                                    </Label>

                                    <Select.Trigger className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif italic text-slate-600 focus:text-slate-900 focus:not-italic focus:border-slate-900 focus:outline-none flex items-center justify-between cursor-pointer transition-colors hover:text-slate-900 rounded-none shadow-none !shadow-none">
                                        <Select.Value />

                                        <span className="text-slate-300 group-hover:text-slate-500 transition-colors ml-2">
                                            <ChevronDownIcon />
                                        </span>
                                    </Select.Trigger>

                                    <Select.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none p-0 min-w-[150px]">
                                        <ListBox className="p-0">
                                            <ListBox.Item
                                                id="male"
                                                textValue="Male"
                                                className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                            >
                                                Male
                                            </ListBox.Item>
                                            <ListBox.Item
                                                id="female"
                                                textValue="Female"
                                                className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                            >
                                                Female
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                </Select>
                            </div>
                        </div>

                        {/* City Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div className="text-left group">
                                <ComboBox
                                    id="birthCity"
                                    name="birthCity"
                                    isRequired
                                    allowsCustomValue
                                    onSelectionChange={(key) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            birthCity: key ? String(key) : "",
                                        }));
                                    }}
                                    inputValue={formData.birthCity}
                                    onInputChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            birthCity: value,
                                        }));
                                        // Filter cities based on input
                                        if (value.length > 0) {
                                            const results =
                                                cityTimezones.findFromCityStateProvince(
                                                    value
                                                );
                                            const suggestions = results
                                                .slice(0, 30)
                                                .map((city, index) => {
                                                    // For US cities with state_ansi, use "City, State"
                                                    // For other cities, use "City, Country"
                                                    let label: string;
                                                    if (city.state_ansi) {
                                                        label = `${city.city}, ${city.state_ansi}`;
                                                    } else {
                                                        label = `${city.city}, ${city.country}`;
                                                    }
                                                    return {
                                                        id: `${city.city}-${
                                                            city.province ||
                                                            city.country
                                                        }-${index}`,
                                                        label,
                                                        timezone: city.timezone,
                                                    };
                                                });
                                            setBirthCitySuggestions(
                                                suggestions
                                            );
                                        } else {
                                            setBirthCitySuggestions([]);
                                        }
                                    }}
                                    className="w-full [&>div]:shadow-none [&>div]:!shadow-none"
                                >
                                    <Label
                                        htmlFor="birthCity"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        City of Birth
                                    </Label>
                                    <ComboBox.InputGroup>
                                        <Input
                                            className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none transition-colors rounded-none shadow-none"
                                            placeholder="e.g., Seoul, South Korea"
                                        />
                                        <ComboBox.Trigger />
                                    </ComboBox.InputGroup>
                                    <ComboBox.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-none">
                                        <ListBox className="p-0">
                                            {birthCitySuggestions.length > 0 ? (
                                                birthCitySuggestions.map(
                                                    (city) => (
                                                        <ListBox.Item
                                                            key={city.id}
                                                            id={city.label}
                                                            textValue={
                                                                city.label
                                                            }
                                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                        >
                                                            {city.label}
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    )
                                                )
                                            ) : (
                                                <ListBox.Item
                                                    id="empty"
                                                    textValue="Start typing to search cities..."
                                                    className="px-6 py-4 text-sm text-slate-500 font-serif italic cursor-default"
                                                    isDisabled
                                                >
                                                    Start typing to search
                                                    cities...
                                                </ListBox.Item>
                                            )}
                                        </ListBox>
                                    </ComboBox.Popover>
                                    <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                </ComboBox>
                            </div>

                            <div className="text-left group">
                                <ComboBox
                                    id="currentCity"
                                    name="currentCity"
                                    isRequired
                                    allowsCustomValue
                                    onSelectionChange={(key) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            currentCity: key ? String(key) : "",
                                        }));
                                    }}
                                    inputValue={formData.currentCity}
                                    onInputChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            currentCity: value,
                                        }));
                                        // Filter cities based on input
                                        if (value.length > 0) {
                                            const results =
                                                cityTimezones.findFromCityStateProvince(
                                                    value
                                                );
                                            const suggestions = results
                                                .slice(0, 30)
                                                .map((city, index) => {
                                                    // For US cities with state_ansi, use "City, State"
                                                    // For other cities, use "City, Country"
                                                    let label: string;
                                                    if (city.state_ansi) {
                                                        label = `${city.city}, ${city.state_ansi}`;
                                                    } else {
                                                        label = `${city.city}, ${city.country}`;
                                                    }
                                                    return {
                                                        id: `${city.city}-${
                                                            city.province ||
                                                            city.country
                                                        }-${index}`,
                                                        label,
                                                        timezone: city.timezone,
                                                    };
                                                });
                                            setCurrentCitySuggestions(
                                                suggestions
                                            );
                                        } else {
                                            setCurrentCitySuggestions([]);
                                        }
                                    }}
                                    className="w-full [&>div]:shadow-none [&>div]:!shadow-none"
                                >
                                    <Label
                                        htmlFor="currentCity"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Current City
                                    </Label>
                                    <ComboBox.InputGroup>
                                        <Input
                                            className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none transition-colors rounded-none shadow-none"
                                            placeholder="e.g., New York, NY"
                                        />
                                        <ComboBox.Trigger />
                                    </ComboBox.InputGroup>
                                    <ComboBox.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 rounded-none">
                                        <ListBox className="p-0">
                                            {currentCitySuggestions.length >
                                            0 ? (
                                                currentCitySuggestions.map(
                                                    (city) => (
                                                        <ListBox.Item
                                                            key={city.id}
                                                            id={city.label}
                                                            textValue={
                                                                city.label
                                                            }
                                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                        >
                                                            {city.label}
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    )
                                                )
                                            ) : (
                                                <ListBox.Item
                                                    id="empty"
                                                    textValue="Start typing to search cities..."
                                                    className="px-6 py-4 text-sm text-slate-500 font-serif italic cursor-default"
                                                    isDisabled
                                                >
                                                    Start typing to search
                                                    cities...
                                                </ListBox.Item>
                                            )}
                                        </ListBox>
                                    </ComboBox.Popover>
                                    <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                                </ComboBox>
                            </div>
                        </div>

                        {/* --- SUBMIT BUTTON --- */}
                        <div className="pt-8 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-white bg-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-3 text-lg">
                                    {isSubmitting
                                        ? "Calculating..."
                                        : "Check Compatibility"}
                                </span>
                            </button>
                            <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-400">
                                Encrypted . Instant . Private
                            </p>
                        </div>
                    </Form>
                </div>

                {/* CTA to get full report */}
                <div className="mt-16 md:mt-20 pt-8 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-600 mb-4">
                        Want to see your full personality report?
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-sm font-medium"
                    >
                        Get Your Full Report
                    </Link>
                </div>
            </div>
        </div>
    );
}
