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

export default function TeaserSection() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log("Form submitted:", data);
        // runCalibration logic here
    };

    return (
        <section
            id="teaser"
            className="relative py-16 md:py-24 px-6 xl:px-0 overflow-hidden"
        >
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <Surface className="bg-slate-50 border border-slate-100 md:p-12 p-6 sm:p-8 rounded-2xl md:rounded-[3rem] shadow-sm text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight mb-4 md:mb-6 text-slate-900">
                        Verify The Logic
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 mb-8 md:mb-20 px-2">
                        Still skeptical? Input your birth data to see a snapshot
                        of your <strong>Early Chapter(Age 0-17)</strong>.
                    </p>
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                        validationBehavior="native"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-10">
                            <div className="text-left">
                                <DateField
                                    id="birthDate"
                                    name="birthDate"
                                    isRequired
                                    className="w-full"
                                >
                                    <Label
                                        htmlFor="birthDate"
                                        className="block text-xs font-bold text-slate-400 mb-2 uppercase ml-2 md:ml-4"
                                    >
                                        Birth Date
                                    </Label>
                                    <DateInputGroup
                                        className="w-full h-[48px] sm:h-[56px] bg-white border border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-900/5 text-sm sm:text-base flex items-center"
                                        isOnSurface
                                    >
                                        <DateInputGroup.Input>
                                            {(segment) => (
                                                <DateInputGroup.Segment
                                                    segment={segment}
                                                    className="text-sm sm:text-base"
                                                />
                                            )}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                    <FieldError className="text-xs text-red-500 mt-1 ml-2 md:ml-4" />
                                </DateField>
                            </div>
                            <div className="text-left">
                                <TimeField
                                    id="birthTime"
                                    name="birthTime"
                                    className="w-full"
                                >
                                    <Label
                                        htmlFor="birthTime"
                                        className="block text-xs font-bold text-slate-400 mb-2 uppercase ml-2 md:ml-4"
                                    >
                                        Time (Optional)
                                    </Label>
                                    <DateInputGroup
                                        className="w-full h-[48px] sm:h-[56px] bg-white border border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-900/5 text-sm sm:text-base flex items-center"
                                        isOnSurface
                                    >
                                        <DateInputGroup.Input>
                                            {(segment) => (
                                                <DateInputGroup.Segment
                                                    segment={segment}
                                                    className="text-sm sm:text-base"
                                                />
                                            )}
                                        </DateInputGroup.Input>
                                    </DateInputGroup>
                                    <FieldError className="text-xs text-red-500 mt-1 ml-2 md:ml-4" />
                                </TimeField>
                            </div>
                            <div className="text-left">
                                <Select
                                    id="gender"
                                    name="gender"
                                    isRequired
                                    className="w-full"
                                    placeholder="Select gender"
                                    isOnSurface
                                >
                                    <Label
                                        htmlFor="gender"
                                        className="block text-xs font-bold text-slate-400 mb-2 uppercase ml-2 md:ml-4"
                                    >
                                        Gender
                                    </Label>
                                    <Select.Trigger className="w-full h-[48px] sm:h-[56px] bg-white border border-slate-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 text-sm sm:text-base flex items-center">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item
                                                id="male"
                                                textValue="Male"
                                            >
                                                Male
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item
                                                id="female"
                                                textValue="Female"
                                            >
                                                Female
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                    <FieldError className="text-xs text-red-500 mt-1 ml-2 md:ml-4" />
                                </Select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="button--primary button--effect w-full md:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-lg cursor-pointer"
                        >
                            Decode My Early Chapters
                        </button>
                        <p className="text-xs text-slate-500">
                            Data encrypted. Results instant
                        </p>
                    </Form>
                </Surface>
            </div>
        </section>
    );
}
