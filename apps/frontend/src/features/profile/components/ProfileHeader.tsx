"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Camera, Loader2 } from "lucide-react";
import type { UserProfile } from "../api/useProfile";

interface ProfileHeaderProps {
    profile: UserProfile;
    onAvatarChange?: (file: File) => void;
    isUploadingAvatar?: boolean;
}

export function ProfileHeader({ profile, onAvatarChange, isUploadingAvatar }: ProfileHeaderProps) {
    const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    const handleAvatarClick = () => {
        if (isUploadingAvatar) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file && onAvatarChange) {
                onAvatarChange(file);
            }
        };
        input.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white overflow-hidden"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden relative">
                        {profile.picture ? (
                            <img
                                src={profile.picture}
                                alt={profile.name || "Profile"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User size={36} className="text-white/70 sm:hidden" />
                                <User size={48} className="text-white/70 hidden sm:block" />
                            </div>
                        )}
                        {/* Loading overlay */}
                        {isUploadingAvatar && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 size={24} className="animate-spin text-white" />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleAvatarClick}
                        disabled={isUploadingAvatar}
                        className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:scale-110 disabled:opacity-50"
                        title="Change avatar"
                    >
                        <Camera size={14} className="sm:hidden" />
                        <Camera size={16} className="hidden sm:block" />
                    </button>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                        {profile.name || "Anonymous User"}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-white/80 text-xs sm:text-sm">
                        <span className="flex items-center gap-1.5">
                            <Mail size={14} />
                            {profile.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            Member since {memberSince}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
