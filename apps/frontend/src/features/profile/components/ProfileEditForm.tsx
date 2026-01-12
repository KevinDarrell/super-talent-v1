"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Save, X } from "lucide-react";
import { useUpdateProfileMutation } from "../api/useProfile";
import type { UserProfile } from "../api/useProfile";

interface ProfileEditFormProps {
    profile: UserProfile;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(profile.name || "");

    const updateProfileMutation = useUpdateProfileMutation();

    useEffect(() => {
        setName(profile.name || "");
    }, [profile.name]);

    const handleSave = () => {
        updateProfileMutation.mutate(
            { userId: profile.id, data: { name } },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };

    const handleCancel = () => {
        setName(profile.name || "");
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Edit3 size={18} className="text-indigo-500" />
                    Profile
                </h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs sm:text-sm text-indigo-500 hover:text-indigo-600 font-medium shrink-0"
                    >
                        <Edit3 size={16} className="sm:hidden" />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Name field */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Display Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your name"
                        />
                    ) : (
                        <p className="text-slate-900 dark:text-white py-2.5">
                            {profile.name || "Not set"}
                        </p>
                    )}
                </div>

                {/* Email (read-only) */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                    </label>
                    <p className="text-slate-500 dark:text-slate-400 py-2.5">
                        {profile.email}
                        <span className="text-xs ml-2 text-slate-400">(cannot be changed)</span>
                    </p>
                </div>

                {/* Action buttons when editing */}
                {isEditing && (
                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={handleSave}
                            disabled={updateProfileMutation.isPending}
                            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
