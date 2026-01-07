"use client";

import { FieldError, Form, Input, TextField } from "@heroui/react";
import { toast } from "sonner";

export default function WaitlistSection() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString();

        console.log("Waitlist submitted:", { email });
        toast.success("Waitlist submitted successfully");

        e.currentTarget.reset();
        // Handle waitlist submission here
    };

    return (
        <section
            id="waitlist"
            className="py-16 md:py-32 lg:py-40 px-6 xl:px-0 bg-slate-900 text-white relative overflow-hidden"
        >
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-left md:text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 tracking-tight">
                    Secure Your Early Spot
                </h2>
                <p className="text-left md:text-center text-slate-400 mb-6 md:mb-12 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto">
                    Join the waitlist to secure your early spot. Participants
                    will receive surprise gifts and priority access to the beta.
                </p>

                <Form
                    onSubmit={handleSubmit}
                    className="md:max-w-xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 sm:relative group"
                    validationBehavior="native"
                >
                    <TextField
                        name="email"
                        type="email"
                        isRequired
                        className="w-full flex-1"
                        validate={(value) => {
                            if (!value) {
                                return "Email is required";
                            }
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Input
                            placeholder="Enter your email"
                            className="w-full pl-6 sm:pl-8 pr-4 sm:pr-[180px] py-4 sm:py-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30 text-base sm:text-lg"
                        />
                        <FieldError className="text-xs text-red-400 mt-1 sm:absolute sm:top-full sm:left-0" />
                    </TextField>
                    <button
                        type="submit"
                        className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-2 sm:bottom-2 bg-white text-slate-900 px-8 sm:px-10 py-4 sm:py-0 rounded-full font-bold hover:bg-slate-100 transition-all cursor-pointer button--effect text-base sm:text-lg whitespace-nowrap"
                    >
                        Join Waitlist
                    </button>
                </Form>
            </div>

            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <svg viewBox="0 0 1000 1000" className="w-full h-full">
                    <circle
                        cx="500"
                        cy="500"
                        r="400"
                        stroke="white"
                        strokeWidth="0.5"
                        fill="none"
                    />
                    <circle
                        cx="500"
                        cy="500"
                        r="300"
                        stroke="white"
                        strokeWidth="0.5"
                        fill="none"
                    />
                    <line
                        x1="100"
                        y1="500"
                        x2="900"
                        y2="500"
                        stroke="white"
                        strokeWidth="0.5"
                    />
                    <line
                        x1="500"
                        y1="100"
                        x2="500"
                        y2="900"
                        stroke="white"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>
        </section>
    );
}
