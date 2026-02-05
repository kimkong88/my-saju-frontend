"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@heroui/react";
import {
    ComboBox,
    DateField,
    DateInputGroup,
    FieldError,
    Form,
    Input,
    Label,
    ListBox,
    TimeField,
    Select,
} from "@heroui/react";
import { X } from "lucide-react";
import { createBirthDateTime, formatBirthDateToISO } from "@/lib/utils/date";
import cityTimezones from "city-timezones";
import { updateUser } from "@/app/actions/userAction";
import {
    signInWithCredentials,
    getCurrentAccountId,
} from "@/app/actions/authAction";
import { toast } from "sonner";
import { CalendarDate, Time } from "@internationalized/date";

interface EditProfileModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    currentName: string;
    currentBirthDate: string; // ISO string
    currentBirthTime?: string; // Formatted time like "8:30 AM"
    isTimeKnown: boolean;
    gender?: "male" | "female";
    birthCity?: string;
    currentCity?: string;
    onSuccess?: () => void;
}

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

export default function EditProfileModal({
    isOpen,
    onOpenChange,
    userId,
    currentName,
    currentBirthDate,
    currentBirthTime,
    isTimeKnown,
    gender,
    birthCity,
    currentCity,
    onSuccess,
}: EditProfileModalProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        birthDate: null as CalendarDate | null,
        birthTime: null as Time | null,
        gender: "",
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

    // Initialize form data from props
    useEffect(() => {
        if (isOpen) {
            // Parse current birth date (ISO string) to CalendarDate
            const birthDateObj = new Date(currentBirthDate);
            const year = birthDateObj.getUTCFullYear();
            const month = birthDateObj.getUTCMonth() + 1;
            const day = birthDateObj.getUTCDate();
            const calendarDate = new CalendarDate(year, month, day);

            // Parse current birth time if available
            let timeValue: Time | null = null;
            if (isTimeKnown && currentBirthTime) {
                // Parse "8:30 AM" format to Time object
                const timeMatch = currentBirthTime.match(
                    /(\d+):(\d+)\s*(AM|PM)/i
                );
                if (timeMatch) {
                    let hours = parseInt(timeMatch[1], 10);
                    const minutes = parseInt(timeMatch[2], 10);
                    const period = timeMatch[3].toUpperCase();

                    if (period === "PM" && hours !== 12) {
                        hours += 12;
                    } else if (period === "AM" && hours === 12) {
                        hours = 0;
                    }

                    timeValue = new Time(hours, minutes);
                }
            }

            setFormData({
                name: currentName || "",
                birthDate: calendarDate,
                birthTime: timeValue,
                gender: gender || "",
                birthCity: birthCity || "",
                currentCity: currentCity || "",
            });
        }
    }, [
        isOpen,
        currentName,
        currentBirthDate,
        currentBirthTime,
        isTimeKnown,
        gender,
        birthCity,
        currentCity,
    ]);

    const handleBirthCityChange = (value: string) => {
        setFormData({ ...formData, birthCity: value });
        if (value.length > 0) {
            const results = cityTimezones.findFromCityStateProvince(value);
            const suggestions = results.slice(0, 30).map((city, index) => {
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
                        city.province || city.country
                    }-${index}`,
                    label,
                    timezone: city.timezone,
                };
            });
            setBirthCitySuggestions(suggestions);
        } else {
            setBirthCitySuggestions([]);
        }
    };

    const handleCurrentCityChange = (value: string) => {
        setFormData({ ...formData, currentCity: value });
        if (value.length > 0) {
            const results = cityTimezones.findFromCityStateProvince(value);
            const suggestions = results.slice(0, 30).map((city, index) => {
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
                        city.province || city.country
                    }-${index}`,
                    label,
                    timezone: city.timezone,
                };
            });
            setCurrentCitySuggestions(suggestions);
        } else {
            setCurrentCitySuggestions([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData(e.currentTarget);
            const formValues: Record<string, string> = {};
            data.forEach((value, key) => {
                formValues[key] = value.toString();
            });

            // Validate required fields
            if (!formValues.name || !formValues.name.trim()) {
                toast.error("Please enter your name");
                setIsSubmitting(false);
                return;
            }

            if (!formData.birthDate) {
                toast.error("Please fill in your birth date");
                setIsSubmitting(false);
                return;
            }

            if (!formValues.gender) {
                toast.error("Please select your gender");
                setIsSubmitting(false);
                return;
            }

            if (!formValues.birthCity || !formValues.currentCity) {
                toast.error(
                    "Please provide both City of Birth and Current City"
                );
                setIsSubmitting(false);
                return;
            }

            // Get time from formData (Time object) and convert to HH:mm string
            const birthTime = formData.birthTime
                ? `${String(formData.birthTime.hour).padStart(2, "0")}:${String(
                      formData.birthTime.minute
                  ).padStart(2, "0")}`
                : "";
            const isTimeKnown = Boolean(birthTime && birthTime.trim() !== "");

            // Convert CalendarDate to YYYY-MM-DD string
            const dateStr = `${formData.birthDate.year}-${String(
                formData.birthDate.month
            ).padStart(2, "0")}-${String(formData.birthDate.day).padStart(
                2,
                "0"
            )}`;

            // Create birthDateTime using the same utility as report creation
            const birthDateTime = createBirthDateTime(dateStr, birthTime);

            // Get timezones from city names
            const birthCityResults = cityTimezones.findFromCityStateProvince(
                formValues.birthCity
            );
            const currentCityResults = cityTimezones.findFromCityStateProvince(
                formValues.currentCity
            );

            // Use first match's timezone, fallback to browser timezone
            const birthTimezone =
                birthCityResults[0]?.timezone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone;
            const currentTimezone =
                currentCityResults[0]?.timezone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Update user data
            const updateData = {
                fullName: formValues.name.trim(),
                birthDate: formatBirthDateToISO(birthDateTime),
                gender: formValues.gender as "male" | "female",
                birthLocation: formValues.birthCity,
                birthTimezone,
                currentLocation: formValues.currentCity,
                currentTimezone,
                isTimeKnown,
            };

            // Call API to update user
            const authResponse = await updateUser(userId, updateData);

            // Preserve accountId from current session
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

            toast.success("Profile updated successfully");
            onSuccess?.();
            router.refresh();
            onOpenChange(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            const err =
                error instanceof Error
                    ? error
                    : new Error("Failed to update profile");
            toast.error(
                err.message || "Failed to update profile. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop variant="blur" className="z-100">
                <Modal.Container size="full" scroll="inside">
                    <Modal.Dialog className="p-0">
                        <div className="relative min-h-screen bg-white">
                            {/* Close Button */}
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-6 right-6 z-50 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6 text-slate-600" />
                            </button>

                            {/* Form */}
                            <div className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 bg-white">
                                <div className="max-w-3xl mx-auto w-full">
                                    {/* Header */}
                                    <div className="text-center mb-8 md:mb-12">
                                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                                            Edit Your Information
                                        </h1>
                                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-lg mx-auto mb-4">
                                            Update your birth details and
                                            location settings
                                        </p>
                                    </div>

                                    <Form
                                        onSubmit={handleSubmit}
                                        validationBehavior="native"
                                        className="flex flex-col gap-10 md:gap-12"
                                    >
                                        {/* Name Field */}
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
                                                    value={
                                                        formData.birthDate ||
                                                        null
                                                    }
                                                    onChange={(date) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            birthDate:
                                                                date || null,
                                                        }));
                                                    }}
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
                                                                    segment={
                                                                        segment
                                                                    }
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
                                                    value={
                                                        formData.birthTime ||
                                                        null
                                                    }
                                                    onChange={(time) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            birthTime:
                                                                time || null,
                                                        }));
                                                    }}
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
                                                                    segment={
                                                                        segment
                                                                    }
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
                                                    selectedKey={
                                                        formData.gender ||
                                                        undefined
                                                    }
                                                    onSelectionChange={(
                                                        key
                                                    ) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            gender: key
                                                                ? String(key)
                                                                : "",
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
                                                    onSelectionChange={(
                                                        key
                                                    ) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            birthCity: key
                                                                ? String(key)
                                                                : "",
                                                        }));
                                                    }}
                                                    inputValue={
                                                        formData.birthCity
                                                    }
                                                    onInputChange={(value) => {
                                                        handleBirthCityChange(
                                                            value
                                                        );
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
                                                            {birthCitySuggestions.length >
                                                            0 ? (
                                                                birthCitySuggestions.map(
                                                                    (city) => (
                                                                        <ListBox.Item
                                                                            key={
                                                                                city.id
                                                                            }
                                                                            id={
                                                                                city.label
                                                                            }
                                                                            textValue={
                                                                                city.label
                                                                            }
                                                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                                        >
                                                                            {
                                                                                city.label
                                                                            }
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
                                                                    Start typing
                                                                    to search
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
                                                    onSelectionChange={(
                                                        key
                                                    ) => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            currentCity: key
                                                                ? String(key)
                                                                : "",
                                                        }));
                                                    }}
                                                    inputValue={
                                                        formData.currentCity
                                                    }
                                                    onInputChange={(value) => {
                                                        handleCurrentCityChange(
                                                            value
                                                        );
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
                                                            placeholder="e.g., Seoul, South Korea"
                                                        />
                                                        <ComboBox.Trigger />
                                                    </ComboBox.InputGroup>
                                                    <ComboBox.Popover className="bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-none">
                                                        <ListBox className="p-0">
                                                            {currentCitySuggestions.length >
                                                            0 ? (
                                                                currentCitySuggestions.map(
                                                                    (city) => (
                                                                        <ListBox.Item
                                                                            key={
                                                                                city.id
                                                                            }
                                                                            id={
                                                                                city.label
                                                                            }
                                                                            textValue={
                                                                                city.label
                                                                            }
                                                                            className="px-6 py-4 hover:bg-slate-50 font-serif text-slate-700 cursor-pointer outline-none"
                                                                        >
                                                                            {
                                                                                city.label
                                                                            }
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
                                                                    Start typing
                                                                    to search
                                                                    cities...
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
                                                disabled={isSubmitting}
                                                className="cursor-pointer group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-white bg-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                <span className="relative flex items-center gap-3 text-lg">
                                                    {isSubmitting
                                                        ? "Saving..."
                                                        : "Save Changes"}
                                                </span>
                                            </button>
                                            <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-400">
                                                Encrypted . Instant . Private
                                            </p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
