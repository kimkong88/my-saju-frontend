"use client";

import { Edit2, MapPin, Calendar, User, Clock } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "@/components/modals/EditProfileModal";

interface MeUserInfoProps {
    userId: string;
    name: string;
    birthdate: string; // Format: "January 15, 1990"
    birthDateISO: string; // ISO string for the modal
    birthTime?: string; // Format: "8:30 AM"
    isTimeKnown?: boolean;
    gender?: "male" | "female";
    birthCity?: string;
    currentCity?: string;
}

export default function MeUserInfo({
    userId,
    name,
    birthdate,
    birthDateISO,
    birthTime,
    isTimeKnown,
    gender,
    birthCity,
    currentCity,
}: MeUserInfoProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 border-y border-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                            Your Information
                        </h2>
                        <p className="text-sm md:text-base text-slate-600">
                            Manage your birth details and location settings
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:border-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                </div>

                {/* Details Section - Compact List Format */}
                <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-start gap-4 py-3 border-b border-slate-100">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                Name
                            </p>
                            <p className="text-base md:text-lg font-medium text-slate-900">
                                {name}
                            </p>
                        </div>
                    </div>

                    {/* Birth Date & Time */}
                    <div className="flex items-start gap-4 py-3 border-b border-slate-100">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                Date of Birth
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                                <p className="text-base md:text-lg font-medium text-slate-900">
                                    {birthdate}
                                </p>
                                {birthTime ? (
                                    <>
                                        <span className="text-slate-300">•</span>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            <p className="text-sm font-medium text-slate-700">
                                                {birthTime}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-slate-300">•</span>
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:border-slate-900 hover:bg-slate-50 transition-all duration-200"
                                        >
                                            <Clock className="w-3 h-3" />
                                            Add time
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Birth City */}
                    <div className="flex items-start gap-4 py-3 border-b border-slate-100">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                City of Birth
                            </p>
                            {birthCity ? (
                                <p className="text-base md:text-lg font-medium text-slate-900">
                                    {birthCity}
                                </p>
                            ) : (
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:border-slate-900 hover:bg-slate-50 transition-all duration-200"
                                >
                                    <MapPin className="w-3 h-3" />
                                    Add city for better accuracy
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Current City */}
                    <div className="flex items-start gap-4 py-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                Current City
                            </p>
                            {currentCity ? (
                                <p className="text-base md:text-lg font-medium text-slate-900">
                                    {currentCity}
                                </p>
                            ) : (
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:border-slate-900 hover:bg-slate-50 transition-all duration-200"
                                >
                                    <MapPin className="w-3 h-3" />
                                    Change location
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                userId={userId}
                currentName={name}
                currentBirthDate={birthDateISO}
                currentBirthTime={birthTime}
                isTimeKnown={isTimeKnown || false}
                gender={gender}
                birthCity={birthCity}
                currentCity={currentCity}
                onSuccess={() => {
                    // Modal will handle refresh
                }}
            />
        </section>
    );
}
