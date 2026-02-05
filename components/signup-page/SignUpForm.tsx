"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { createBirthDateTime, formatBirthDateToISO } from "@/lib/utils/date";
import cityTimezones from "city-timezones";
import { CreateUserData } from "@/types/user";
import { createUser } from "@/app/actions/userAction";
import { loadFromStorage, removeFromStorage } from "@/lib/utils/storage";
import {
    signInWithCredentials,
    signInWithProvider,
    getCurrentAccountId,
} from "@/app/actions/authAction";

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

interface PartialUserData {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    gender?: "male" | "female";
    birthTimezone?: string;
    isTimeKnown?: boolean;
}

interface SignUpFormProps {
    mode?: "signup" | "add-profile";
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function SignUpForm({
    mode = "signup",
    onSuccess: _onSuccess,
    onCancel: _onCancel,
}: SignUpFormProps = {}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signupCompleted, setSignupCompleted] = useState(false);

    // Initialize partial data from localStorage on mount (avoid setState in useEffect)
    const [partialData] = useState<PartialUserData | null>(() => {
        if (typeof window === "undefined") return null;
        return loadFromStorage<PartialUserData>("userDataPartial");
    });

    const isAddProfileMode = mode === "add-profile";

    // Initialize form data based on partial data (avoid setState in useEffect)
    const [formData, setFormData] = useState(() => {
        if (partialData) {
            return {
                name: "",
                birthDate: partialData.birthDate || "",
                birthTime: partialData.birthTime || "",
                gender: partialData.gender || "",
                birthCity: "",
                currentCity: "",
            };
        }
        return {
            name: "",
            birthDate: "",
            birthTime: "",
            gender: "",
            birthCity: "",
            currentCity: "",
        };
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

    // Note: partialData and formData are now initialized from localStorage in useState
    // No need for useEffect to avoid setState in effect

    const isPreFilled = !!partialData;

    const handleSocialConnect = async (provider: "google" | "apple") => {
        try {
            await signInWithProvider(provider);
        } catch (error) {
            console.error(`Error connecting ${provider}:`, error);
        }
    };

    const handleSkipSocial = () => {
        router.push("/me");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataObj = new FormData(e.currentTarget);
            const data: Record<string, string> = {};

            formDataObj.forEach((value, key) => {
                data[key] = value.toString();
            });

            // Validate required fields
            if (!data.name?.trim()) {
                alert("Please enter your name");
                setIsSubmitting(false);
                return;
            }

            if (!data.birthDate || !data.gender) {
                alert("Please fill in all required fields");
                setIsSubmitting(false);
                return;
            }

            if (!data.birthCity || !data.currentCity) {
                alert("Please provide both City of Birth and Current City");
                setIsSubmitting(false);
                return;
            }

            const birthDate = data.birthDate;
            const birthTime = data.birthTime || "";
            const isTimeKnown = Boolean(birthTime && birthTime.trim() !== "");

            // Create birthDateTime using the same utility as report creation
            const birthDateTime = createBirthDateTime(birthDate, birthTime);

            // Get timezones directly from library using city names
            const birthCityResults = cityTimezones.findFromCityStateProvince(
                data.birthCity
            );
            const currentCityResults = cityTimezones.findFromCityStateProvince(
                data.currentCity
            );

            // Use first match's timezone, fallback to browser timezone
            const birthTimezone =
                birthCityResults[0]?.timezone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone;
            const currentTimezone =
                currentCityResults[0]?.timezone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Store complete user data
            const completeUserData: CreateUserData = {
                fullName: data.name,
                birthDate: formatBirthDateToISO(birthDateTime), // Format as ISO string without timezone (YYYY-MM-DDTHH:mm:ss)
                birthLocation: data.birthCity,
                birthTimezone,
                currentLocation: data.currentCity,
                currentTimezone,
                isTimeKnown,
                gender: data.gender as "male" | "female",
            };

            // Call API to create user (returns {user, tokens})
            const authResponse = await createUser(completeUserData);

            if (isAddProfileMode) {
                // For add-profile mode: preserve accountId from current session
                // Get current accountId before signing in with new user
                const currentAccountId = await getCurrentAccountId();

                // Sign in with new tokens, preserving accountId
                await signInWithCredentials({
                    accessToken: authResponse.tokens.access.token,
                    refreshToken: authResponse.tokens.refresh.token,
                    accessTokenExpires:
                        authResponse.tokens.access.expires.toString(),
                    refreshTokenExpires:
                        authResponse.tokens.refresh.expires.toString(),
                    userId: authResponse.user.id,
                    accountId: currentAccountId,
                });

                // Refresh the page to update UI with new token
                window.location.reload();
                return;
            }

            // For signup mode: Sign in with NextAuth using the returned tokens
            await signInWithCredentials({
                accessToken: authResponse.tokens.access.token,
                refreshToken: authResponse.tokens.refresh.token,
                accessTokenExpires:
                    authResponse.tokens.access.expires.toString(),
                refreshTokenExpires:
                    authResponse.tokens.refresh.expires.toString(),
                userId: authResponse.user.id,
            });

            // Clear partial data if exists
            removeFromStorage("userDataPartial");

            // Show social connection step instead of redirecting
            setSignupCompleted(true);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error completing signup:", error);
            alert("An error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    // Show social connection step if signup is completed
    if (signupCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 bg-white">
                <div className="max-w-3xl mx-auto w-full">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                            Connect Your Account
                        </h1>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-lg mx-auto">
                            Link your social account to sync across devices and
                            save your data permanently.
                        </p>
                    </div>

                    {/* Social Connection Options */}
                    <div className="space-y-4 mb-8">
                        <button
                            onClick={() => handleSocialConnect("google")}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-full text-base font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            onClick={() => handleSocialConnect("apple")}
                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-full text-base font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    {/* Skip Option */}
                    <div className="text-center">
                        <button
                            onClick={handleSkipSocial}
                            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors underline"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                        {isAddProfileMode
                            ? "Add New Profile"
                            : isPreFilled
                            ? "Complete Your Profile"
                            : "Create Your Profile"}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-lg mx-auto mb-4">
                        {isAddProfileMode
                            ? "Create a profile for a family member or friend"
                            : isPreFilled
                            ? "Add your location for maximum accuracy"
                            : "Get your personalized chart and unlock all features"}
                    </p>
                    {!isPreFilled && !isAddProfileMode && (
                        <p className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="font-bold text-slate-900 underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    )}
                </div>

                <Form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-10 md:gap-12"
                    validationBehavior="native"
                >
                    {/* Pre-filled Section (if exists) */}
                    {isPreFilled && (
                        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 md:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    From Your Previous Entry
                                </p>
                                <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-1 rounded-full">
                                    Pre-filled
                                </span>
                            </div>
                            <div className="space-y-3 text-sm text-slate-700">
                                <p>
                                    <span className="font-medium">
                                        Birth Date:
                                    </span>{" "}
                                    {partialData?.birthDate}
                                </p>
                                {partialData?.birthTime && (
                                    <p>
                                        <span className="font-medium">
                                            Birth Time:
                                        </span>{" "}
                                        {partialData.birthTime}
                                    </p>
                                )}
                                <p>
                                    <span className="font-medium">Gender:</span>{" "}
                                    {partialData?.gender === "male"
                                        ? "Male"
                                        : "Female"}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Name Field (always required) */}
                    <div className="text-left group">
                        <Label
                            htmlFor="name"
                            className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Birth Data Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Date Field */}
                        <div className="text-left group">
                            <DateField
                                id="birthDate"
                                name="birthDate"
                                isRequired
                                className="w-full"
                            >
                                <Label
                                    htmlFor="birthDate"
                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                >
                                    Date of Birth
                                </Label>
                                <DateInputGroup className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none focus-within:ring-0 focus-within:shadow-none transition-colors rounded-none shadow-none">
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

                        {/* Time Field */}
                        <div className="text-left group">
                            <TimeField
                                id="birthTime"
                                name="birthTime"
                                className="w-full"
                            >
                                <Label
                                    htmlFor="birthTime"
                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                >
                                    Time of Birth
                                </Label>
                                <DateInputGroup className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none focus-within:ring-0 focus-within:shadow-none transition-colors rounded-none shadow-none">
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

                        {/* Gender Field */}
                        <div className="text-left group">
                            <Select
                                id="gender"
                                name="gender"
                                isRequired
                                placeholder="Select"
                                selectedKey={formData.gender || undefined}
                                onSelectionChange={(key) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        gender: key ? String(key) : "",
                                    }));
                                }}
                                className="w-full"
                            >
                                <Label
                                    htmlFor="gender"
                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                >
                                    Gender
                                </Label>
                                <Select.Trigger className="bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none">
                                    <Select.Value />
                                    <ChevronDownIcon className="text-slate-400" />
                                </Select.Trigger>
                                <Select.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none">
                                    <ListBox className="p-0">
                                        <ListBox.Item
                                            key="male"
                                            id="male"
                                            textValue="Male"
                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                        >
                                            Male
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item
                                            key="female"
                                            id="female"
                                            textValue="Female"
                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                        >
                                            Female
                                            <ListBox.ItemIndicator />
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
                                        setBirthCitySuggestions(suggestions);
                                    } else {
                                        setBirthCitySuggestions([]);
                                    }
                                }}
                                className="w-full"
                            >
                                <Label
                                    htmlFor="birthCity"
                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                >
                                    City of Birth
                                </Label>
                                <ComboBox.InputGroup>
                                    <Input
                                        className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none"
                                        placeholder="e.g., Seoul, South Korea"
                                    />
                                    <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none">
                                    <ListBox className="p-0">
                                        {birthCitySuggestions.length > 0 ? (
                                            birthCitySuggestions.map((city) => (
                                                <ListBox.Item
                                                    key={city.id}
                                                    id={city.label}
                                                    textValue={city.label}
                                                    className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                >
                                                    {city.label}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))
                                        ) : (
                                            <ListBox.Item
                                                id="empty"
                                                textValue="Start typing to search cities..."
                                                className="px-6 py-4 text-sm text-slate-500 font-serif italic cursor-default"
                                                isDisabled
                                            >
                                                Start typing to search cities...
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
                                        setCurrentCitySuggestions(suggestions);
                                    } else {
                                        setCurrentCitySuggestions([]);
                                    }
                                }}
                                className="w-full"
                            >
                                <Label
                                    htmlFor="currentCity"
                                    className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                >
                                    Current City
                                </Label>
                                <ComboBox.InputGroup>
                                    <Input
                                        className="w-full bg-transparent border-0 border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-0 focus:shadow-none transition-colors rounded-none shadow-none"
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                    <ComboBox.Trigger />
                                </ComboBox.InputGroup>
                                <ComboBox.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none">
                                    <ListBox className="p-0">
                                        {currentCitySuggestions.length > 0 ? (
                                            currentCitySuggestions.map(
                                                (city) => (
                                                    <ListBox.Item
                                                        key={city.id}
                                                        id={city.label}
                                                        textValue={city.label}
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
                                                Start typing to search cities...
                                            </ListBox.Item>
                                        )}
                                    </ListBox>
                                </ComboBox.Popover>
                                <FieldError className="text-xs text-red-500 mt-2 font-serif italic" />
                            </ComboBox>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 text-center">
                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                !formData.name?.trim() ||
                                !formData.birthCity?.trim() ||
                                !formData.currentCity?.trim()
                            }
                            className="cursor-pointer group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-white bg-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center gap-3 text-lg">
                                {isSubmitting
                                    ? "Saving..."
                                    : isPreFilled
                                    ? "Finalize & Save"
                                    : "Create Profile"}
                            </span>
                        </button>
                        <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-400">
                            Encrypted . Instant . Private
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
