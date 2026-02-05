"use client";

import Link from "next/link";
import SocialSignInButton from "@/components/auth/SocialSignInButton";

export default function SignInForm() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                        Sign In
                    </h1>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-lg mx-auto mb-4">
                        Access your account to sync across devices and save your
                        data permanently.
                    </p>
                    <p className="text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-slate-900 underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Social Sign-In Options */}
                <div className="space-y-4 mb-8">
                    <SocialSignInButton provider="google" />
                    <SocialSignInButton provider="apple" />
                </div>

                {/* Note */}
                <div className="text-center">
                    <p className="text-xs text-slate-400">
                        Sign in to access your account and sync across devices.
                    </p>
                </div>
            </div>
        </div>
    );
}
