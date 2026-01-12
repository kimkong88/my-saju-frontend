"use client";

import {
    DateField,
    DateInputGroup,
    FieldError,
    Form,
    Label,
    ListBox,
    Select,
    Surface,
    TimeField,
} from "@heroui/react";

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

export default function TeaserSection() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log("Form submitted:", data);
    };

    return (
        <section
            id="teaser"
            className="relative py-24 md:py-32 px-6 xl:px-0 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <Surface className="bg-transparent md:p-12 p-6 sm:p-8 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-6 md:mb-8 italic">
                        Verify the Logic.
                    </h2>

                    <p className="text-sm sm:text-base text-slate-700 mb-12 md:mb-16 max-w-lg mx-auto leading-relaxed">
                        <strong className="text-slate-900 font-semibold">
                            One in 10.3 million
                        </strong>{" "}
                        probability signatures.{" "}
                        <br className="hidden sm:block" />
                        Input your birth data to locate{" "}
                        <strong className="text-slate-900 font-semibold">
                            yours
                        </strong>
                        .
                    </p>

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
                                    className="w-full"
                                >
                                    <Label
                                        htmlFor="birthDate"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Date of Entry
                                    </Label>
                                    <DateInputGroup
                                        // ADDED: rounded-none to kill the curves
                                        className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none transition-colors rounded-none"
                                    >
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
                                    className="w-full"
                                >
                                    <Label
                                        htmlFor="birthTime"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Time (Optional)
                                    </Label>
                                    <DateInputGroup
                                        // ADDED: rounded-none
                                        className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif text-slate-900 focus-within:border-slate-900 focus-within:outline-none transition-colors rounded-none"
                                    >
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
                                    className="w-full"
                                    placeholder="Select"
                                >
                                    <Label
                                        htmlFor="gender"
                                        className="block text-[10px] tracking-widest font-bold text-slate-400 mb-2 uppercase"
                                    >
                                        Biology
                                    </Label>

                                    <Select.Trigger
                                        // ADDED: rounded-none
                                        className="w-full bg-transparent border-b border-slate-300 px-0 py-2 text-xl sm:text-2xl font-serif italic text-slate-600 focus:text-slate-900 focus:not-italic focus:border-slate-900 focus:outline-none flex items-center justify-between cursor-pointer transition-colors hover:text-slate-900 rounded-none"
                                    >
                                        <Select.Value />

                                        {/* FIXED: SVG Arrow for perfect alignment */}
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

                        {/* --- SUBMIT BUTTON --- */}
                        <div className="pt-8">
                            <button
                                type="submit"
                                className="cursor-pointer group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif font-medium tracking-tighter text-white bg-slate-900 rounded-full transition duration-300 ease-out hover:scale-105 hover:shadow-2xl"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center gap-3 text-lg">
                                    Calculate Analysis
                                </span>
                            </button>
                            <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-400">
                                Encrypted . Instant . Private
                            </p>
                        </div>
                    </Form>
                </Surface>
            </div>
        </section>
    );
}
